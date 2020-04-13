import React from 'react';
import * as PropTypes from 'prop-types';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { getToc } from 'docs/src/modules/utils/experimental';

const req = require.context('docs/src/pages/components/buttons', false, /\.(md|js|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../../src/pages/components/buttons',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/components/buttons';

export default function Page({ toc }) {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} toc={toc} />;
}

Page.propTypes = {
  toc: PropTypes.array.isRequired,
};

export async function getStaticProps() {
  return { props: { toc: getToc(req) } };
}
