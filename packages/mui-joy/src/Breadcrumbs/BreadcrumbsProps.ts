import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotComponentProps } from '../utils/types';

export type BreadcrumbsSlot = 'root' | 'ol' | 'li' | 'separator';

export interface BreadcrumbsPropsSizeOverrides {}

interface ComponentsProps {
  root?: SlotComponentProps<'nav', {}, BreadcrumbsOwnerState>;
  ol?: SlotComponentProps<'ol', {}, BreadcrumbsOwnerState>;
  li?: SlotComponentProps<'li', {}, BreadcrumbsOwnerState>;
  separator?: SlotComponentProps<'li', {}, BreadcrumbsOwnerState>;
}

export interface BreadcrumbsTypeMap<P = {}, D extends React.ElementType = 'nav'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Replace the default slots.
     */
    slots?: {
      root?: React.ElementType;
      ol?: React.ElementType;
      li?: React.ElementType;
      separator?: React.ElementType;
    };
    /**
     * The props used for each slot inside the component.
     * @default {}
     */
    slotProps?: ComponentsProps;
    /**
     * Custom separator node.
     * @default '/'
     */
    separator?: React.ReactNode;
    /**
     * The size of the component.
     * It accepts theme values between 'sm' and 'lg'.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', BreadcrumbsPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type BreadcrumbsProps<
  D extends React.ElementType = BreadcrumbsTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<BreadcrumbsTypeMap<P, D>, D>;

export interface BreadcrumbsOwnerState extends BreadcrumbsProps {}
