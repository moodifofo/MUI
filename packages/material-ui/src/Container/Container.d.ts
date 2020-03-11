import * as React from 'react';
import { StandardProps } from '..';

export interface ContainerProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ContainerClassKey> {
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  disableGutters?: boolean;
  fixed?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

export type ContainerClassKey =
  | 'root'
  | 'disableGutters'
  | 'fixed'
  | 'maxWidthXs'
  | 'maxWidthSm'
  | 'maxWidthMd'
  | 'maxWidthLg'
  | 'maxWidthXl';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/container Container}
 *
 * API:
 * - {@link https://material-ui.com/api/Container Container API}
 *
 */
declare const Container: React.ComponentType<ContainerProps>;

export default Container;
