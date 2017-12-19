/* eslint-disable react/no-multi-comp, no-underscore-dangle */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import * as warning from 'warning';
import * as classNames from 'classnames';
import EventListener from 'react-event-listener';
import { Manager, Target, Popper, IPopperProps } from 'react-popper';
import debounce from 'lodash/debounce';
import { capitalizeFirstLetter } from '../utils/helpers';
import common from '../colors/common';
import grey from '../colors/grey';
import withStyles from '../styles/withStyles';
import { StyleRulesCallback, WithStyles } from '../styles';
import { StandardProps } from '../MuiProps';

// Use a class component so we can get a reference.
class TargetChildren extends React.Component {
  render() {
    return this.props.children;
  }
}

(TargetChildren as any).propTypes = {
  children: PropTypes.node.isRequired,
};

export type TooltipClassKey =
  | 'root'
  | 'popper'
  | 'popperClose'
  | 'tooltip'
  | 'tooltipLeft'
  | 'tooltipRight'
  | 'tooltipTop'
  | 'tooltipBottom'
  | 'tooltipOpen';

export const styles: StyleRulesCallback<TooltipClassKey> = theme => ({
  root: {
    display: 'inline',
    flexDirection: 'inherit', // Makes the wrapper more transparent.
  },
  popper: {
    zIndex: theme.zIndex.tooltip,
  },
  popperClose: {
    pointerEvents: 'none',
  },
  tooltip: {
    background: grey[700],
    borderRadius: 2,
    color: common.fullWhite,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(14),
    minHeight: theme.spacing.unit * 4,
    lineHeight: '32px',
    opacity: 0,
    padding: `0 ${theme.spacing.unit}px`,
    transform: 'scale(0)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    [theme.breakpoints.up('sm')]: {
      minHeight: 22,
      lineHeight: '22px',
      padding: `0 ${theme.spacing.unit}px`,
      fontSize: theme.typography.pxToRem(10),
    },
  },
  tooltipLeft: {
    transformOrigin: 'right center',
    margin: `0 ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.up('sm')]: {
      margin: '0 14px',
    },
  },
  tooltipRight: {
    transformOrigin: 'left center',
    margin: `0 ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.up('sm')]: {
      margin: '0 14px',
    },
  },
  tooltipTop: {
    transformOrigin: 'center bottom',
    margin: `${theme.spacing.unit * 3}px 0`,
    [theme.breakpoints.up('sm')]: {
      margin: '14px 0',
    },
  },
  tooltipBottom: {
    transformOrigin: 'center top',
    margin: `${theme.spacing.unit * 3}px 0`,
    [theme.breakpoints.up('sm')]: {
      margin: '14px 0',
    },
  },
  tooltipOpen: {
    opacity: 0.9,
    transform: 'scale(1)',
  },
});

export type Placement =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top';

function flipPlacement(placement: Placement) {
  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'top-start':
      return 'top-end';
    default:
      return placement;
  }
}

export interface TooltipProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, TooltipClassKey, 'title'> {
  children: React.ReactElement<any>;
  disableTriggerFocus?: boolean;
  disableTriggerHover?: boolean;
  disableTriggerTouch?: boolean;
  enterDelay?: number;
  id?: string;
  leaveDelay?: number;
  onClose?: (event: React.SyntheticEvent<any>, isOpen: boolean) => void;
  onOpen?: (event: React.SyntheticEvent<any>, isOpen: boolean) => void;
  open?: boolean;
  placement?: Placement;
  PopperProps?: IPopperProps;
  title: React.ReactNode;
}

interface State {
  open: boolean;
}

class Tooltip extends React.Component<TooltipProps & WithStyles<TooltipClassKey>, State> {
  static defaultProps: Partial<TooltipProps & WithStyles<TooltipClassKey>> = {
    disableTriggerFocus: false,
    disableTriggerHover: false,
    disableTriggerTouch: false,
    enterDelay: 0,
    leaveDelay: 0,
    placement: 'bottom',
  };
  state: State = {
    open: false,
  };

  componentWillMount() {
    const { props } = this;

    this.isControlled = props.open !== undefined;

    if (!this.isControlled) {
      // not controlled, use internal state
      this.setState({
        open: false,
      });
    }
  }

