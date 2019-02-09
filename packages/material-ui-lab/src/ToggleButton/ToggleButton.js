// @inheritedComponent ButtonBase

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '@material-ui/core/styles/withStyles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ButtonBase from '@material-ui/core/ButtonBase';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    boxSizing: 'border-box',
    ...theme.typography.button,
    height: 48,
    minWidth: 48,
    padding: '0px 11px 0px 11px',
    border: `1px solid ${fade(theme.palette.action.active, 0.12)}`,
    color: fade(theme.palette.action.active, 0.38),
    '&:not(:first-child)': {
      marginLeft: -1,
      borderLeft: '1px solid transparent',
    },
    '&$selected': {
      color: theme.palette.action.active,
      backgroundColor: fade(theme.palette.action.active, 0.12),
      '&:hover': {
        backgroundColor: fade(theme.palette.action.active, 0.15),
      },
      '& + &': {
        borderLeft: 0,
        marginLeft: 0,
      },
    },
    '&$disabled': {
      color: fade(theme.palette.action.disabled, 0.12),
    },
    '&:hover': {
      textDecoration: 'none',
      // Reset on mouse devices
      backgroundColor: fade(theme.palette.text.primary, 0.05),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      '&$disabled': {
        backgroundColor: 'transparent',
      },
    },
    '&:first-child': {
      borderTopLeftRadius: 2,
      borderBottomLeftRadius: 2,
    },
    '&:last-child': {
      borderTopRightRadius: 2,
      borderBottomRightRadius: 2,
      paddingLeft: 12,
      // paddingRight: 11,
    },
  },
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if `selected={true}`. */
  selected: {},
  /* Styles applied to the `label` wrapper element. */
  label: {
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
});

class ToggleButton extends React.Component {
  handleChange = event => {
    const { onChange, onClick, value } = this.props;

    if (onClick) {
      onClick(event, value);
      if (event.isDefaultPrevented()) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  render() {
    const {
      children,
      className: classNameProp,
      classes,
      disableFocusRipple,
      disabled,
      selected,
      ...other
    } = this.props;

    const className = clsx(
      classes.root,
      {
        [classes.disabled]: disabled,
        [classes.selected]: selected,
      },
      classNameProp,
    );

    return (
      <ButtonBase
        className={className}
        disabled={disabled}
        focusRipple={!disableFocusRipple}
        onClick={this.handleChange}
        {...other}
      >
        <span className={classes.label}>{children}</span>
      </ButtonBase>
    );
  }
}

ToggleButton.propTypes = {
  /**
   * The content of the button.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   * `disableRipple` must also be true.
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * If `true`, the button will be rendered in an active state.
   */
  selected: PropTypes.bool,
  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: PropTypes.any.isRequired,
};

ToggleButton.defaultProps = {
  disabled: false,
  disableFocusRipple: false,
  disableRipple: false,
};

ToggleButton.muiName = 'ToggleButton';

export default withStyles(styles, { name: 'MuiToggleButton' })(ToggleButton);
