import * as React from 'react';
import { StandardProps } from '..';
import { Orientation } from '../Stepper';

export type StepConnectorIcon = React.ReactElement | string | number;

export interface StepConnectorProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepConnectorClasskey> {
  active?: boolean;
  alternativeLabel?: boolean;
  completed?: boolean;
  disabled?: boolean;
  index?: number;
  orientation?: Orientation;
}

export type StepConnectorClasskey =
  | 'root'
  | 'horizontal'
  | 'vertical'
  | 'alternativeLabel'
  | 'active'
  | 'completed'
  | 'disabled'
  | 'line'
  | 'lineHorizontal'
  | 'lineVertical';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/steppers Steppers}
 *
 * API:
 * - {@link https://material-ui.com/api/StepConnector StepConnector API}
 *
 */
declare const StepConnector: React.ComponentType<StepConnectorProps>;

export default StepConnector;
