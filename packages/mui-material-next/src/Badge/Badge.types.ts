import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion, OverridableComponent, OverrideProps } from '@mui/types';
import {
  BadgeTypeMap as BaseBadgeTypeMap,
  BadgeRootSlotProps as BaseBadgeRootSlotProps,
  BadgeBadgeSlotProps as BaseBadgeBadgeSlotProps,
  ExtendBadgeTypeMap,
} from '@mui/base/Badge';
import { Theme } from '../styles';
import { BadgeClasses } from './badgeClasses';

export interface BadgePropsVariantOverrides {}

export interface BadgePropsColorOverrides {}

export interface BadgeOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

export type BadgeTypeMap<D extends React.ElementType = 'span', P = {}> = ExtendBadgeTypeMap<{
  props: P & {
    /**
     * The anchor of the badge.
     * @default {
     *   vertical: 'top',
     *   horizontal: 'right',
     * }
     */
    anchorOrigin?: BadgeOrigin;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<BadgeClasses>;
    /**
     * @ignore
     */
    className?: string;
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'error'
     */
    color?: OverridableStringUnion<
      'primary' | 'secondary' | 'tertiary' | 'error',
      BadgePropsColorOverrides
    >;
    /**
     * The extra props for the slot components.
     * You can override the existing props or add new ones.
     *
     * This prop is an alias for the `slotProps` prop.
     * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
     *
     * @default {}
     */
    componentsProps?: BaseBadgeTypeMap['props']['slotProps'];
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
      Badge?: React.ElementType;
    };
    /**
     * Wrapped shape the badge should overlap.
     * @default 'rectangular'
     */
    overlap?: 'rectangular' | 'circular';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The variant to use.
     * @default 'large'
     */
    variant?: OverridableStringUnion<'large' | 'small', BadgePropsVariantOverrides>;
  };
  defaultComponent: D;
}>;

export type BadgeRootSlotProps = BaseBadgeRootSlotProps & BadgeProps;
export type BadgeBadgeSlotProps = BaseBadgeBadgeSlotProps;

export declare const BadgeRoot: React.FC<BadgeRootSlotProps>;
export declare const BadgeMark: React.FC<BadgeBadgeSlotProps>;

/**
 *
 * Demos:
 *
 * - [Avatar](https://mui.com/material-ui/react-avatar/)
 * - [Badge](https://mui.com/material-ui/react-badge/)
 *
 * API:
 *
 * - [Badge API](https://mui.com/material-ui/api/badge/)
 */
declare const Badge: OverridableComponent<BadgeTypeMap>;

export type BadgeProps<
  D extends React.ElementType = BadgeTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BadgeTypeMap<D, P>, D>;

export interface BadgeOwnerState extends BadgeProps {
  anchorOrigin: NonNullable<BadgeProps['anchorOrigin']>;
  overlap: NonNullable<BadgeProps['overlap']>;
  color: NonNullable<BadgeProps['color']>;
}

export default Badge;
