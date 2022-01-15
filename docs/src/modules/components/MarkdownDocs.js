import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Sandpack } from '@codesandbox/sandpack-react';
import '@codesandbox/sandpack-react/dist/index.css';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import { exactProp } from '@mui/utils';
import ComponentLinkHeader from 'docs/src/modules/components/ComponentLinkHeader';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import { useTranslate, useUserLanguage } from 'docs/src/modules/utils/i18n';
import replaceMarkdownLinks from 'docs/src/modules/utils/replaceMarkdownLinks';

// TODO: Only import on demand via @mui/markdown/loader
const markdownComponents = {
  'modules/components/ComponentLinkHeader.js': ComponentLinkHeader,
};

function MarkdownDocs(props) {
  const router = useRouter();
  const { disableAd = false, disableToc = false, demos = {}, docs } = props;

  const userLanguage = useUserLanguage();
  const t = useTranslate();

  const { description, location, rendered, title, toc, headers } = docs[userLanguage] || docs.en;

  return (
    <AppLayoutDocs
      description={description}
      disableAd={disableAd}
      disableToc={disableToc}
      location={location}
      title={title}
      toc={toc}
    >
      {rendered.map((renderedMarkdownOrDemo, index) => {
        if (typeof renderedMarkdownOrDemo === 'string') {
          return (
            <MarkdownElement
              key={index}
              renderedMarkdown={replaceMarkdownLinks(renderedMarkdownOrDemo, router.asPath)}
            />
          );
        }

        if (renderedMarkdownOrDemo.component) {
          const Component = markdownComponents[renderedMarkdownOrDemo.component];
          return <Component key={index} headers={headers} options={renderedMarkdownOrDemo} />;
        }

        const name = renderedMarkdownOrDemo.demo;
        const demo = demos?.[name];
        if (demo === undefined) {
          const errorMessage = [
            `Missing demo: ${name}. You can use one of the following:`,
            Object.keys(demos),
          ].join('\n');

          if (userLanguage === 'en') {
            throw new Error(errorMessage);
          }

          if (process.env.NODE_ENV !== 'production') {
            console.error(errorMessage);
          }

          const warnIcon = (
            <span role="img" aria-label={t('emojiWarning')}>
              ⚠️
            </span>
          );
          return (
            <div key={index}>
              {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
              {warnIcon} Missing demo `{name}` {warnIcon}
            </div>
          );
        }

        return (
          <Sandpack
            template="react"
            theme="night-owl"
            files={{ '/App.js': demo.raw }}
            customSetup={{
              dependencies: {
                '@mui/material': '^5.2.8',
                '@mui/icons-material': '^5.2.4',
                '@mui/lab': '^5.0.0-alpha.64',
                '@emotion/styled': '^11.6.0',
                '@emotion/react': '^11.7.1',
              },
            }}
          />
        );
      })}
    </AppLayoutDocs>
  );
}

MarkdownDocs.propTypes = {
  // demoComponents: PropTypes.object,
  demos: PropTypes.object,
  disableAd: PropTypes.bool,
  disableToc: PropTypes.bool,
  docs: PropTypes.object.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocs.propTypes = exactProp(MarkdownDocs.propTypes);
}

export default MarkdownDocs;
