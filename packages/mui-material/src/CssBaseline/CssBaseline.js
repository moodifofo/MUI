import * as React from 'react';
import PropTypes from 'prop-types';
import useThemeProps from '../styles/useThemeProps';
import GlobalStyles from '../GlobalStyles';

export const styles = (theme, enableColorScheme = false) => {
  const defaultStyles = {
    html: {
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      // Change from `box-sizing: content-box` so that `width`
      // is not affected by `padding` or `border`.
      boxSizing: 'border-box',
      // Fix font resize problem in iOS
      WebkitTextSizeAdjust: '100%',
    },
    '*, *::before, *::after': {
      boxSizing: 'inherit',
    },
    'strong, b': {
      fontWeight: theme.typography.fontWeightBold,
    },
    body: {
      margin: 0, // Remove the margin in all browsers.
      color: (theme.vars || theme).palette.text.primary,
      ...theme.typography.body1,
      backgroundColor: (theme.vars || theme).palette.background.default,
      '@media print': {
        // Save printer ink.
        backgroundColor: (theme.vars || theme).palette.common.white,
      },
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      '&::backdrop': {
        backgroundColor: (theme.vars || theme).palette.background.default,
      },
    },
  };

  const colorSchemeStyles = {};
  if (enableColorScheme) {
    if (theme.vars) {
      // The CssBaseline is wrapped inside a CssVarsProvider
      Object.entries(theme.colorSchemes).forEach(([key, scheme]) => {
        colorSchemeStyles[theme.getColorSchemeSelector(key).replace(' &', '')] = {
          colorScheme: scheme.palette?.mode,
        };
      });
    } else {
      colorSchemeStyles.html = {
        colorScheme: theme.palette.mode,
      };
    }
  }

  const themeOverrides = theme.components?.MuiCssBaseline?.styleOverrides;
  if (themeOverrides) {
    return [defaultStyles, colorSchemeStyles, themeOverrides];
  }

  return [defaultStyles, colorSchemeStyles];
};

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
function CssBaseline(inProps) {
  const props = useThemeProps({ props: inProps, name: 'MuiCssBaseline' });
  const { children, enableColorScheme = false } = props;
  return (
    <React.Fragment>
      <GlobalStyles styles={(theme) => styles(theme, enableColorScheme)} />
      {children}
    </React.Fragment>
  );
}

CssBaseline.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * You can wrap a node.
   */
  children: PropTypes.node,
  /**
   * Enable `color-scheme` CSS property to use `theme.palette.mode`.
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   * @default false
   */
  enableColorScheme: PropTypes.bool,
};

export default CssBaseline;
