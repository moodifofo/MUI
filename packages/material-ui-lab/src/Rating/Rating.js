import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { capitalize, useForkRef, ownerWindow } from '@material-ui/core/utils';
import Star from '../internal/svg-icons/Star';

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    fontSize: theme.typography.pxToRem(24),
    color: '#ffb400',
    cursor: 'pointer',
    '&$disabled': {
      opacity: 0.4,
      pointerEvents: 'none',
    },
  },
  /* Styles applied to the root element if `size="small"`. */
  sizeSmall: {
    fontSize: theme.typography.pxToRem(18),
  },
  /* Styles applied to the root element if `size="large"`. */
  sizeLarge: {
    fontSize: theme.typography.pxToRem(30),
  },
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Pseudo-class applied to the root element if `readOnly={true}`. */
  readOnly: {
    pointerEvents: 'none',
  },
  visuallyhidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  /* Pseudo-class applied to the icon wrapping elements. */
  icon: {
    display: 'flex',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  /* Pseudo-class applied to the icon wrapping elements when empty. */
  iconEmpty: {
    color: theme.palette.action.disabled,
  },
  /* Pseudo-class applied to the icon wrapping elements when filled. */
  iconFilled: {},
  /* Pseudo-class applied to the icon wrapping elements when hover. */
  iconHover: {},
  /* Pseudo-class applied to the icon wrapping elements when active. */
  iconActive: {
    transform: 'scale(1.2)',
  },
  /* Pseudo-class applied to the icon wrapping elements when decimals are necessary. */
  decimal: {
    position: 'relative',
  },
});

