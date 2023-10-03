import { SxProps } from '@mui/system';
// eslint-disable-next-line no-restricted-imports
import { InternalStandardProps as StandardProps } from '@mui/material';
import { PolymorphicProps } from '@mui/base/utils';
import { Simplify } from '@mui/types';
import { Theme } from '../styles/Theme.types';
import { InputBaseProps } from '../InputBase/InputBase.types';
import { FilledInputClasses } from './filledInputClasses';

export type FilledInputOwnProps = StandardProps<InputBaseProps> & {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FilledInputClasses>;
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel?: boolean;
  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
};

export interface FilledInputTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'div',
> {
  props: FilledInputOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type FilledInputProps<
  RootComponentType extends React.ElementType = FilledInputTypeMap['defaultComponent'],
> = PolymorphicProps<FilledInputTypeMap<{}, RootComponentType>, RootComponentType>;

export type FilledInputOwnerState = Simplify<
  FilledInputOwnProps & {
    disableUnderline?: boolean;
    fullWidth: boolean;
    inputComponent: React.ElementType;
    multiline: boolean;
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  }
>;
