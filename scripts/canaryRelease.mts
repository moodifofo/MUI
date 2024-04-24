/* eslint-disable prefer-template */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, writeFile, appendFile } from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { $ } from 'execa';
import chalk from 'chalk';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(currentDirectory, '..');

interface PackageInfo {
  name: string;
  path: string;
  version: string;
  private: boolean;
}

interface RunOptions {
  accessToken?: string;
  baseline?: string;
  dryRun: boolean;
  skipLastCommitComparison: boolean;
  yes: boolean;
}

async function run({ dryRun, accessToken, baseline, skipLastCommitComparison, yes }: RunOptions) {
  await ensureCleanWorkingDirectory();

  const changedPackages = await getChangedPackages(baseline, skipLastCommitComparison);
  if (changedPackages.length === 0) {
    return;
  }

  await confirmPublishing(changedPackages, yes);

  try {
    await setAccessToken(accessToken);
    await setVersion(changedPackages);
    await publishPackages(changedPackages, dryRun);
  } finally {
    await cleanUp();
  }
}

async function ensureCleanWorkingDirectory() {
  try {
    await $`git diff --quiet`;
    await $`git diff --quiet --cached`;
  } catch (error) {
    console.error('❌ Working directory is not clean.');
    process.exit(1);
  }
}

async function listPublicChangedPackages(baseline: string) {
  const { stdout: packagesJson } =
    await $`pnpm list --recursive --filter ...[${baseline}] --depth -1 --only-projects --json`;
  const packages = JSON.parse(packagesJson) as PackageInfo[];
  return packages.filter((pkg) => !pkg.private);
}

async function getChangedPackages(
  baseline: string | undefined,
  skipLastCommitComparison: boolean,
): Promise<PackageInfo[]> {
  if (!skipLastCommitComparison) {
    const publicPackagesUpdatedInLastCommit = await listPublicChangedPackages('HEAD~1');
    if (publicPackagesUpdatedInLastCommit.length === 0) {
      console.log('No public packages changed in the last commit.');
      return [];
    }
  }

  if (!baseline) {
    const { stdout: latestTag } = await $`git describe --abbrev=0`;
    baseline = latestTag;
  }

  console.log(`Looking for changed public packages since ${chalk.yellow(baseline)}...`);

  const changedPackages = await listPublicChangedPackages(baseline);
  if (changedPackages.length === 0) {
    console.log('Nothing found.');
  }

  return changedPackages;
}

async function confirmPublishing(changedPackages: PackageInfo[], yes: boolean) {
  if (!yes) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log('\nFound changes in the following packages:');
    for (const pkg of changedPackages) {
      console.log(` - ${pkg.name}`);
    }

    console.log('\nThis will publish the above packages to the npm registry.');
    const answer = await rl.question('Do you want to proceed? (y/n) ');

    rl.close();

    if (answer.toLowerCase() !== 'y') {
      console.log('Aborted.');
      process.exit(0);
    }
  }
}

async function setAccessToken(npmAccessToken: string | undefined) {
  if (!npmAccessToken && !process.env.NPM_TOKEN) {
    console.error(
      '❌ NPM access token is required. Either pass it as an argument or set it as an NPM_TOKEN environment variable.',
    );
    process.exit(1);
  }

  const npmrcPath = resolve(workspaceRoot, '.npmrc');

  await appendFile(
    npmrcPath,
    `//registry.npmjs.org/:_authToken=${npmAccessToken ?? process.env.NPM_TOKEN}\n`,
  );
}

async function setVersion(packages: PackageInfo[]) {
  const { stdout: currentRevisionSha } = await $`git rev-parse --short HEAD`;
  const timestamp = formatDate(new Date());
  let hasError = false;

  const tasks = packages.map(async (pkg) => {
    const packageJsonPath = resolve(pkg.path, './package.json');
    try {
      const packageJson = JSON.parse(await readFile(packageJsonPath, { encoding: 'utf8' }));
      const version = packageJson.version;
      const dashIndex = version.indexOf('-');
      let newVersion = version;
      if (dashIndex !== -1) {
        newVersion = version.slice(0, dashIndex);
      }

      newVersion = `${newVersion}-dev.${timestamp}-${currentRevisionSha}`;
      packageJson.version = newVersion;

      await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    } catch (error) {
      console.error(`${chalk.red(`❌ ${packageJsonPath}`)}`, error);
      hasError = true;
    }
  });

  await Promise.allSettled(tasks);
  if (hasError) {
    throw new Error('Failed to update package versions');
  }
}

function formatDate(date: Date) {
  // yyMMddHHmmss
  return date
    .toISOString()
    .replace(/[-:TZ]/g, '')
    .slice(2, 14);
}

async function publishPackages(packages: PackageInfo[], dryRun: boolean) {
  console.log(`\nPublishing packages${dryRun ? ' (dry run)' : ''}`);
  const tasks = packages.map(async (pkg) => {
    try {
      await $({
        stdio: 'inherit',
      })`pnpm publish ${pkg.path} --tag canary --no-git-checks ${dryRun ? '--dry-run' : ''}`;
    } catch (error) {
      console.error(chalk.red(`❌ ${pkg.name}`), error);
    }
  });

  await Promise.allSettled(tasks);
}

async function cleanUp() {
  await $`git restore .`;
}

yargs(hideBin(process.argv))
  .command<RunOptions>(
    '$0',
    'Publishes packages that have changed since the last release (or a specified commit).',
    (command) => {
      return command
        .option('dryRun', {
          default: false,
          describe: 'If true, no packages will be published to the registry.',
          type: 'boolean',
        })
        .option('accessToken', {
          describe: 'NPM access token',
          type: 'string',
        })
        .option('baseline', {
          describe: 'Baseline tag or commit to compare against (for example `master`).',
          type: 'string',
        })
        .option('skipLastCommitComparison', {
          default: false,
          describe:
            'By default, the script exits when there are no changes in public packages in the latest commit. Setting this flag will skip this check and compare only against the baseline.',
          type: 'boolean',
        })
        .option('yes', {
          default: false,
          describe: "If set, the script doesn't ask for confirmation before publishing packages",
          type: 'boolean',
        });
    },
    run,
  )
  .help()
  .strict(true)
  .version(false)
  .parse();
