import * as React from 'react';
import { StandardProps } from '..';
import { Orientation } from '../Stepper';

export interface StepProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepClasskey> {
  active?: boolean;
  alternativeLabel?: boolean;
  children?: React.ReactNode;
  completed?: boolean;
  connector?: React.ReactElement;
  disabled?: boolean;
  expanded?: boolean;
  index?: number;
  last?: boolean;
  orientation?: Orientation;
}

export type StepClasskey = 'root' | 'horizontal' | 'vertical' | 'alternativeLabel' | 'completed';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/steppers Steppers}
 *
 * API:
 * - {@link https://material-ui.com/api/Step Step API}
 *
 */
declare const Step: React.ComponentType<StepProps>;

export default Step;
