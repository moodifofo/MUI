import * as React from 'react';
import Modal, { ModalTypeMap } from '../Modal';
import Sheet from '../Sheet';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type DrawerSlot = 'root' | 'label' | 'action' | 'startDecorator' | 'endDecorator';

export interface DrawerSlots {
  /**
   * The component that renders the root.
   * @default Modal
   */
  root?: React.ElementType;
  /**
   * The component that renders the content inside the drawer.
   * @default Sheet
   */
  sheet?: React.ElementType;
}

export interface DrawerPropsColorOverrides {}
export interface DrawerPropsSizeOverrides {}
export interface DrawerPropsVariantOverrides {}

export type DrawerSlotsAndSlotProps = CreateSlotsAndSlotProps<
  DrawerSlots,
  {
    root: SlotProps<typeof Modal, {}, DrawerOwnerState>;
    sheet: SlotProps<typeof Sheet, {}, DrawerOwnerState>;
  }
>;

export interface DrawerTypeMap<P = {}, D extends React.ElementType = Modal> {
  props: P &
    DrawerSlotsAndSlotProps & {
      /**
       * Side from which the drawer will appear.
       * @default 'left'
       */
      anchor?: 'left' | 'top' | 'right' | 'bottom';
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
    };
  defaultComponent: D;
}

export type DrawerProps<
  D extends React.ElementType = DrawerTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<DrawerTypeMap<P, D>, D>;

export interface DrawerOwnerState extends DrawerProps {}
