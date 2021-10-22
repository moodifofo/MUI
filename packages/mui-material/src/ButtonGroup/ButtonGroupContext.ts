import * as React from 'react';
import { ButtonGroupProps } from '.';

interface IButtonGroupContext {
  className?: string;
  color?: ButtonGroupProps['color'];
  disabled?: boolean;
  disabledElevation?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
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
