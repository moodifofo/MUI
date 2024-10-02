import * as React from 'react';
import ApiPage from 'docs/src/modules/components/ApiPage';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import jsonPageContent from './tab-list.json';

export default function Page(props) {
  const { descriptions, pageContent } = props;
  return <ApiPage descriptions={descriptions} pageContent={pageContent} />;
}

Page.getInitialProps = () => {
  const req = require.context(
    'docs/translations/api-docs-joy/tab-list',
    false,
    /\.\/tab-list.*.json$/,
  );
  const descriptions = mapApiPageTranslations(req);

  return {
    descriptions,
    pageContent: jsonPageContent,
  };
};
