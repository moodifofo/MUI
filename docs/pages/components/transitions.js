import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from '@material-ui/markdown/parseMarkdown';

const pageFilename = 'components/transitions';
const requireDemo = require.context('docs/src/pages/components/transitions', false, /\.(js|tsx)$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/components/transitions',
  false,
  /\.(js|md|tsx)$/,
);

export default function Page({ demos, docs }) {
  return <MarkdownDocs demos={demos} docs={docs} requireDemo={requireDemo} />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
