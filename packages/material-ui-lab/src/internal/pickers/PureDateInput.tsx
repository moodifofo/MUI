import * as React from 'react';
import PropTypes from 'prop-types';
import { TextFieldProps as MuiTextFieldPropsType } from '@material-ui/core/TextField';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import InputAdornment, { InputAdornmentProps } from '@material-ui/core/InputAdornment';
import { onSpaceOrEnter } from './utils';
import { ParsableDate } from './constants/prop-types';
import { useUtils, MuiPickersAdapter } from './hooks/useUtils';
import { getDisplayDate, getTextFieldAriaText } from './text-field-helper';

// make `variant` optional
export type MuiTextFieldProps = MuiTextFieldPropsType | Omit<MuiTextFieldPropsType, 'variant'>;

export interface DateInputProps<TInputValue = ParsableDate, TDateValue = unknown> {
  open: boolean;
  rawValue: TInputValue;
  inputFormat: string;
  onChange: (date: TDateValue, keyboardInputValue?: string) => void;
  openPicker: () => void;
  readOnly?: boolean;
  disabled?: boolean;
  validationError?: boolean;
  label?: MuiTextFieldProps['label'];
  InputProps?: MuiTextFieldProps['InputProps'];
  TextFieldProps?: Partial<MuiTextFieldProps>;
  // lib/src/wrappers/DesktopPopperWrapper.tsx:87
  onBlur?: () => void;
  // ?? TODO when it will be possible to display "empty" date in datepicker use it instead of ignoring invalid inputs
  ignoreInvalidInputs?: boolean;
  /**
   * The `renderInput` prop allows you to customize the rendered input.
   * The `props` argument of this render prop contains props of [TextField](https://material-ui.com/api/text-field/#textfield-api) that you need to forward.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example ```jsx
   * renderInput={props => <TextField {...props} />}
   * ````
   */
  renderInput: (props: MuiTextFieldPropsType) => React.ReactElement;
  /**
   * Icon displaying for open picker button.
   */
  openPickerIcon?: React.ReactNode;
  /**
   * Custom mask. Can be used to override generate from format. (e.g. __/__/____ __:__ or __/__/____ __:__ _M)
   */
  mask?: string;
  /**
   * Regular expression to detect "accepted" symbols.
   * @default /\dap/gi
   */
  acceptRegex?: RegExp;
  /**
   * Props to pass to keyboard input adornment.
   */
  InputAdornmentProps?: Partial<InputAdornmentProps>;
  /**
   * Props to pass to keyboard adornment button.
   */
  OpenPickerButtonProps?: Partial<IconButtonProps>;
  /**
   * Custom formatter to be passed into Rifm component.
   */
  rifmFormatter?: (str: string) => string;
  /**
   * Do not render open picker button (renders only text field with validation).
   * @default false
   */
  disableOpenPicker?: boolean;
  /**
   * Disable mask on the keyboard, this should be used rarely. Consider passing proper mask for your format.
   * @default false
   */
  disableMaskedInput?: boolean;
  /**
   * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType
   * @default (value, utils) => `Choose date, selected date is ${utils.format(utils.date(value), 'fullDate')}`
   */
  getOpenDialogAriaText?: (value: ParsableDate, utils: MuiPickersAdapter) => string;
}

export type ExportedDateInputProps<TInputValue, TDateValue> = Omit<
  DateInputProps<TInputValue, TDateValue>,
  | 'openPicker'
  | 'inputValue'
  | 'onChange'
  | 'inputFormat'
  | 'validationError'
  | 'rawValue'
  | 'forwardedRef'
  | 'open'
  | 'TextFieldProps'
  | 'onBlur'
>;

export interface DateInputRefs {
  inputRef?: React.Ref<HTMLInputElement>;
  containerRef?: React.Ref<HTMLDivElement>;
  forwardedRef?: React.Ref<HTMLInputElement>;
}

export const PureDateInput: React.FC<DateInputProps & DateInputRefs> = ({
  containerRef,
  forwardedRef,
  disableOpenPicker,
  getOpenDialogAriaText = getTextFieldAriaText,
  InputProps,
  openPicker: onOpen,
  OpenPickerButtonProps,
  openPickerIcon = null,
  renderInput,
  TextFieldProps = {},
  ...other
}) => {
  const utils = useUtils();
  const PureDateInputProps = React.useMemo(
    () => ({
      ...InputProps,
      readOnly: true,
    }),
    [InputProps],
  );

  const adornmentPosition = other.InputAdornmentProps?.position ?? 'end';
  const inputValue = getDisplayDate(utils, other.rawValue, other.inputFormat);

  return renderInput({
    label: other.label,
    disabled: other.disabled,
    ref: containerRef,
    inputRef: forwardedRef,
    error: other.validationError,
    InputProps: {
      ...PureDateInputProps,
      [`${adornmentPosition}Adornment`]: disableOpenPicker ? undefined : (
        <InputAdornment position={adornmentPosition} {...other.InputAdornmentProps}>
          <IconButton
            edge={adornmentPosition}
            data-mui-test="open-picker-from-keyboard"
            disabled={other.disabled}
            aria-label={getOpenDialogAriaText(other.rawValue, utils)}
            {...OpenPickerButtonProps}
            onClick={onOpen}
          >
            {openPickerIcon}
          </IconButton>
        </InputAdornment>
      ),
    },
    inputProps: {
      disabled: other.disabled,
      readOnly: true,
      'aria-readonly': true,
      'aria-label': getOpenDialogAriaText(other.rawValue, utils),
      value: inputValue,
      onClick: onOpen,
      onKeyDown: onSpaceOrEnter(onOpen),
    },
    ...TextFieldProps,
  });
};

PureDateInput.propTypes = {
  acceptRegex: PropTypes.instanceOf(RegExp),
  getOpenDialogAriaText: PropTypes.func,
  mask: PropTypes.string,
  OpenPickerButtonProps: PropTypes.object,
  openPickerIcon: PropTypes.node,
  renderInput: PropTypes.func.isRequired,
  rifmFormatter: PropTypes.func,
};
