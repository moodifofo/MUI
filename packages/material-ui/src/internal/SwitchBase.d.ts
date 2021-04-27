import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { IconButtonProps } from '../IconButton';

export interface SwitchBaseProps
  extends StandardProps<IconButtonProps, 'children' | 'onChange' | 'type' | 'value'> {
  autoFocus?: boolean;
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean;
  checkedIcon: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    checked?: string;
    disabled?: string;
    input?: string;
  };
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked?: boolean;
  disabled?: boolean;
  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple?: boolean;
  icon: React.ReactNode;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<any>;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  /**
   * If `true`, the `input` element is required.
   */
  required?: boolean;
  tabIndex?: number;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value?: unknown;
}

export type SwitchBaseClassKey = keyof NonNullable<SwitchBaseProps['classes']>;

declare const SwitchBase: React.ComponentType<SwitchBaseProps>;

export default SwitchBase;
