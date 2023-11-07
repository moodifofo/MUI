import * as React from 'react';
import type { ButtonGroupProps } from './ButtonGroup.types';

interface ButtonGroupContextType {
  className?: string;
  color?: ButtonGroupProps['color'];
  disabled?: boolean;
  disableElevation?: boolean;
  disableTouchRipple?: boolean;
  disableRipple?: boolean;
  fullWidth?: boolean;
  size?: ButtonGroupProps['size'];
  variant?: ButtonGroupProps['variant'];
}

/**
 * @ignore - internal component.
 */
const ButtonGroupContext = React.createContext<ButtonGroupContextType>({});

if (process.env.NODE_ENV !== 'production') {
  ButtonGroupContext.displayName = 'ButtonGroupContext';
}

export default ButtonGroupContext;
