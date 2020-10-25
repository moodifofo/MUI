import React from 'react';
import ApiDocs from 'docs/src/modules/components/ApiDocs';
import mapApiTranslations from 'docs/src/modules/utils/mapApiTranslations';
import jsonPageContent from './scoped-css-baseline.json';

export async function getStaticProps() {
  const req1 = require.context('docs/translations', false, /component-descriptions.*.json$/);
  const req2 = require.context('docs/translations', false, /prop-descriptions.*.json$/);
  const req3 = require.context('docs/translations', false, /class-descriptions.*.json$/);

  const componentDescription = mapApiTranslations(req1, 'ScopedCssBaseline');
  const propDescriptions = mapApiTranslations(req2, 'ScopedCssBaseline');
  const classDescriptions = mapApiTranslations(req3, 'ScopedCssBaseline');

  const pageContent = {
    ...jsonPageContent,
    componentDescription,
    propDescriptions,
    classDescriptions,
  };

  return {
    props: { pageContent },
  };
}

export default function Page({ pageContent }) {
  return <ApiDocs pageContent={pageContent} />;
}
