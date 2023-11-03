import path from 'path';
import * as yargs from 'yargs';
import { ProjectSettings, buildApi } from './buildApi';
import findApiPages from './utils/findApiPages';
import baseUiProjectSettings from './projects/baseUi/projectSettings';
import muiSystemSettings from './projects/muiSystem/projectSettings';
import { getJoyComponentInfo, getMaterialComponentInfo } from './buildApiUtils';

type CommandOptions = { grep?: string };

const projectSettings: ProjectSettings[] = [
  {
    output: {
      apiManifestPath: path.join(process.cwd(), 'docs/data/material/pagesApi.js'),
    },
    typeScriptProjects: ['material', 'lab'],
    getApiPages: () => findApiPages('docs/pages/material-ui/api'),
    getComponentInfo: getMaterialComponentInfo,
  },
  baseUiProjectSettings,
  {
    output: {
      apiManifestPath: path.join(process.cwd(), 'docs/data/joy/pagesApi.js'),
    },
    typeScriptProjects: ['joy'],
    getApiPages: () => findApiPages('docs/pages/joy-ui/api'),
    getComponentInfo: getJoyComponentInfo,
  },
  muiSystemSettings,
];

async function run(argv: yargs.ArgumentsCamelCase<CommandOptions>) {
  const grep = argv.grep == null ? null : new RegExp(argv.grep);
  return buildApi(projectSettings, grep);
}

yargs
  .command({
    command: '$0',
    describe: 'Generates API documentation for the MUI packages.',
    builder: (command) => {
      return command.option('grep', {
        description:
          'Only generate files for component filenames matching the pattern. The string is treated as a RegExp.',
        type: 'string',
      });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
