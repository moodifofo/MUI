import * as React from 'react';
import { OverridableComponent, OverrideProps } from '@material-ui/types';
import {
  SxProps,
  StandardCSSProperties,
  ResponsiveStyleValue,
  OverwriteCSSProperties,
  AliasesCSSProperties,
} from '../styleFunctionSx';

export type PropsFor<SomeStyleFunction> = SomeStyleFunction extends StyleFunction<infer Props>
  ? Props
  : never;
export type StyleFunction<Props> = (props: Props) => any;
export type SimpleStyleFunction<PropKey extends keyof any> = StyleFunction<
  Partial<Record<PropKey, any>>
>;

// borders.js
export const borders: SimpleStyleFunction<
  | 'border'
  | 'borderTop'
  | 'borderRight'
  | 'borderBottom'
  | 'borderLeft'
  | 'borderColor'
  | 'borderRadius'
>;

export const display: SimpleStyleFunction<
  'display' | 'displayPrint' | 'overflow' | 'textOverflow' | 'visibility' | 'whiteSpace'
>;

export const flexbox: SimpleStyleFunction<
  | 'flexBasis'
  | 'flexDirection'
  | 'flexWrap'
  | 'justifyContent'
  | 'alignItems'
  | 'alignContent'
  | 'order'
  | 'flex'
  | 'flexGrow'
  | 'flexShrink'
  | 'alignSelf'
  | 'justifyItems'
  | 'justifySelf'
>;

export const grid: SimpleStyleFunction<
  | 'gap'
  | 'columnGap'
  | 'rowGap'
  | 'gridColumn'
  | 'gridRow'
  | 'gridAutoFlow'
  | 'gridAutoColumns'
  | 'gridAutoRows'
  | 'gridTemplateColumns'
  | 'gridTemplateRows'
  | 'gridTemplateAreas'
  | 'gridArea'
>;

export const palette: SimpleStyleFunction<'bgcolor' | 'color'>;

export const positions: SimpleStyleFunction<
  'zIndex' | 'position' | 'top' | 'right' | 'bottom' | 'left'
>;

export const shadows: SimpleStyleFunction<'boxShadow'>;

export const sizing: SimpleStyleFunction<
  | 'width'
  | 'maxWidth'
  | 'minWidth'
  | 'height'
  | 'maxHeight'
  | 'minHeight'
  | 'sizeWidth'
  | 'sizeHeight'
  | 'boxSizing'
>;

export const spacing: SimpleStyleFunction<
  | 'm'
  | 'mt'
  | 'mr'
  | 'mb'
  | 'ml'
  | 'mx'
  | 'my'
  | 'p'
  | 'pt'
  | 'pr'
  | 'pb'
  | 'pl'
  | 'px'
  | 'py'
  | 'margin'
  | 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginX'
  | 'marginY'
  | 'padding'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingX'
  | 'paddingY'
>;

export const typography: SimpleStyleFunction<
  | 'typography'
  | 'fontFamily'
  | 'fontSize'
  | 'fontStyle'
  | 'fontWeight'
  | 'letterSpacing'
  | 'lineHeight'
  | 'textAlign'
>;

// compose.js
/**
 * given a list of StyleFunction return the intersection of the props each individual
 * StyleFunction requires.
 *
 * If `firstFn` requires { color: string } and `secondFn` requires { spacing: number }
 * their composed function requires { color: string, spacing: number }
 */
type ComposedArg<T> = T extends Array<(arg: infer P) => any> ? P : never;
type ComposedStyleProps<T> = ComposedArg<T>;

export type ComposedStyleFunction<T extends Array<StyleFunction<any>>> = StyleFunction<
  ComposedStyleProps<T>
>;

export type CustomSystemProps = OverwriteCSSProperties & AliasesCSSProperties;

export type SimpleSystemKeys = keyof Omit<
  PropsFor<
    ComposedStyleFunction<
      [
        typeof borders,
        typeof display,
        typeof flexbox,
        typeof grid,
        typeof palette,
        typeof positions,
        typeof shadows,
        typeof sizing,
        typeof spacing,
        typeof typography,
      ]
    >
  >,
  keyof CustomSystemProps
>;

// The SimpleSystemKeys are subset of the StandardCSSProperties, so this should be ok
// This is needed as these are used as keys inside StandardCSSProperties
type StandardSystemKeys = Extract<SimpleSystemKeys, keyof StandardCSSProperties>;

export type SystemProps = {
  [K in StandardSystemKeys]?: ResponsiveStyleValue<StandardCSSProperties[K]>;
} &
  CustomSystemProps;

export interface Theme {}

export interface BoxTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    SystemProps & {
      theme?: object;
      children?: React.ReactNode;
      component?: React.ElementType;
      ref?: React.Ref<unknown>;
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
}

declare const Box: OverridableComponent<BoxTypeMap>;

export type BoxProps<D extends React.ElementType = BoxTypeMap['defaultComponent'], P = {}> =
  OverrideProps<BoxTypeMap<P, D>, D>;

export default Box;
