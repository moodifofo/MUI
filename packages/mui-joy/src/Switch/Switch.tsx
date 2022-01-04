import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSwitch } from '@mui/base/SwitchUnstyled';
import { styled } from '../styles';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';
import { SwitchProps } from './SwitchProps';

const useUtilityClasses = (ownerState: SwitchProps & { focusVisible: boolean }) => {
  const { classes, checked, disabled, focusVisible, readOnly } = ownerState;

  const slots = {
    root: [
      'root',
      checked && 'checked',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      readOnly && 'readOnly',
    ],
    thumb: ['thumb', checked && 'checked'],
    track: ['track', checked && 'checked'],
    input: ['input'],
  };

  return composeClasses(slots, getSwitchUtilityClass, classes);
};

const SwitchRoot = styled('span', {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SwitchProps }>(({ theme, ownerState }) => {
  return {
    [theme.getThemeVar('Switch-track-radius')]: theme.vars.radius.lg,
    [theme.getThemeVar('Switch-track-width')]: '48px',
    [theme.getThemeVar('Switch-track-height')]: '24px',
    [theme.getThemeVar('Switch-thumb-size')]: '16px',
    ...(ownerState.size === 'sm' && {
      [theme.getThemeVar('Switch-track-width')]: '40px',
      [theme.getThemeVar('Switch-track-height')]: '20px',
      [theme.getThemeVar('Switch-thumb-size')]: '12px',
    }),
    ...(ownerState.size === 'lg' && {
      [theme.getThemeVar('Switch-track-width')]: '64px',
      [theme.getThemeVar('Switch-track-height')]: '32px',
      [theme.getThemeVar('Switch-thumb-size')]: '24px',
    }),
    [theme.getThemeVar('Switch-thumb-radius')]: `calc(${theme.getThemeVar(
      'Switch-track-radius',
    )} - 2px)`,
    [theme.getThemeVar('Switch-thumb-width')]: theme.getThemeVar('Switch-thumb-size'),
    [theme.getThemeVar('Switch-thumb-offset')]: `max((${theme.getThemeVar(
      'Switch-track-height',
    )} - ${theme.getThemeVar('Switch-thumb-size')}) / 2, 0px)`,
    display: 'inline-block',
    width: `${theme.getThemeVar('Switch-track-width')}`, // should have the same width as track because flex parent can stretch SwitchRoot.
    borderRadius: `${theme.getThemeVar('Switch-track-radius')}`,
    position: 'relative',
    padding: `calc((${theme.getThemeVar('Switch-thumb-size')} / 2) - (${theme.getThemeVar(
      'Switch-track-height',
    )} / 2)) calc(-1 * ${theme.getThemeVar('Switch-thumb-offset')})`,
    color: theme.vars.palette.neutral.containedBg,
    '&:hover': {
      color: theme.vars.palette.neutral.containedBg,
    },
    [`&.${switchClasses.checked}`]: {
      color: theme.vars.palette[ownerState.color!].containedBg,
      '&:hover': {
        color: theme.vars.palette[ownerState.color!].containedHoverBg,
      },
    },
    [`&.${switchClasses.disabled}`]: {
      pointerEvents: 'none',
      cursor: 'default',
      opacity: 0.6,
    },
    [`&.${switchClasses.focusVisible}`]: theme.focus.default,
  };
});

const SwitchInput = styled('input', {
  name: 'MuiSwitch',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: SwitchProps }>(() => ({
  margin: 0,
  height: '100%',
  width: '100%',
  opacity: 0,
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  cursor: 'pointer',
}));

const SwitchTrack = styled('span', {
  name: 'MuiSwitch',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})<{ ownerState: SwitchProps & { focusVisible: boolean } }>(({ theme }) => ({
  position: 'relative',
  color: 'inherit',
  height: theme.getThemeVar('Switch-track-height'),
  width: theme.getThemeVar('Switch-track-width'),
  display: 'block',
  backgroundColor: 'currentColor',
  borderRadius: theme.getThemeVar('Switch-track-radius'),
}));

const SwitchThumb = styled('span', {
  name: 'MuiSwitch',
  slot: 'Thumb',
  overridesResolver: (props, styles) => styles.thumb,
})<{ ownerState: SwitchProps }>(({ theme }) => ({
  transition: 'left 0.2s',
  position: 'absolute',
  top: '50%',
  left: `calc(50% - ${theme.getThemeVar('Switch-track-width')} / 2 + ${theme.getThemeVar(
    'Switch-thumb-width',
  )} / 2 + ${theme.getThemeVar('Switch-thumb-offset')})`,
  transform: 'translate(-50%, -50%)',
  width: theme.getThemeVar('Switch-thumb-width'),
  height: theme.getThemeVar('Switch-thumb-size'),
  borderRadius: theme.getThemeVar('Switch-thumb-radius'),
  backgroundColor: '#fff',
  [`&.${switchClasses.checked}`]: {
    left: `calc(50% + ${theme.getThemeVar('Switch-track-width')} / 2 - ${theme.getThemeVar(
      'Switch-thumb-width',
    )} / 2 - ${theme.getThemeVar('Switch-thumb-offset')})`,
  },
}));

const Switch = React.forwardRef<HTMLSpanElement, SwitchProps>(function Switch(inProps, ref) {
  const props = inProps;
  const {
    checked: checkedProp,
    className,
    component,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp,
    required,
    color = 'primary',
    size,
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

  const ownerState = {
    ...props,
    checked,
    disabled,
    focusVisible,
    readOnly,
    color,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <SwitchRoot
      ref={ref}
      {...otherProps}
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
    >
      <SwitchTrack ownerState={ownerState} className={clsx(classes.track)} />
      <SwitchThumb ownerState={ownerState} className={clsx(classes.thumb)} />
      <SwitchInput ownerState={ownerState} {...getInputProps()} className={clsx(classes.input)} />
    </SwitchRoot>
  );
});

Switch.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes.oneOf(['danger', 'info', 'primary', 'success', 'warning']),
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
} as any;

export default Switch;
