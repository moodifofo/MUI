import * as React from 'react';
import type { ButtonGroupProps } from './ButtonGroup.types';

export interface IButtonGroupContext {
  className?: string;
  color?: ButtonGroupProps['color'];
  disabled?: boolean;
  disableElevation?: boolean;
  disableRipple?: boolean;
  disableTouchRipple?: boolean;
  fullWidth?: boolean;
  size?: ButtonGroupProps['size'];
  variant?: ButtonGroupProps['variant'];
}

/**
 * @ignore - internal component.
 */
const ButtonGroupContext = React.createContext<IButtonGroupContext>({});

if (process.env.NODE_ENV !== 'production') {
  ButtonGroupContext.displayName = 'ButtonGroupContext';
}

export default ButtonGroupContext;
