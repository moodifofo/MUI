import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';
import { SlotComponentProps } from '../utils/types';

export type ListItemSlot = 'root' | 'startAction' | 'endAction';

export interface ListItemPropsVariantOverrides {}
export interface ListItemPropsColorOverrides {}

interface ComponentsProps {
  root?: SlotComponentProps<'div', {}, ListItemOwnerState>;
  startAction?: SlotComponentProps<'span', {}, ListItemOwnerState>;
  endAction?: SlotComponentProps<'span', {}, ListItemOwnerState>;
}

export interface ListItemTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ListItemPropsColorOverrides>;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Replace the default slots.
     */
    slots?: {
      root?: React.ElementType;
      startAction?: React.ElementType;
      endAction?: React.ElementType;
    };
    /**
     * The props used for each slot inside the component.
     * @default {}
     */
    slotProps?: ComponentsProps;
    /**
     * The element to display at the start of ListItem.
     */
    startAction?: React.ReactNode;
    /**
     * The element to display at the end of ListItem.
     */
    endAction?: React.ReactNode;
    /**
     * If `true`, the component can contain NestedList.
     * @default false
     */
    nested?: boolean;
    /**
     * If `true`, the component has sticky position (with top = 0).
     * @default false
     */
    sticky?: boolean;
    /**
     * The variant to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, ListItemPropsVariantOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type ListItemProps<
  D extends React.ElementType = ListItemTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<ListItemTypeMap<P, D>, D>;

export interface ListItemOwnerState extends ListItemProps {
  /**
   * If `true`, the element is rendered in a horizontal list.
   * @internal
   */
  row: boolean;
  /**
   * If `true`, the element is rendered in a wrapped list.
   * @internal
   */
  wrap: boolean;
  /**
   * If `true`, the element is rendered in a nested list item.
   */
  nesting: boolean | string;
  /**
   * @internal
   * The internal prop for controlling CSS margin of the element.
   */
  'data-first-child'?: boolean;
}
