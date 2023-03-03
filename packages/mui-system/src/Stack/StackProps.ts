import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { ResponsiveStyleValue, SxProps } from '../styleFunctionSx';
import { SystemProps } from '../Box';
import { Theme } from '../createTheme';

export interface StackBaseProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing?: ResponsiveStyleValue<number | string>;
  /**
   * Add an element between each child.
   */
  divider?: React.ReactNode;
  /**
   * If `true`, the CSS flex `gap` is used instead of the pseudo selector approach.
   * To enable this flag globally, follow the theme's default props configuration.
   *
   * ⚠️ Warning: CSS flex `gap` is not fully supported in some browsers, we recommend to check https://caniuse.com/?search=flex%20gap before using this flag.
   * @default false
   */
  useFlexGap?: boolean;
}
export interface StackTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    StackBaseProps & {
      /**
       * The system prop, which allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
    } & SystemProps<Theme>;
  defaultComponent: D;
}

export type StackProps<
  D extends React.ElementType = StackTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<StackTypeMap<P, D>, D>;

export interface StackOwnerState {
  direction: StackProps['direction'];
  spacing: StackProps['spacing'];
  useFlexGap: boolean;
}
