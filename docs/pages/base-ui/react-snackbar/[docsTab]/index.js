import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import { getLayout } from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/snackbar/snackbar.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import SnackbarApiJsonPageContent from '../../api/snackbar.json';
import useSnackbarApiJsonPageContent from '../../api/use-snackbar.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getLayout = getLayout;

export const getStaticPaths = () => {
  return {
    paths: [{ params: { docsTab: 'components-api' } }, { params: { docsTab: 'hooks-api' } }],
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps = () => {
  const SnackbarApiReq = require.context(
    'docs/translations/api-docs-base/snackbar',
    false,
    /snackbar.*.json$/,
  );
  const SnackbarApiDescriptions = mapApiPageTranslations(SnackbarApiReq);

  const useSnackbarApiReq = require.context(
    'docs/translations/api-docs/use-snackbar',
    false,
    /use-snackbar.*.json$/,
  );
  const useSnackbarApiDescriptions = mapApiPageTranslations(useSnackbarApiReq);

  return {
    props: {
      componentsApiDescriptions: { Snackbar: SnackbarApiDescriptions },
      componentsApiPageContents: { Snackbar: SnackbarApiJsonPageContent },
      hooksApiDescriptions: { useSnackbar: useSnackbarApiDescriptions },
      hooksApiPageContents: { useSnackbar: useSnackbarApiJsonPageContent },
    },
  };
};
