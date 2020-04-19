import React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'blog/september-2019-update';
const requireRaw = require.context('!raw-loader!./', false, /september-2019-update\.md$/);

// eslint-disable-next-line react/prop-types
export default function Page({ docs }) {
  return <TopLayoutBlog docs={docs} />;
}

Page.getInitialProps = async () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
