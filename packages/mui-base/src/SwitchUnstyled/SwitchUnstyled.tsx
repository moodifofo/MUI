import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useSwitch from './useSwitch';
import classes from './switchUnstyledClasses';
import appendOwnerState from '../utils/appendOwnerState';
import {
  SwitchUnstyledProps,
  SwitchUnstyledOwnerState,
  SwitchUnstyledInputSlotProps,
  SwitchUnstyledRootSlotProps,
  SwitchUnstyledThumbSlotProps,
  SwitchUnstyledTrackSlotProps,
} from './SwitchUnstyled.types';
import { WithOptionalOwnerState } from '../utils';

/**
 * The foundation for building custom-styled switches.
 *
 * Demos:
 *
 * - [Switch](https://mui.com/base/react-switch/)
 *
 * API:
 *
 * - [SwitchUnstyled API](https://mui.com/base/api/switch-unstyled/)
 */
const SwitchUnstyled = React.forwardRef(function SwitchUnstyled(
  props: SwitchUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  const {
    checked: checkedProp,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp,
    required,
    ...otherProps
  } = props;

  const useSwitchProps = {
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp,
  };

  const { getInputProps, checked, disabled, focusVisible, readOnly } = useSwitch(useSwitchProps);

  const ownerState: SwitchUnstyledOwnerState = {
    ...props,
    checked,
    disabled,
    focusVisible,
    readOnly,
  };

  const stateClasses = {
    [classes.checked]: checked,
    [classes.disabled]: disabled,
    [classes.focusVisible]: focusVisible,
    [classes.readOnly]: readOnly,
  };

  const Root: React.ElementType = component ?? components.Root ?? 'span';
  const rootProps: WithOptionalOwnerState<SwitchUnstyledRootSlotProps> = appendOwnerState(
    Root,
    {
      ...otherProps,
      ...componentsProps.root,
      className: clsx(classes.root, stateClasses, className, componentsProps.root?.className),
    },
    ownerState,
  );

  const Thumb: React.ElementType = components.Thumb ?? 'span';
  const thumbProps: WithOptionalOwnerState<SwitchUnstyledThumbSlotProps> = appendOwnerState(
    Thumb,
    { ...componentsProps.thumb, className: clsx(classes.thumb, componentsProps.thumb?.className) },
    ownerState,
  );

  const Input: React.ElementType = components.Input ?? 'input';
  const inputProps: WithOptionalOwnerState<SwitchUnstyledInputSlotProps> = appendOwnerState(
    Input,
    {
      ...getInputProps(),
      ...componentsProps.input,
      className: clsx(classes.input, componentsProps.input?.className),
    },
    ownerState,
  );

  const Track: React.ElementType =
    components.Track === null ? () => null : components.Track ?? 'span';
  const trackProps: WithOptionalOwnerState<SwitchUnstyledTrackSlotProps> = appendOwnerState(
    Track,
    { ...componentsProps.track, className: clsx(classes.track, componentsProps.track?.className) },
    ownerState,
  );

  return (
    <Root ref={ref} {...rootProps}>
      <Track {...trackProps} />
      <Thumb {...thumbProps} />
      <Input {...inputProps} />
    </Root>
  );
});

SwitchUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the Switch.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
    Thumb: PropTypes.elementType,
    Track: PropTypes.oneOfType([PropTypes.elementType, PropTypes.oneOf([null])]),
  }),
  /**
   * The props used for each slot inside the Switch.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    input: PropTypes.object,
    root: PropTypes.object,
    thumb: PropTypes.object,
    track: PropTypes.object,
  }),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onFocusVisible: PropTypes.func,
  /**
   * If `true`, the component is read only.
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,
} as any;

export default SwitchUnstyled;
