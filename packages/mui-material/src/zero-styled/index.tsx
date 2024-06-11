import * as React from 'react';
import { extendSxProp } from '@mui/system/styleFunctionSx';
import useThemeProps from '../styles/useThemeProps';
import GlobalStyles, { GlobalStylesProps } from '../GlobalStyles';

export { css, keyframes } from '@mui/system';

export { default as styled } from '../styles/styled';

export function globalCss(styles: GlobalStylesProps['styles']) {
  return function GlobalStylesWrapper() {
    return <GlobalStyles styles={styles} />;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createUseThemeProps(name: string) {
  return useThemeProps;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_createExtendSxProp() {
  return extendSxProp;
}
