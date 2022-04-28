import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { UseSwitchProps } from '@mui/base/SwitchUnstyled';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type CheckboxSlot = 'root' | 'checkbox' | 'action' | 'input' | 'label';

export interface CheckboxPropsVariantOverrides {}

export interface CheckboxPropsColorOverrides {}

export interface CheckboxPropsSizeOverrides {}

export interface CheckboxTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P &
    UseSwitchProps & {
      /**
       * The icon to display when the component is checked.
       * @default <CheckIcon />
       */
      checkedIcon?: React.ReactNode;
      /**
       * Class name applied to the root element.
       */
      className?: string;
      /**
       * The component used for the Root slot.
       * Either a string to use a HTML element or a component.
       */
      component?: React.ElementType;
      /**
       * The props used for each slot inside the Input.
       * @default {}
       */
      componentsProps?: {
        root?: React.ComponentPropsWithRef<'span'>;
        action?: React.ComponentPropsWithRef<'span'>;
        checkbox?: React.ComponentPropsWithRef<'span'>;
        input?: React.ComponentPropsWithRef<'input'>;
        label?: React.ComponentPropsWithRef<'label'>;
      };
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<
        Exclude<ColorPaletteProp, 'context'>,
        CheckboxPropsColorOverrides
      >;
      /**
       * If `true`, the checked icon is removed and the selected variant is applied on the `action` element instead.
       * @default false
       */
      disableIcon?: boolean;
      /**
       * If `true`, the component appears indeterminate.
       * This does not set the native input element to indeterminate due
       * to inconsistent behavior across browsers.
       * However, we set a `data-indeterminate` attribute on the `input`.
       * @default false
       */
      indeterminate?: boolean;
      /**
       * The icon to display when the component is indeterminate.
       * @default <IndeterminateCheckBoxIcon />
       */
      indeterminateIcon?: React.ReactNode;
      /**
       * The label element next to the checkbox.
       */
      label?: React.ReactNode;
      /**
       * The `name` attribute of the input.
       */
      name?: string;
      /**
       * If `true`, the root element's position is set to initial which allows the action area to fill the nearest positioned parent.
       * This prop is useful for composing Checkbox with ListItem component.
       * @default false
       */
      overlay?: boolean;
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', CheckboxPropsSizeOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The variant to use.
       * @default 'contained'
       */
      variant?: OverridableStringUnion<Exclude<VariantProp, 'text'>, CheckboxPropsVariantOverrides>;
      /**
       * The icon when `checked` is false.
       */
      uncheckedIcon?: React.ReactNode;
    };
  defaultComponent: D;
}

export type CheckboxProps<
  D extends React.ElementType = CheckboxTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<CheckboxTypeMap<P, D>, D>;