  componentDidMount() {
    warning(
      !this.children ||
        !(this.children as any).disabled ||
        this.children.tagName.toLowerCase() !== 'button',
      [
        'Material-UI: you are providing a disabled button children to the Tooltip component.',
        'A disabled element do not fire events.',
        'But the Tooltip needs to listen to the children element events to display the title.',
        '',
        'Place a `div` over top of the element.',
      ].join('\n'),
    );
  }

  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    this.handleResize.cancel();
  }

  enterTimer: NodeJS.Timer = null;
  leaveTimer: NodeJS.Timer = null;
  touchTimer: NodeJS.Timer = null;
  isControlled: boolean = null;
  popper: HTMLElement = null;
  children: HTMLElement = null;
  ignoreNonTouchEvents = false;

  handleResize = debounce(() => {
    if (this.popper) {
      (this.popper as any)._popper.scheduleUpdate();
    }
  }, 166);

  handleRequestOpen = (event: React.SyntheticEvent<any>) => {
    const { children } = this.props;
    if (typeof children !== 'string') {
      const childrenProps = React.Children.only(children).props;

      if (event.type === 'focus' && childrenProps.onFocus) {
        childrenProps.onFocus(event);
      }

      if (event.type === 'mouseover' && childrenProps.onMouseOver) {
        childrenProps.onMouseOver(event);
      }
    }

    if (this.ignoreNonTouchEvents && event.type !== 'touchstart') {
      return;
    }

    clearTimeout(this.leaveTimer);
    if (this.props.enterDelay > 0) {
      this.leaveTimer = setTimeout(() => {
        this.requestOpen(event);
      }, this.props.enterDelay);
    } else {
      this.requestOpen(event);
    }
  };

  requestOpen = (event: React.SyntheticEvent<any>) => {
    if (!this.isControlled) {
      this.setState({ open: true });
    }

    if (this.props.onOpen) {
      this.props.onOpen(event, true);
    }
  };

  handleClose = (event: React.SyntheticEvent<any>) => {
    const { children } = this.props;
    if (typeof children !== 'string') {
      const childrenProps = React.Children.only(children).props;

      if (event.type === 'blur' && childrenProps.onBlur) {
        childrenProps.onBlur(event);
      }

      if (event.type === 'mouseleave' && childrenProps.onMouseLeave) {
        childrenProps.onMouseLeave(event);
      }
    }

    clearTimeout(this.leaveTimer);
    if (this.props.leaveDelay) {
      this.leaveTimer = setTimeout(() => {
        this.requestClose(event);
      }, this.props.leaveDelay);
    } else {
      this.requestClose(event);
    }
  };

  requestClose = (event: React.SyntheticEvent<any>) => {
    this.ignoreNonTouchEvents = false;

    if (!this.isControlled) {
      this.setState({ open: false });
    }

    if (this.props.onClose) {
      this.props.onClose(event, false);
    }
  };

  handleTouchStart = (event: React.SyntheticEvent<any>) => {
    this.ignoreNonTouchEvents = true;
    const { children } = this.props;
    if (typeof children !== 'string') {
      const childrenProps = React.Children.only(children).props;

      if (childrenProps.onTouchStart) {
        childrenProps.onTouchStart(event);
      }
    }

    clearTimeout(this.touchTimer);
    event.persist();
    this.touchTimer = setTimeout(() => {
      this.handleRequestOpen(event);
    }, 1e3);
  };

  handleTouchEnd = (event: React.SyntheticEvent<any>) => {
    const { children } = this.props;
    if (typeof children !== 'string') {
      const childrenProps = React.Children.only(children).props;

      if (childrenProps.onTouchEnd) {
        childrenProps.onTouchEnd(event);
      }
    }

    clearTimeout(this.touchTimer);
    clearTimeout(this.leaveTimer);
    event.persist();
    this.leaveTimer = setTimeout(() => {
      this.requestClose(event);
    }, 1500 + this.props.leaveDelay);
  };

  render() {
    const {
      children: childrenProp,
      classes,
      className,
      disableTriggerFocus,
      disableTriggerHover,
      disableTriggerTouch,
      enterDelay,
      id,
      leaveDelay,
      onClose,
      onOpen,
      open: openProp,
      placement: rawPlacement,
      PopperProps: { PopperClassName = null, ...PopperOther } = {},
      theme,
      title,
      ...other
    } = this.props;

    const themeDirection = theme && theme.direction;
    const placement = themeDirection === 'rtl' ? flipPlacement(rawPlacement) : rawPlacement;
    const open = this.isControlled ? openProp : this.state.open;
    const childrenProps: React.HTMLAttributes<HTMLDivElement> = {};

    childrenProps['aria-describedby'] = id;

    if (!disableTriggerTouch) {
      childrenProps.onTouchStart = this.handleTouchStart;
      childrenProps.onTouchEnd = this.handleTouchEnd;
    }

    if (!disableTriggerHover) {
      childrenProps.onMouseOver = this.handleRequestOpen;
      childrenProps.onMouseLeave = this.handleClose;
    }

    if (!disableTriggerFocus) {
      childrenProps.onFocus = this.handleRequestOpen;
      childrenProps.onBlur = this.handleClose;
    }

    if (typeof childrenProp !== 'string' && childrenProp.props) {
      warning(
        !childrenProp.props.title,
        [
          'Material-UI: you have been providing a `title` property to the child of <Tooltip />.',
          `Remove this title property \`${childrenProp.props.title}\` or the Tooltip component.`,
        ].join('\n'),
      );
    }

    return (
      <EventListener target="window" onResize={this.handleResize}>
        <Manager className={classNames(classes.root, className)} {...other}>
          <Target>
            {({ targetProps }) => (
              <TargetChildren
                ref={node => {
                  this.children = ReactDOM.findDOMNode(node) as HTMLElement;
                  targetProps.ref(this.children);
                }}
              >
                {typeof childrenProp !== 'string'
                  ? React.cloneElement(childrenProp, childrenProps)
                  : childrenProp}
              </TargetChildren>
            )}
          </Target>
          <Popper
            placement={placement}
            eventsEnabled={open}
            className={classNames(
              classes.popper,
              { [classes.popperClose]: !open },
              PopperClassName,
            )}
            {...PopperOther}
            ref={(node: any) => {
              this.popper = node;
            }}
          >
            {({ popperProps, restProps }) => (
              <div
                {...popperProps}
                {...restProps}
                style={{
                  ...popperProps.style,
                  left: popperProps.style.left || 0,
                  ...restProps.style,
                }}
              >
                <div
                  id={id}
                  role="tooltip"
                  aria-hidden={!open}
                  className={classNames(
                    classes.tooltip,
                    { [classes.tooltipOpen]: open },
                    classes[`tooltip${capitalizeFirstLetter(placement.split('-')[0])}`],
                  )}
                >
                  {title}
                </div>
              </div>
            )}
          </Popper>
        </Manager>
      </EventListener>
    );
  }
}