function IconContainer(props) {
  const { value, ...other } = props;
  return <div {...other} />;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const defaultIcon = <Star fontSize="inherit" />;

function defaultLabelText(value) {
  return `${value} star${value !== 1 ? 's' : ''}`;
}

const Rating = React.forwardRef(function Rating(props, ref) {
  const {
    classes,
    className,
    component: Component = 'div',
    disabled = false,
    emptyIcon,
    getLabelText = defaultLabelText,
    icon = defaultIcon,
    IconContainerComponent = IconContainer,
    max = 5,
    name,
    onChange,
    onChangeHover,
    onMouseLeave,
    onMouseMove,
    precision = 1,
    readOnly = false,
    size = 'medium',
    value: valueProp,
    ...other
  } = props;

  const theme = useTheme();
  const [hover, setHover] = React.useState(-1);
  const value = hover !== -1 ? hover : valueProp;

  const rootRef = React.useRef();
  const handleRef = useForkRef(rootRef, ref);

  const handleMouseMove = event => {
    if (onMouseMove) {
      onMouseMove(event);
    }

    const rootNode = rootRef.current;
    const { right, left } = rootNode.getBoundingClientRect();
    const { width } = rootNode.firstChild.getBoundingClientRect();
    let percent;

    if (theme.direction === 'rtl') {
      percent = (right - event.pageX - ownerWindow(rootNode).pageXOffset) / (width * max);
    } else {
      percent = (event.pageX - left - ownerWindow(rootNode).pageXOffset) / (width * max);
    }

    let newHover = Math.ceil((max * percent) / precision) * precision;
    newHover = clamp(newHover, precision, max);

    setHover(newHover);
    if (onChangeHover && hover !== newHover) {
      onChangeHover(event, newHover);
    }
  };

  const handleMouseLeave = event => {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    const newHover = -1;

    setHover(newHover);
    if (onChangeHover && hover !== newHover) {
      onChangeHover(event, newHover);
    }
  };

  const handleChange = event => {
    console.log('handleChange', parseFloat(event.target.value));
    if (onChange) {
      onChange(event, parseFloat(event.target.value));
    }
  };

  const handleFocus = event => {
    const newHover = parseFloat(event.target.value);

    setHover(newHover);
    if (onChangeHover && hover !== newHover) {
      onChangeHover(event, newHover);
    }
  };

  const handleBlur = event => {
    const newHover = -1;

    setHover(newHover);
    if (onChangeHover && hover !== newHover) {
      onChangeHover(event, newHover);
    }
  };

  const item = (propsItem, state) => {
    const id = `${name}-${String(propsItem.value).replace('.', '-')}`;
    const container = (
      <IconContainerComponent
        {...propsItem}
        className={clsx(
          classes.icon,
          {
            [classes.iconEmpty]: !state.filled,
            [classes.iconFilled]: state.filled,
            [classes.iconHover]: state.hover,
            [classes.iconActive]: state.active,
          },
          propsItem.className,
        )}
      >
        {emptyIcon && !state.filled ? emptyIcon : icon}
      </IconContainerComponent>
    );

    if (readOnly || disabled) {
      return (
        <React.Fragment key={propsItem.value}>
          <span className={classes.visuallyhidden}>{getLabelText(propsItem.value)}</span>
          {container}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key={propsItem.value}>
        <label htmlFor={id}>
          <span className={classes.visuallyhidden}>{getLabelText(propsItem.value)}</span>
          {container}
        </label>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={propsItem.value}
          id={id}
          type="radio"
          name={name}
          checked={state.checked}
          className={classes.visuallyhidden}
        />
      </React.Fragment>
    );
  };

  return (
    <Component
      ref={handleRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        classes.root,
        {
          [classes[`size${capitalize(size)}`]]: size !== 'medium',
          [classes.disabled]: disabled,
          [classes.readOnly]: readOnly,
        },
        className,
      )}
      {...other}
    >
      {!readOnly && !disabled && value == null && (
        <input
          value="0"
          id={`${name}-0`}
          type="radio"
          name={name}
          defaultChecked
          className={classes.visuallyhidden}
        />
      )}
      {Array.from(new Array(max)).map((_, index) => {
        const itemValue = index + 1;
        const items = Array.from(new Array(1 / precision));

        if (precision < 1) {
          return (
            <div
              key={itemValue}
              className={clsx(classes.decimal, {
                [classes.iconActive]: itemValue === Math.ceil(hover),
              })}
            >
              {items.map(($, indexDecimal) => {
                let width = `${(itemValue - value) * 100}%`;

                if (itemValue - value <= 0) {
                  width = '100%';
                }

                if (itemValue - value >= 1) {
                  width = '0%';
                }

                return item(
                  {
                    value: itemValue - 1 + (indexDecimal + 1) * precision,
                    style:
                      items.length - 1 === indexDecimal
                        ? {}
                        : {
                            width,
                            overflow: 'hidden',
                            zIndex: 1,
                            position: 'absolute',
                          },
                  },
                  {
                    filled: itemValue <= Math.ceil(value) && indexDecimal === 0,
                    hover: itemValue <= Math.ceil(hover) && indexDecimal === 0,
                    checked: itemValue - 1 + (indexDecimal + 1) * precision === valueProp,
                  },
                );
              })}
            </div>
          );
        }

        return item(
          {
            value: itemValue,
          },
          {
            filled: itemValue <= value,
            hover: itemValue <= hover,
            checked: itemValue === Math.round(valueProp),
            active: itemValue === hover,
          },
        );
      })}
    </Component>
  );
});

Rating.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the rating will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The icon to display when empty.
   */
  emptyIcon: PropTypes.node,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.
   *
   * @param {number} value The rating label's value to format
   */
  getLabelText: PropTypes.func,
  /**
   * The icon to display.
   */
  icon: PropTypes.node,
  /**
   * The component containing the icon.
   */
  IconContainerComponent: PropTypes.elementType,
  /**
   * Maximum rating.
   */
  max: PropTypes.number,
  /**
   * Name attribute of the radio `input` elements.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {number} value The new value
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the hover state changes.
   *
   * @param {object} event The event source of the callback
   * @param {any} value The new value
   */
  onChangeHover: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * @ignore
   */
  onMouseMove: PropTypes.func,
  /**
   * The minimum increment value change allowed.
   */
  precision: PropTypes.number,
  /**
   * Removes all hover effects and pointer events.
   */
  readOnly: PropTypes.bool,
  /**
   * The size of the rating.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * The rating value.
   */
  value: PropTypes.number,
};

export default withStyles(styles, { name: 'MuiRating' })(Rating);
