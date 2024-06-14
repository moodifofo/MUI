'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { createUseThemeProps, globalCss } from '../zero-styled';

const useThemeProps = createUseThemeProps('MuiCssBaseline');

// `ecs` stands for enableColorScheme. This is internal logic to make it work with Pigment CSS, so shorter is better.
const SELECTOR = 'mui-ecs';

export const html = (theme, enableColorScheme) => ({
  WebkitFontSmoothing: 'antialiased', // Antialiasing.
  MozOsxFontSmoothing: 'grayscale', // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: 'border-box',
  // Fix font resize problem in iOS
  WebkitTextSizeAdjust: '100%',
  // When used under CssVarsProvider, colorScheme should not be applied dynamically because it will generate the stylesheet twice for server-rendered applications.
  ...(enableColorScheme &&
    !theme.vars && { [`&:has(.${SELECTOR})`]: { colorScheme: theme.palette.mode } }),
});

export const body = (theme) => ({
  color: (theme.vars || theme).palette.text.primary,
  ...theme.typography.body1,
  backgroundColor: (theme.vars || theme).palette.background.default,
  '@media print': {
    // Save printer ink.
    backgroundColor: (theme.vars || theme).palette.common.white,
  },
});

export const styles = (theme) => {
  const colorSchemeStyles = {};
  if (theme.colorSchemes) {
    Object.entries(theme.colorSchemes).forEach(([key, scheme]) => {
      colorSchemeStyles[theme.getColorSchemeSelector(key).replace(/\s*&/, '')] = {
        [`&:has(.${SELECTOR})`]: {
          colorScheme: scheme.palette?.mode,
        },
      };
    });
  }
  let defaultStyles = {
    html: html(theme, true),
    '*, *::before, *::after': {
      boxSizing: 'inherit',
    },
    'strong, b': {
      fontWeight: theme.typography.fontWeightBold,
    },
    body: {
      margin: 0, // Remove the margin in all browsers.
      ...body(theme),
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      '&::backdrop': {
        backgroundColor: (theme.vars || theme).palette.background.default,
      },
    },
    ...colorSchemeStyles,
  };

  const themeOverrides = theme.components?.MuiCssBaseline?.styleOverrides;
  if (themeOverrides) {
    defaultStyles = [defaultStyles, themeOverrides];
  }

  return defaultStyles;
};

const GlobalStyles = globalCss(({ theme }) => styles(theme));

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
function CssBaseline(inProps) {
  const props = useThemeProps({ props: inProps, name: 'MuiCssBaseline' });
  const { children, enableColorScheme = false } = props;
  return (
    <React.Fragment>
      <GlobalStyles />
      {enableColorScheme && <span className={SELECTOR} style={{ display: 'none' }} />}
      {children}
    </React.Fragment>
  );
}

CssBaseline.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
