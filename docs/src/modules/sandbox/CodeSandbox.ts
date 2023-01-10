import SandboxDependencies from './Dependencies';
import * as CRA from './CreateReactApp';
import getFileExtension from './FileExtension';

const createReactApp = (demo: {
  title: string;
  language: string;
  raw: string;
  codeVariant: 'TS' | 'JS';
  githubLocation: string;
  product?: 'joy-ui' | 'base';
}) => {
  const ext = getFileExtension(demo.codeVariant);
  const { title, githubLocation: description } = demo;
  const includeXMonorepo = demo.raw.includes("from 'docsx/");
  // cloning to avoid the documentation demo `raw` content change
  const internalDemo = { ...demo };
  if (includeXMonorepo) {
    internalDemo.raw = internalDemo.raw.replace(/from 'docsx/, "from '@mui/x-monorepo/docs");
  }

  const files: Record<string, object> = {
    'public/index.html': {
      content: CRA.getHtml(demo),
    },
    [`index.${ext}`]: {
      content: CRA.getRootIndex(demo.product),
    },
    [`demo.${ext}`]: {
      content: internalDemo.raw,
    },
    ...(demo.codeVariant === 'TS' && {
      'tsconfig.json': {
        content: CRA.getTsconfig(),
      },
    }),
  };

  const { dependencies, devDependencies } = SandboxDependencies(internalDemo, {
    commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
    ...(includeXMonorepo && {
      xMonorepoPath:
        // use PR authors repo and commit hash when on a PR
        // https://docs.netlify.com/configure-builds/environment-variables/#git-metadata
        // Correct REPOSITORY_URL is necessary for building a valid url
        process.env.PULL_REQUEST_ID && process.env.COMMIT_REF && process.env.REPOSITORY_URL
          ? `${process.env.REPOSITORY_URL}#${process.env.COMMIT_REF}`
          : `https://github.com/mui/mui-x.git#${process.env.DEFAULT_BRANCH ?? 'master'}`,
    }),
  });

  files['package.json'] = {
    content: {
      description,
      dependencies,
      devDependencies,
      ...(demo.codeVariant === 'TS' && {
        main: 'index.tsx',
        scripts: {
          start: 'react-scripts start',
        },
      }),
    },
  };

  return { title, description, files, dependencies, devDependencies };
};

const createJoyTemplate = (demo: {
  title: string;
  files: Record<string, string>;
  githubLocation: string;
  codeVariant: 'TS' | 'JS';
}) => {
  const ext = getFileExtension(demo.codeVariant);
  const { title, githubLocation: description } = demo;

  const files: Record<string, object> = {
    'public/index.html': {
      content: CRA.getHtml({ title: demo.title, language: 'en' }),
    },
    [`index.${ext}`]: {
      content: `import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/joy/styles';
import App from './App';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);`,
    },
    ...Object.entries(demo.files).reduce(
      (prev, curr) => ({
        ...prev,
        [curr[0]]: {
          content: curr[1],
        },
      }),
      {},
    ),
    ...(demo.codeVariant === 'TS' && {
      'tsconfig.json': {
        content: CRA.getTsconfig(),
      },
    }),
  };

  const { dependencies, devDependencies } = SandboxDependencies(
    {
      codeVariant: demo.codeVariant,
      raw: Object.entries(demo.files).reduce((prev, curr) => `${prev}\n${curr}`, ''),
      product: 'joy-ui',
    },
    {
      commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
    },
  );

  files['package.json'] = {
    content: {
      description,
      dependencies,
      devDependencies,
      ...(demo.codeVariant === 'TS' && {
        main: 'index.tsx',
        scripts: {
          start: 'react-scripts start',
        },
      }),
    },
  };

  return { title, files, dependencies, devDependencies };
};

export default {
  createReactApp,
  createJoyTemplate,
};
