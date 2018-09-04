/* eslint-disable react/jsx-handler-names */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SwitchBase from '../internal/SwitchBase';
import CheckBoxOutlineBlankIcon from '../internal/svg-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '../internal/svg-icons/CheckBox';
import IndeterminateCheckBoxIcon from '../internal/svg-icons/IndeterminateCheckBox';
import { capitalize } from '../utils/helpers';
import { forwardRef } from '../utils/reactHelpers';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    color: theme.palette.text.secondary,
  },
  /* Styles applied to the root element if `checked={true}`. */
  checked: {},
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    '&$checked': {
      color: theme.palette.primary.main,
    },
    '&$disabled': {
      color: theme.palette.action.disabled,
    },
  },
  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    '&$checked': {
      color: theme.palette.secondary.main,
    },
    '&$disabled': {
      color: theme.palette.action.disabled,
    },
  },
});

class Checkbox extends React.Component {
  componentDidMount() {
    this.updateIndeterminateStatus();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.indeterminate !== this.props.indeterminate) {
      this.updateIndeterminateStatus();
    }
  }

  handleClick = (event, ...clickArgs) => {
    const { checked: wasChecked, indeterminate: wasIndeterminate, onChange, onClick } = this.props;
    const { checked: isChecked, indeterminate: isIndeterminate } = event.target;
    const gotDetermined = wasIndeterminate && !isIndeterminate;
    const checkChanged = wasChecked !== isChecked;

    // some browser (e.g. Edge) do not change checked after setting indeterminate to false
    if (gotDetermined && !checkChanged) {
      this.inputRef.checked = !isChecked;
      event.target.checked = !isChecked;

      if (onChange) {
        // re-dispatch as change event
        const changeEvent = new window.Event('change', event);
        this.inputRef.dispatchEvent(changeEvent);
        // dispatching the event does not trigger react onChange
        // but calling onChange with the plain event will not include target unless we dispatch it
        onChange(changeEvent, event.target.checked);
      }
    }

    if (onClick) {
      onClick(event, ...clickArgs);
    }
  };

  handleInputRef = ref => {
    this.inputRef = ref;

    forwardRef(ref, this.props.inputRef);
  };

  updateIndeterminateStatus() {
    if (this.inputRef) {
      this.inputRef.indeterminate = this.props.indeterminate;
    }
  }

  render() {
    const {
      checkedIcon,
      classes,
      color,
      icon,
      indeterminate,
      indeterminateIcon,
      ...other
    } = this.props;

    return (
      <SwitchBase
        type="checkbox"
        checkedIcon={indeterminate ? indeterminateIcon : checkedIcon}
        classes={{
          root: classNames(classes.root, classes[`color${capitalize(color)}`]),
          checked: classes.checked,
          disabled: classes.disabled,
        }}
        icon={indeterminate ? indeterminateIcon : icon}
        {...other}
        inputRef={this.handleInputRef}
        onClick={this.handleClick}
      />
    );
  }
}

Checkbox.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'default']),
  /**
   * If `true`, the switch will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * If `true`, the component appears indeterminate.
   */
  indeterminate: PropTypes.bool,
  /**
   * The icon to display when the component is indeterminate.
   */
  indeterminateIcon: PropTypes.node,
  /**
   * Properties applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.checked`.
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: PropTypes.func,
  /**
   * The input component property `type`.
   */
  type: PropTypes.string,
  /**
   * The value of the component.
   */
  value: PropTypes.string,
};

Checkbox.defaultProps = {
  checkedIcon: <CheckBoxIcon />,
  color: 'secondary',
  icon: <CheckBoxOutlineBlankIcon />,
  indeterminate: false,
  indeterminateIcon: <IndeterminateCheckBoxIcon />,
};

export default withStyles(styles, { name: 'MuiCheckbox' })(Checkbox);
