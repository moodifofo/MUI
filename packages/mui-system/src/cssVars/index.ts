'use client';
export { default } from './createCssVarsProvider';
export type {
  CreateCssVarsProviderResult,
  CssVarsProviderConfig,
  ColorSchemeContextValue,
} from './createCssVarsProvider';

export { default as getInitColorSchemeScript } from './getInitColorSchemeScript';
export { default as prepareCssVars } from './prepareCssVars';
export { default as prepareTypographyVars } from './prepareTypographyVars';
export type { ExtractTypographyTokens } from './prepareTypographyVars';
export { default as createCssVarsTheme } from './createCssVarsTheme';
