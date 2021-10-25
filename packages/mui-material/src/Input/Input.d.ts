import { SxProps } from '@mui/system';
import StandardProps from '../InternalStandardProps'; import { Theme } from '../styles/createTheme';
import { InputBaseProps } from '../InputBase';
import { InputClasses } from './inputClasses';

export interface InputProps extends StandardProps<InputBaseProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<InputClasses>;
  /**
   * If `true`, the `input` will not have an underline.
   */
  disableUnderline?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Text Fields](https://mui.com/components/text-fields/)
 *
 * API:
 *
 * - [Input API](https://mui.com/api/input/)
 * - inherits [InputBase API](https://mui.com/api/input-base/)
 */
declare const Input: ((props: InputProps) => JSX.Element) & { muiName: string };

export default Input;
