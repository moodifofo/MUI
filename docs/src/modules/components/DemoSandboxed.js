import * as React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { create } from 'jss';
import rtlPlugin from 'stylis-plugin-rtl';
import rtlPluginSc from 'stylis-plugin-rtl-sc';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { StyleSheetManager } from 'styled-components';
import { jssPreset, StylesProvider } from '@material-ui/styles';
import { useTheme, styled, createTheme, ThemeProvider } from '@material-ui/core/styles';
import rtl from 'jss-rtl';
import DemoErrorBoundary from 'docs/src/modules/components/DemoErrorBoundary';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import darkScrollbar from '@material-ui/core/darkScrollbar';

function FramedDemo(props) {
  const { children, document } = props;

  const theme = useTheme();
  React.useEffect(() => {
    document.body.dir = theme.direction;
  }, [document, theme.direction]);

  const { jss, sheetsManager } = React.useMemo(() => {
    return {
      jss: create({
        plugins: [...jssPreset().plugins, rtl()],
        insertionPoint: document.head,
      }),
      sheetsManager: new Map(),
    };
  }, [document]);

  const cache = React.useMemo(
    () =>
      createCache({
        key: `iframe-demo-${theme.direction}`,
        prepend: true,
        container: document.head,
        stylisPlugins: theme.direction === 'rtl' ? [rtlPlugin] : [],
      }),
    [document, theme.direction],
  );

  const getWindow = React.useCallback(() => document.defaultView, [document]);

  return (
    <StylesProvider jss={jss} sheetsManager={sheetsManager}>
      <StyleSheetManager
        target={document.head}
        stylisPlugins={theme.direction === 'rtl' ? [rtlPluginSc] : []}
      >
        <CacheProvider value={cache}>
          {React.cloneElement(children, {
            window: getWindow,
          })}
        </CacheProvider>
      </StyleSheetManager>
    </StylesProvider>
  );
}
FramedDemo.propTypes = {
  children: PropTypes.node,
  document: PropTypes.object.isRequired,
};

const Frame = styled('iframe')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  flexGrow: 1,
  height: 400,
  border: 0,
  boxShadow: theme.shadows[1],
}));

function DemoFrame(props) {
  const { children, name, ...other } = props;
  const title = `${name} demo`;
  /**
   * @type {import('react').Ref<HTMLIFrameElement>}
   */
  const frameRef = React.useRef(null);

  // If we portal content into the iframe before the load event then that content
  // is dropped in firefox.
  const [iframeLoaded, onLoad] = React.useReducer(() => true, false);

  React.useEffect(() => {
    const document = frameRef.current.contentDocument;
    // When we hydrate the iframe then the load event is already dispatched
    // once the iframe markup is parsed (maybe later but the important part is
    // that it happens before React can attach event listeners).
    // We need to check the readyState of the document once the iframe is mounted
    // and "replay" the missed load event.
    // See https://github.com/facebook/react/pull/13862 for ongoing effort in React
    // (though not with iframes in mind).
    if (document != null && document.readyState === 'complete' && !iframeLoaded) {
      onLoad();
    }
  }, [iframeLoaded]);

  const document = frameRef.current?.contentDocument;
  return (
    <React.Fragment>
      <Frame onLoad={onLoad} ref={frameRef} title={title} {...other} />
      {iframeLoaded !== false
        ? ReactDOM.createPortal(
            <FramedDemo document={document}>{children}</FramedDemo>,
            document.body,
          )
        : null}
    </React.Fragment>
  );
}

DemoFrame.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

// Use the default MUI theme for the demos
const theme = createTheme();
const darkModeTheme = createTheme({
  palette: { mode: 'dark' },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar(),
      },
    },
  },
});

/**
 * Isolates the demo component as best as possible. Additional props are spread
 * to an `iframe` if `iframe={true}`.
 */
function DemoSandboxed(props) {
  const { component: Component, iframe, name, onResetDemoClick, ...other } = props;
  const Sandbox = iframe ? DemoFrame : React.Fragment;
  const sandboxProps = iframe ? { name, ...other } : {};

  const t = useTranslate();

  return (
    <DemoErrorBoundary name={name} onResetDemoClick={onResetDemoClick} t={t}>
      <Sandbox {...sandboxProps}>
        <ThemeProvider
          theme={(outerTheme) => (outerTheme?.palette?.mode === 'dark' ? darkModeTheme : theme)}
        >
          <Component />
        </ThemeProvider>
      </Sandbox>
    </DemoErrorBoundary>
  );
}

DemoSandboxed.propTypes = {
  component: PropTypes.elementType.isRequired,
  iframe: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onResetDemoClick: PropTypes.func.isRequired,
};

export default React.memo(DemoSandboxed);
