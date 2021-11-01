import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/core';
import { useFormControl } from '../FormControl';
import Typography from '../Typography';
import capitalize from '../utils/capitalize';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import {
  getFormControlLabelUtilityClasses,
  getFormControlLabelClasses,
} from './formControlLabelClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, disabled, labelPlacement } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', `labelPlacement${capitalize(labelPlacement)}`],
    label: ['label', disabled && 'disabled'],
  };

  return composeClasses(slots, getFormControlLabelUtilityClasses, classes);
};

export const FormControlLabelRoot = styled('label', {
  name: 'MuiFormControlLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${getFormControlLabelClasses().label}`]: styles.label },
      styles.root,
      styles[`labelPlacement${capitalize(ownerState.labelPlacement)}`],
    ];
  },
})(({ theme, ownerState }) => {
  const formControlLabelClasses = getFormControlLabelClasses();
  return {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    // For correct alignment with the text.
    verticalAlign: 'middle',
    WebkitTapHighlightColor: 'transparent',
    marginLeft: -11,
    marginRight: 16,
    [`&.${formControlLabelClasses.disabled}`]: {
      cursor: 'default',
    },
    ...(ownerState.labelPlacement === 'start' && {
      flexDirection: 'row-reverse',
      marginLeft: 16,
      marginRight: -11,
    }),
    ...(ownerState.labelPlacement === 'top' && {
      flexDirection: 'column-reverse',
      marginLeft: 16,
    }),
    ...(ownerState.labelPlacement === 'bottom' && {
      flexDirection: 'column',
      marginLeft: 16,
    }),
    [`& .${formControlLabelClasses.label}`]: {
      [`&.${formControlLabelClasses.disabled}`]: {
        color: theme.palette.text.disabled,
      },
    },
  };
});

/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */
const FormControlLabel = React.forwardRef(function FormControlLabel(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiFormControlLabel' });
  const {
    checked,
    className,
    componentsProps = {},
    control,
    disabled: disabledProp,
    disableTypography,
    inputRef,
    label,
    labelPlacement = 'end',
    name,
    onChange,
    value,
    ...other
  } = props;

  const muiFormControl = useFormControl();

  let disabled = disabledProp;
  if (typeof disabled === 'undefined' && typeof control.props.disabled !== 'undefined') {
    disabled = control.props.disabled;
  }
  if (typeof disabled === 'undefined' && muiFormControl) {
    disabled = muiFormControl.disabled;
  }

  const controlProps = {
    disabled,
  };

  ['checked', 'name', 'onChange', 'value', 'inputRef'].forEach((key) => {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key];
    }
  });

  const ownerState = {
    ...props,
    disabled,
    label,
    labelPlacement,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <FormControlLabelRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    >
      {React.cloneElement(control, controlProps)}
      {label.type === Typography || disableTypography ? (
        label
      ) : (
        <Typography component="span" className={classes.label} {...componentsProps.typography}>
          {label}
        </Typography>
      )}
    </FormControlLabelRoot>
  );
});

FormControlLabel.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component appears selected.
   */
  checked: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: PropTypes.element.isRequired,
  /**
   * If `true`, the control is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is rendered as it is passed without an additional typography node.
   */
  disableTypography: PropTypes.bool,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * A text or an element to be used in an enclosing label element.
   */
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.number, PropTypes.string]).isRequired,
  /**
   * The position of the label.
   * @default 'end'
   */
  labelPlacement: PropTypes.oneOf(['bottom', 'end', 'start', 'top']),
  /**
   * @ignore
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};

export default FormControlLabel;
