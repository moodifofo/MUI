const path = require('path');
const webpack = require('webpack');

const workspaceRoot = path.resolve(__dirname, '../');

const browserStack = {
  username: process.env.BROWSERSTACK_USERNAME,
  accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
  build: `material-ui-${new Date().toISOString()}`,
};

process.env.CHROME_BIN = require('puppeteer').executablePath();

// Karma configuration
module.exports = function setKarmaConfig(config) {
  const baseConfig = {
    basePath: '../',
    browsers: ['chromeHeadless'],
    browserDisconnectTimeout: 120000, // default 2000
    browserDisconnectTolerance: 1, // default 0
    browserNoActivityTimeout: 300000, // default 10000
    colors: true,
    frameworks: ['mocha'],
    files: [
      {
        pattern: 'test/karma.tests.js',
        watched: true,
        served: true,
        included: true,
      },
      {
        pattern: 'test/assets/*.png',
        watched: false,
        included: false,
        served: true,
      },
    ],
    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
      require.resolve('./utils/KarmaReporterReactProfiler'),
    ],
    /**
     * possible values:
     * - config.LOG_DISABLE
     * - config.LOG_ERROR
     * - config.LOG_WARN
     * - config.LOG_INFO
     * - config.LOG_DEBUG
     */
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      'test/karma.tests.js': ['webpack', 'sourcemap'],
    },
    proxies: {
      '/fake.png': '/base/test/assets/fake.png',
      '/fake2.png': '/base/test/assets/fake2.png',
    },
    reporters: ['dots', 'profiler'],
    reactProfilerReporter: {
      outputDir: path.join(workspaceRoot, 'tmp/react-profiler-report/karma'),
    },
    webpack: {
      // TODO: profile in production
      mode: 'development',
      // Works with source-map-support in production.
      // Even though it's documented as "no":
      // https://webpack.js.org/configuration/devtool/#devtool
      devtool: 'inline-source-map',
      optimization: {
        // Helps debugging and build perf.
        // Bundle size is irrelevant for local serving.
        minimize: false,
      },
      plugins: [
        new webpack.DefinePlugin({
          // TODO: profile in production
          'process.env.NODE_ENV': JSON.stringify('test'),
          'process.env.CI': JSON.stringify(process.env.CI),
          'process.env.KARMA': JSON.stringify(true),
          'process.env.TEST_GATE': JSON.stringify('enable-dispatching-profiler'),
        }),
      ],
      module: {
        rules: [
          {
            test: /\.(js|ts|tsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
              envName: 'stable',
            },
          },
        ],
      },
      node: {
        // Some tests import fs
        fs: 'empty',
      },
      resolve: {
        alias: {
          // "How to use profiling in production"
          // https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977#react-dom1660--scheduler0100
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        },
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
    webpackMiddleware: {
      noInfo: true,
      writeToDisk: Boolean(process.env.CI),
    },
    customLaunchers: {
      chromeHeadless: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    singleRun: Boolean(process.env.CI),
  };

  let newConfig = baseConfig;

  if (browserStack.accessKey) {
    newConfig = {
      ...baseConfig,
      browserStack,
      browsers: baseConfig.browsers.concat(['chrome', 'firefox', 'safari', 'edge']),
      plugins: baseConfig.plugins.concat(['karma-browserstack-launcher']),
      customLaunchers: {
        ...baseConfig.customLaunchers,
        chrome: {
          base: 'BrowserStack',
          os: 'OS X',
          os_version: 'Catalina',
          browser: 'chrome',
          browser_version: '84.0',
        },
        // No accurate performance timings (integer precision instead of double).
        firefox: {
          base: 'BrowserStack',
          os: 'Windows',
          os_version: '10',
          browser: 'firefox',
          browser_version: '78.0',
        },
        // No accurate performance timings (integer precision instead of double).
        safari: {
          base: 'BrowserStack',
          os: 'OS X',
          os_version: 'Catalina',
          browser: 'safari',
          // We support 12.2 on iOS.
          // However, 12.1 is very flaky on desktop (mobile is always flaky).
          browser_version: '13.0',
        },
        edge: {
          base: 'BrowserStack',
          os: 'Windows',
          os_version: '10',
          browser: 'edge',
          browser_version: '85.0',
        },
      },
    };
  }

  config.set(newConfig);
};
