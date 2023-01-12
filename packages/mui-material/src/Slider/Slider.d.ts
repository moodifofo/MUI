import * as React from 'react';
import { SlotComponentProps } from '@mui/base';
import { SliderUnstyledTypeMap } from '@mui/base/SliderUnstyled';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import SliderValueLabelComponent from './SliderValueLabel';
import { SliderValueLabelProps } from './SliderValueLabel.types';

export interface SliderPropsColorOverrides {}

export interface SliderPropsSizeOverrides {}

export interface SliderComponentsPropsOverrides {}

export interface SliderOwnerState extends SliderProps {
  dragging: boolean;
  marked: boolean;
  focusedThumbIndex: number;
}

export type SliderTypeMap<D extends React.ElementType = 'span', P = {}> = {
  props: P & {
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'primary'
     */
    color?: OverridableStringUnion<'primary' | 'secondary', SliderPropsColorOverrides>;
    /**
     * The components used for each slot inside.
     *
     * This prop is an alias for the `slots` prop.
     * It's recommended to use the `slots` prop instead.
     *
     * @default {}
     */
    components?: {
      Root?: React.ElementType;
      Track?: React.ElementType;
      Rail?: React.ElementType;
      Thumb?: React.ElementType;
      Mark?: React.ElementType;
      MarkLabel?: React.ElementType;
      ValueLabel?: React.ElementType;
      Input?: React.ElementType;
    };
    /**
     * The extra props for the slot components.
     * You can override the existing props or add new ones.
     *
     * This prop is an alias for the `slotProps` prop.
     * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
     *
     * @default {}
     */
    componentsProps?: {
      root?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
      track?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
      rail?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
      thumb?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
      mark?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
      markLabel?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
      valueLabel?: SlotComponentProps<
        typeof SliderValueLabelComponent,
        SliderComponentsPropsOverrides,
        SliderOwnerState
      >;
      input?: SlotComponentProps<'input', SliderComponentsPropsOverrides, SliderOwnerState>;
    };
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: SliderUnstyledTypeMap['props']['classes'] & {
      /** Class name applied to the root element if `color="primary"`. */
      colorPrimary?: string;
      /** Class name applied to the root element if `color="secondary"`. */
      colorSecondary?: string;
      /** Class name applied to the root element if `size="small"`. */
      sizeSmall?: string;
      /** Class name applied to the thumb element if `color="primary"`. */
      thumbColorPrimary?: string;
      /** Class name applied to the thumb element if `color="secondary"`. */
      thumbColorSecondary?: string;
      /** Class name applied to the thumb element if `size="small"`. */
      thumbSizeSmall?: string;
      /** Class name applied to the thumb label element. */
      valueLabel: string;
      /** Class name applied to the thumb label element if it's open. */
      valueLabelOpen: string;
      /** Class name applied to the thumb label's circle element. */
      valueLabelCircle: string;
      /** Class name applied to the thumb label's label element. */
      valueLabelLabel: string;
    };
    /**
     * The size of the slider.
     * @default 'medium'
     */
    size?: OverridableStringUnion<'small' | 'medium', SliderPropsSizeOverrides>;
    /**
     * The props used for each slot inside the Slider.
     * @default {}
     */
    slotProps?: {
      root?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
      track?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
      rail?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
      thumb?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
      mark?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
      markLabel?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
      valueLabel?: SlotComponentProps<
        typeof SliderValueLabelComponent,
        SliderComponentsPropsOverrides,
        SliderOwnerState
      >;
      input?: SlotComponentProps<'input', SliderComponentsPropsOverrides, SliderOwnerState>;
    };
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * Controls when the value label is displayed:
     *
     * - `auto` the value label will display when the thumb is hovered or focused.
     * - `on` will display persistently.
     * - `off` will never display.
     * @default 'off'
     */
    valueLabelDisplay?: 'on' | 'auto' | 'off';
  } & Omit<SliderUnstyledTypeMap['props'], 'slotProps' | 'isRtl'>;
  defaultComponent: D;
};

export { SliderValueLabelProps };

type SliderRootProps = NonNullable<SliderTypeMap['props']['componentsProps']>['root'];
type SliderMarkProps = NonNullable<SliderTypeMap['props']['componentsProps']>['mark'];
type SliderMarkLabelProps = NonNullable<SliderTypeMap['props']['componentsProps']>['markLabel'];
type SliderRailProps = NonNullable<SliderTypeMap['props']['componentsProps']>['rail'];
type SliderTrackProps = NonNullable<SliderTypeMap['props']['componentsProps']>['track'];
type SliderThumbProps = NonNullable<SliderTypeMap['props']['componentsProps']>['thumb'];

export declare const SliderRoot: React.FC<SliderRootProps>;
export declare const SliderMark: React.FC<SliderMarkProps>;
export declare const SliderMarkLabel: React.FC<SliderMarkLabelProps>;
export declare const SliderRail: React.FC<SliderRailProps>;
export declare const SliderTrack: React.FC<SliderTrackProps>;
export declare const SliderThumb: React.FC<SliderThumbProps>;
export declare const SliderValueLabel: React.FC<SliderValueLabelProps>;

/**
 *
 * Demos:
 *
 * - [Slider](https://mui.com/material-ui/react-slider/)
 *
 * API:
 *
 * - [Slider API](https://mui.com/material-ui/api/slider/)
 */
declare const Slider: OverridableComponent<SliderTypeMap>;

export type SliderClassKey = keyof NonNullable<SliderTypeMap['props']['classes']>;

export type SliderProps<
  D extends React.ElementType = SliderTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<SliderTypeMap<D, P>, D>;

export type SliderClasses = Record<SliderClassKey, string>;

export declare const sliderClasses: SliderClasses;

export default Slider;
