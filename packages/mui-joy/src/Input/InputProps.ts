import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ApplyColorInversion, ColorPaletteProp, SxProps, VariantProp } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type InputSlot = 'root' | 'input' | 'startDecorator' | 'endDecorator';

export interface InputPropsVariantOverrides {}
export interface InputPropsColorOverrides {}
export interface InputPropsSizeOverrides {}

export type InputSlotsAndSlotProps = CreateSlotsAndSlotProps<
  InputSlot,
  {
    root: SlotProps<'div', {}, InputOwnerState>;
    input: SlotProps<'input', {}, InputOwnerState>;
    startDecorator: SlotProps<'span', {}, InputOwnerState>;
    endDecorator: SlotProps<'span', {}, InputOwnerState>;
  }
>;

export interface InputTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    InputSlotsAndSlotProps &
    Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      | 'autoComplete'
      | 'autoFocus'
      | 'onClick'
      | 'onChange'
      | 'onKeyDown'
      | 'onKeyUp'
      | 'onFocus'
      | 'onBlur'
      | 'defaultValue'
      | 'value'
      | 'type'
      | 'placeholder'
      | 'readOnly'
      | 'required'
      | 'name'
      | 'id'
      | 'disabled'
    > & {
      /**
       * Class name applied to the root element.
       */
      className?: string;
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, InputPropsColorOverrides>;
      /**
       * Trailing adornment for this input.
       */
      endDecorator?: React.ReactNode;
      /**
       * If `true`, the `input` will indicate an error.
       * The prop defaults to the value (`false`) inherited from the parent FormControl component.
       * @default false
       */
      error?: boolean;
      /**
       * If `true`, the button will take up the full width of its container.
       * @default false
       */
      fullWidth?: boolean;
      /**
       * Leading adornment for this input.
       */
      startDecorator?: React.ReactNode;
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', InputPropsSizeOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The variant to use.
       * @default 'outlined'
       */
      variant?: OverridableStringUnion<VariantProp, InputPropsVariantOverrides>;
    };
  defaultComponent: D;
}

export type InputProps<
  D extends React.ElementType = InputTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<InputTypeMap<P, D>, D>;

export default InputProps;

export interface InputOwnerState extends ApplyColorInversion<InputProps> {
  /**
   * If `true`, the input is focused.
   */
  focused: boolean;
}
