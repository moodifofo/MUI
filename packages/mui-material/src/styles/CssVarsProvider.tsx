'use client';
// do not remove the following import (https://github.com/microsoft/TypeScript/issues/29808#issuecomment-1320713018)
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import * as React from 'react';
import {
  unstable_createCssVarsProvider as createCssVarsProvider,
  unstable_styleFunctionSx as styleFunctionSx,
  SxProps,
} from '@mui/system';
import THEME_ID from './identifier';
import { SupportedColorScheme } from './extendThemeMD2';
import createTypography from './createTypography';
import excludeVariablesFromRoot from './excludeVariablesFromRoot';
import { Theme } from './md3/Theme.types';
import defaultTheme from './md3/defaultTheme';

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  SupportedColorScheme,
  typeof THEME_ID
>({
  themeId: THEME_ID,
  theme: defaultTheme,
  attribute: 'data-mui-color-scheme',
  modeStorageKey: 'mui-mode',
  colorSchemeStorageKey: 'mui-color-scheme',
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  resolveTheme: (theme) => {
    const newTheme = {
      ...theme,
      typography: createTypography(theme.palette, theme.typography),
    };

    newTheme.unstable_sx = function sx(props: SxProps<Theme>) {
      return styleFunctionSx({ sx: props, theme: this });
    };
    return newTheme;
  },
  excludeVariablesFromRoot,
});

export { useColorScheme, getInitColorSchemeScript, CssVarsProvider };
