import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { FormLabelProps, FormLabelBaseProps } from '../FormLabel';
import { Theme } from '../styles';
import { InputLabelClasses } from './inputLabelClasses';
import { InternalStandardProps as StandardProps } from '..';

export interface InputLabelPropsSizeOverrides {}

interface BaseProps extends Omit<StandardProps<FormLabelProps>, keyof FormLabelBaseProps> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<InputLabelClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   */
  color?: FormLabelProps['color'];
  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the `input` of this label is focused.
   */
  focused?: boolean;
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense';
  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required?: boolean;
  /**
   * If `true`, the label is shrunk.
   */
  shrink?: boolean;
  /**
   * The size of the component.
   * @default 'normal'
   */
  size?: OverridableStringUnion<'small' | 'normal', InputLabelPropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The variant to use.
   */
  variant?: 'standard' | 'outlined' | 'filled';
}

export interface InputLabelTypeMap<P = {}, D extends React.ElementType = 'label'> {
  props: P & BaseProps;
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Text Field](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [InputLabel API](https://mui.com/material-ui/api/input-label/)
 * - inherits [FormLabel API](https://mui.com/material-ui/api/form-label/)
 */
declare const InputLabel: OverridableComponent<InputLabelTypeMap>;

export type InputLabelProps<
  D extends React.ElementType = InputLabelTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<InputLabelTypeMap<P, D>, D>;

export default InputLabel;
