import * as React from 'react';
import { OverrideProps, OverridableStringUnion } from '@mui/types';
import { ClickAwayListenerProps } from '@mui/base/ClickAwayListener';
import { UseSnackbarParameters } from '@mui/base/useSnackbar';
import { ColorPaletteProp, VariantProp, ApplyColorInversion, SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type SnackbarSlot = 'root' | 'startDecorator' | 'endDecorator';

export interface SnackbarSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the start decorator.
   * @default 'span'
   */
  startDecorator?: React.ElementType;
  /**
   * The component that renders the end decorator.
   * @default 'span'
   */
  endDecorator?: React.ElementType;
}

export type SnackbarSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SnackbarSlots,
  {
    root: SlotProps<'div', {}, SnackbarOwnerState>;
    startDecorator: SlotProps<'span', {}, SnackbarOwnerState>;
    endDecorator: SlotProps<'span', {}, SnackbarOwnerState>;
  }
>;

export interface SnackbarPropsColorOverrides {}
export interface SnackbarPropsSizeOverrides {}
export interface SnackbarPropsVariantOverrides {}

export interface SnackbarOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export type { SnackbarCloseReason } from '@mui/base/useSnackbar';

export interface SnackbarTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Omit<UseSnackbarParameters, 'open'> & {
      /**
       * The anchor of the `Snackbar`.
       * On smaller screens, the component grows to occupy all the available width,
       * the horizontal alignment is ignored.
       * @default { vertical: 'bottom', horizontal: 'left' }
       */
      anchorOrigin?: SnackbarOrigin;
      /**
       * The duration of the animation in milliseconds. This value is used to control
       * the length of time it takes for an animation to complete one cycle. It is also
       * utilized for delaying the unmount of the component.
       * Provide this value if you have your own animation so that we can precisely
       * time the component's unmount to match your custom animation.
       * @default 500
       */
      animationDuration?: number;
      /**
       * Props applied to the `ClickAwayListener` element.
       */
      ClickAwayListenerProps?: Partial<ClickAwayListenerProps>;
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, SnackbarPropsColorOverrides>;
      /**
       * If `true`, the children with an implicit color prop invert their colors to match the component's variant and color.
       * @default false
       */
      invertedColors?: boolean;
      /**
       * When displaying multiple consecutive snackbars using a single parent-rendered
       * `<Snackbar/>`, add the `key` prop to ensure independent treatment of each message.
       * For instance, use `<Snackbar key={message} />`. Otherwise, messages might update
       * in place, and features like `autoHideDuration` could be affected.
       */
      key?: any;
      /**
       * If `true`, the component is shown.
       */
      open: boolean;
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', SnackbarPropsSizeOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'outlined'
       */
      variant?: OverridableStringUnion<VariantProp, SnackbarPropsVariantOverrides>;
    } & SnackbarSlotsAndSlotProps;
  defaultComponent: D;
}

export type SnackbarProps<
  D extends React.ElementType = SnackbarTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<SnackbarTypeMap<P, D>, D>;

export interface SnackbarOwnerState extends ApplyColorInversion<SnackbarProps> {}