(Tooltip as any).propTypes = {
  /**
   * Tooltip reference node.
   */
  children: PropTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Do not respond to focus events.
   */
  disableTriggerFocus: PropTypes.bool,
  /**
   * Do not respond to hover events.
   */
  disableTriggerHover: PropTypes.bool,
  /**
   * Do not respond to long press touch events.
   */
  disableTriggerTouch: PropTypes.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   */
  enterDelay: PropTypes.number,
  /**
   * The relationship between the tooltip and the wrapper component is not clear from the DOM.
   * By providing this property, we can use aria-describedby to solve the accessibility issue.
   */
  id: PropTypes.string,
  /**
   * The number of milliseconds to wait before hidding the tooltip.
   */
  leaveDelay: PropTypes.number,
  /**
   * Callback fired when the tooltip requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the tooltip requests to be open.
   *
   * @param {object} event The event source of the callback
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the tooltip is shown.
   */
  open: PropTypes.bool,
  /**
   * Tooltip placement
   */
  placement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /**
   * Properties applied to the `Popper` element.
   */
  PopperProps: PropTypes.object,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * Tooltip title.
   */
  title: PropTypes.node.isRequired,
};

export default withStyles<TooltipClassKey>(styles, { name: 'MuiTooltip', withTheme: true })(
  Tooltip,
);
