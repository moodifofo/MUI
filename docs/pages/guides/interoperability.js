import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'guides/interoperability';
const requireDemo = require.context('docs/src/pages/guides/interoperability', false, /\.(js|tsx)$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/guides/interoperability',
  false,
  /\.(js|md|tsx)$/,
);

// Run styled-components ref logic
// https://github.com/styled-components/styled-components/pull/2998
requireDemo.keys().map(requireDemo);

export default function Page({ demos, docs }) {
  return <MarkdownDocs demos={demos} docs={docs} requireDemo={requireDemo} />;
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
