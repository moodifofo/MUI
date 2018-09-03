import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Tooltip, { TooltipPlacement } from '@material-ui/core/Tooltip';

export const styles = theme => ({
  /* Styles applied to the root (`Tooltip`) component. */
  root: {
    position: 'relative',
  },
  /* Styles applied to the `Button` component. */
  button: {
    margin: 8,
    color: theme.palette.text.secondary,
    backgroundColor: emphasize(theme.palette.background.default, 0.12),
    '&:hover': {
      backgroundColor: emphasize(theme.palette.background.default, 0.15),
    },
    transition: `${theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
    })}, opacity 0.8s`,
    opacity: 1,
  },
  /* Styles applied to the `Button` component if `open={false}`. */
  buttonClosed: {
    opacity: 0,
    transform: 'scale(0)',
  },
});

class SpeedDialAction extends React.Component {
  state = {
    tooltipOpen: false,
  };

  static getDerivedStateFromProps = (props, state) => {
    if (!props.open && state.tooltipOpen) {
      return { tooltipOpen: false };
    }
    return null;
  };

  handleTooltipClose = () => {
    if (this.props.tooltipOpen) return;
    this.setState({ tooltipOpen: false });
  };

  handleTooltipOpen = () => {
    if (this.props.tooltipOpen) return;
    this.setState({ tooltipOpen: true });
  };

  componentDidUpdate = prevProps => {
    if (!this.props.tooltipOpen || prevProps.open === this.props.open) return;
    if (!this.state.tooltipOpen) {
      this.timeout = setTimeout(() => this.setState({ tooltipOpen: true }), this.props.delay + 100);
    }
  };

  componentWillUnmount = () => clearTimeout(this.timeout);

  render() {
    const {
      ButtonProps,
      classes,
      className: classNameProp,
      delay,
      icon,
      id,
      onClick,
      open,
      tooltipTitle,
      tooltipPlacement,
      tooltipOpen,
      ...other
    } = this.props;

    return (
      <Tooltip
        id={id}
        className={classNames(classes.root, classNameProp)}
        title={tooltipTitle}
        placement={tooltipPlacement}
        onClose={this.handleTooltipClose}
        onOpen={this.handleTooltipOpen}
        open={open && this.state.tooltipOpen}
        {...other}
      >
        <Button
          variant="fab"
          mini
          className={classNames(classes.button, !open && classes.buttonClosed)}
          style={{ transitionDelay: `${delay}ms` }}
          onClick={onClick}
          tabIndex={-1}
          role="menuitem"
          aria-labelledby={id}
          {...ButtonProps}
        >
          {icon}
        </Button>
      </Tooltip>
    );
  }
}

SpeedDialAction.propTypes = {
  /**
   * Properties applied to the [`Button`](/api/button) component.
   */
  ButtonProps: PropTypes.object,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   */
  delay: PropTypes.number,
  /**
   * The Icon to display in the SpeedDial Floating Action Button.
   */
  icon: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  open: PropTypes.bool,
  /**
   * Make the tooltip always visible when the SpeedDial is open.
   */
  tooltipOpen: PropTypes.bool,
  /**
   * Placement of the tooltip.
   */
  tooltipPlacement: TooltipPlacement,
  /**
   * Label to display in the tooltip.
   */
  tooltipTitle: PropTypes.node,
};

SpeedDialAction.defaultProps = {
  delay: 0,
  open: false,
  tooltipPlacement: 'left',
};

export default withStyles(styles, { name: 'MuiSpeedDialAction' })(SpeedDialAction);
