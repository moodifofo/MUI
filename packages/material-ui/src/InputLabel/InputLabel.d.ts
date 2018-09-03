import * as React from 'react';
import { StandardProps } from '..';
import { FormLabelProps, FormLabelClassKey } from '../FormLabel';

export interface InputLabelProps extends StandardProps<FormLabelProps, InputLabelClassKey> {
  disableAnimation?: boolean;
  disabled?: boolean;
  error?: boolean;
  FormLabelClasses?: FormLabelProps['classes'];
  focused?: boolean;
  required?: boolean;
  shrink?: boolean;
}

export type InputLabelClassKey = 'root' | 'formControl' | 'marginDense' | 'shrink' | 'animated';

declare const InputLabel: React.ComponentType<InputLabelProps>;

export default InputLabel;
