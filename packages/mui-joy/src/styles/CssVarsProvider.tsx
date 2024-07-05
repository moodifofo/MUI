'use client';
// do not remove the following import (https://github.com/microsoft/TypeScript/issues/29808#issuecomment-1320713018)
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import * as React from 'react';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import defaultTheme from './defaultTheme';
import type { SupportedColorScheme } from './types';
import THEME_ID from './identifier';
import { defaultConfig } from '../InitColorSchemeScript/InitColorSchemeScript';

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  SupportedColorScheme,
  typeof THEME_ID
>({
  themeId: THEME_ID,
  theme: defaultTheme,
  attribute: defaultConfig.attribute,
  modeStorageKey: defaultConfig.modeStorageKey,
  colorSchemeStorageKey: defaultConfig.colorSchemeStorageKey,
  defaultColorScheme: {
    light: defaultConfig.defaultLightColorScheme,
    dark: defaultConfig.defaultDarkColorScheme,
  },
});

export {
  CssVarsProvider,
  useColorScheme,
  /**
   * @deprecated use `InitColorSchemeScript` instead
   *
   * ```diff
   * - import { getInitColorSchemeScript } from '@mui/joy/styles';
   * + import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
   *
   * - getInitColorSchemeScript();
   * + <InitColorSchemeScript />;
   * ```
   */
  getInitColorSchemeScript,
};
