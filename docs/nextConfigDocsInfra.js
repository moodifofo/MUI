let DEPLOY_ENV = 'development';

// Same as process.env.PULL_REQUEST_ID
if (process.env.CONTEXT === 'deploy-preview') {
  DEPLOY_ENV = 'pull-request';
}

/**
 * ===================================================================================
 * Fun facts about the `process.env.CONTEXT`:
 *
 * - It is defined by Netlify environment variables (https://docs.netlify.com/configure-builds/environment-variables/#build-metadata)
 * - `process.env.CONTEXT === 'production'` does not mean mui.com build, it is the site configuration.
 *   For example, the `master` branch of the Core team is considered a `production` build on Netlify based on https://app.netlify.com/sites/material-ui/settings/deploys#branches.
 *
 * - Each team has different site https://app.netlify.com/teams/mui/sites. Make sure to checkout the right site before making any changes.
 *
 */
if (process.env.CONTEXT === 'production' || process.env.CONTEXT === 'branch-deploy') {
  DEPLOY_ENV = 'production';
}

if (process.env.CONTEXT === 'production' && process.env.HEAD === 'master') {
  // For the Core team site, visit https://app.netlify.com/sites/material-ui/settings/deploys#branches for the config details.
  DEPLOY_ENV = 'staging';
}

if (
  process.env.CONTEXT === 'branch-deploy' &&
  (process.env.HEAD === 'master' || process.env.HEAD === 'next')
) {
  DEPLOY_ENV = 'staging';
}
/**
 * ====================================================================================
 */

process.env.DEPLOY_ENV = DEPLOY_ENV;

function withDocsInfra(nextConfig) {
  return {
    trailingSlash: true,
    // Can be turned on when https://github.com/vercel/next.js/issues/24640 is fixed
    optimizeFonts: false,
    reactStrictMode: true,
    ...nextConfig,
    env: {
      BUILD_ONLY_ENGLISH_LOCALE: true, // disable translations by default
      // production | staging | pull-request | development
      DEPLOY_ENV,
      ...nextConfig.env,
      // https://docs.netlify.com/configure-builds/environment-variables/#git-metadata
      // reference ID (also known as “SHA” or “hash”) of the commit we’re building.
      COMMIT_REF: process.env.COMMIT_REF,
      // ID of the PR and the Deploy Preview it generated (for example, 1211)
      PULL_REQUEST_ID: process.env.REVIEW_ID,
      // This can be set manually in the .env to see the ads in dev mode.
      ENABLE_AD_IN_DEV_MODE: process.env.ENABLE_AD_IN_DEV_MODE,
      // URL representing the unique URL for an individual deploy, e.g.
      // https://5b243e66dd6a547b4fee73ae--petsof.netlify.app
      NETLIFY_DEPLOY_URL: process.env.DEPLOY_URL,
      // Name of the site, its Netlify subdomain; for example, material-ui-docs
      NETLIFY_SITE_NAME: process.env.SITE_NAME,
    },
    experimental: {
      scrollRestoration: true,
      ...nextConfig.experimental,
    },
    eslint: {
      ignoreDuringBuilds: true,
      ...nextConfig.eslint,
    },
    typescript: {
      // Motivated by https://github.com/vercel/next.js/issues/7687
      ignoreBuildErrors: true,
      ...nextConfig.typescript,
    },
  };
}

module.exports = withDocsInfra;
