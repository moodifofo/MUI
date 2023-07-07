import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type SkeletonSlot = 'root';

export interface SkeletonSlots {
  /**
   * The component that renders the root.
   * @default 'span'
   */
  root?: React.ElementType;
}

export type SkeletonSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SkeletonSlots,
  {
    root: SlotProps<'span', {}, SkeletonOwnerState>;
  }
>;

export interface SkeletonTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * The animation.
     * If `false` the animation effect is disabled.
     * @default 'pulse'
     */
    animation?: 'pulse' | 'wave' | false;
    /**
     * Used to render icon or text elements inside the Skeleton if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * Height of the skeleton.
     * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
     */
    height?: number | string;
    /**
     * If `true`, the skeleton's position will change to `absolute` to fill the available space of the nearest parent.
     * This prop is useful to create a placeholder that has the element's dimensions.
     * @default false
     */
    overlay?: boolean;
    /**
     * The type of content that will be rendered.
     * @default 'text'
     */
    shape?: 'text' | 'circular' | 'rectangular';
    /**
     * Width of the skeleton.
     * Useful when the skeleton is inside an inline element with no width of its own.
     */
    width?: number | string;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & SkeletonSlotsAndSlotProps;
  defaultComponent: D;
}

export type SkeletonProps<
  D extends React.ElementType = SkeletonTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<SkeletonTypeMap<P, D>, D>;

export interface SkeletonOwnerState extends SkeletonProps {}
