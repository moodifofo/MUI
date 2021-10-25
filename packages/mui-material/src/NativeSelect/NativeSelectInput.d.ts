import * as React from 'react';
import { SxProps } from '@mui/system';
import {Theme} from '../styles/createTheme';

export interface NativeSelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  disabled?: boolean;
  IconComponent: React.ElementType;
  inputRef?: React.Ref<HTMLSelectElement>;
  variant?: 'standard' | 'outlined' | 'filled';
  sx?: SxProps<Theme>;
}

declare const NativeSelectInput: React.JSXElementConstructor<NativeSelectInputProps>;

export default NativeSelectInput;
