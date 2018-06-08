import * as React from 'react';
import { StandardProps } from '..';

export interface LinearProgressProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, LinearProgressClassKey> {
  color?: 'primary' | 'secondary';
  value?: number;
  valueBuffer?: number;
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  styles?: React.CSSProperties;
}

export type LinearProgressClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'buffer'
  | 'query'
  | 'dashed'
  | 'dashedColorPrimary'
  | 'dashedColorSecondary'
  | 'bar'
  | 'bar1'
  | 'bar2'
  | 'barColorPrimary'
  | 'barColorSecondary'
  | 'bar1Indeterminate'
  | 'bar2Indeterminate'
  | 'bar1Determinate'
  | 'bar1Buffer'
  | 'bar2Buffer';

declare const LinearProgress: React.ComponentType<LinearProgressProps>;

export default LinearProgress;
