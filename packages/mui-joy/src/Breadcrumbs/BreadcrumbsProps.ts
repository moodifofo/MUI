import { OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { SxProps } from '../styles/types';

export type BreadcrumbsSlot = 'root' | 'ol' | 'li' | 'separator';

export interface BreadcrumbsPropsSizeOverrides {}

export interface BreadcrumbsTypeMap<P = {}, D extends React.ElementType = 'nav'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override the default label for the expand button.
     *
     * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
     * @default 'Show path'
     */
    expandText?: string;
    /**
     * If max items is exceeded, the number of items to show after the ellipsis.
     * @default 1
     */
    itemsAfterCollapse?: number;
    /**
     * If max items is exceeded, the number of items to show before the ellipsis.
     * @default 1
     */
    itemsBeforeCollapse?: number;
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
