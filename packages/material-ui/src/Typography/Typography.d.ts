import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { Style, TextStyle } from '../styles/createTypography';

export interface TypographyProps<C = {}>
  extends StandardProps<React.HTMLAttributes<HTMLElement>, TypographyClassKey> {
  align?: PropTypes.Alignment;
  color?: PropTypes.Color | 'textSecondary' | 'error';
  component?: React.ReactType<C>;
  gutterBottom?: boolean;
  headlineMapping?: { [type in TextStyle]: string };
  noWrap?: boolean;
  paragraph?: boolean;
  variant?: Style | 'caption' | 'button';
}

export type TypographyClassKey =
  | 'root'
  | 'display4'
  | 'display3'
  | 'display2'
  | 'display1'
  | 'headline'
  | 'title'
  | 'subheading'
  | 'body2'
  | 'body1'
  | 'caption'
  | 'button'
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify'
  | 'noWrap'
  | 'gutterBottom'
  | 'paragraph'
  | 'colorInherit'
  | 'colorSecondary'
  | 'colorTextSecondary';

  declare class Typography<C> extends React.Component<C & TypographyProps<C>> {}

export default Typography;
