import { Options, defineConfig } from 'tsup';
import config from '../../tsup.config';
import packageJson from './package.json';

const processors = ['styled', 'sx', 'keyframes', 'generateAtomics', 'css'];
const external = ['react', 'react-is', 'prop-types'];

const baseConfig: Options = {
  ...(config as Options),
  tsconfig: './tsconfig.build.json',
  external,
  env: {
    PACKAGE_NAME: packageJson.name,
  },
};

export default defineConfig([
  {
    ...baseConfig,
    entry: ['./src/index.ts', './src/theme.ts'],
  },
  {
    ...baseConfig,
    entry: processors.map((fn) => `./src/processors/${fn}.ts`),
    outDir: 'processors',
  },
  {
    ...baseConfig,
    entry: ['./src/utils/index.ts', './src/utils/pre-linaria-plugin.ts'],
    outDir: 'utils',
  },
]);
