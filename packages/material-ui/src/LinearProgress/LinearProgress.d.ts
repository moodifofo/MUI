import * as React from 'react';
import { StandardProps } from '..';

export interface LinearProgressProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, LinearProgressClassKey> {
  color?: 'primary' | 'secondary' | 'error';
  value?: number;
  valueBuffer?: number;
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
}

export type LinearProgressClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'colorError'
  | 'determinate'
  | 'indeterminate'
  | 'buffer'
  | 'query'
  | 'dashed'
  | 'dashedColorPrimary'
  | 'dashedColorSecondary'
  | 'dashedColorError'
  | 'bar'
  | 'barColorPrimary'
  | 'barColorSecondary'
  | 'barColorError'
  | 'bar1Indeterminate'
  | 'bar2Indeterminate'
  | 'bar1Determinate'
  | 'bar1Buffer'
  | 'bar2Buffer';

declare const LinearProgress: React.ComponentType<LinearProgressProps>;

export default LinearProgress;
