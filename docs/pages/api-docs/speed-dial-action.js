import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'api/speed-dial-action';
const requireRaw = require.context('!raw-loader!./', false, /speed-dial-action\.md$/);

// eslint-disable-next-line react/prop-types
export default function Page({ docs }) {
  return <MarkdownDocs docs={docs} />;
}

Page.getInitialProps = async () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
