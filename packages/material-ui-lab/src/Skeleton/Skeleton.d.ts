import * as React from 'react';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';

export interface SkeletonTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    animation?: 'pulse' | 'wave' | false;
    height?: number | string;
    variant?: 'text' | 'rect' | 'circle';
    width?: number | string;
  };
  defaultComponent: 'div';
  classKey: SkeletonClassKey;
}

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/skeleton Skeleton}
 *
 * API:
 * - {@link https://material-ui.com/api/Skeleton Skeleton API}
 *
 */
declare const Skeleton: OverridableComponent<SkeletonTypeMap>;

export type SkeletonClassKey = 'root' | 'text' | 'rect' | 'circle' | 'pulse' | 'wave';

export type SkeletonProps<
  D extends React.ElementType = SkeletonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SkeletonTypeMap<P, D>, D>;

export default Skeleton;
