import * as React from 'react';
import { FormControlProps } from './FormControlProps';

/**
 * @internal
 */
export type FormControlContextValue =
  | undefined
  | (Pick<FormControlProps, 'error' | 'disabled' | 'required' | 'variant' | 'color' | 'size'> & {
      htmlFor: string | undefined;
      'aria-describedby': string | undefined;
      setHelperText: (node: null | HTMLElement) => void;
      registerEffect: () => () => void;
    });

const FormControlContext = React.createContext<FormControlContextValue>(undefined);

export default FormControlContext;
