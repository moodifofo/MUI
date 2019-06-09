/* eslint-disable no-use-before-define */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTheme, withStyles, fade, lighten } from '@material-ui/core/styles';
import { useForkRef, ownerWindow } from '@material-ui/core/utils';
import { chainPropTypes } from '@material-ui/utils';
import ValueLabel from './ValueLabel';

function asc(a, b) {
  return a - b;
}

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function findClosest(values, currentValue) {
  const { index: closestIndex } = values.reduce((acc, value, index) => {
    const distance = Math.abs(currentValue - value);

    if (acc === null || distance < acc.distance || distance === acc.distance) {
      return {
        distance,
        index,
      };
    }

    return acc;
  }, null);
  return closestIndex;
}

function trackFinger(event, touchId) {
  if (touchId.current !== undefined && event.changedTouches) {
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      const touch = event.changedTouches[i];
      if (touch.identifier === touchId.current) {
        return {
          x: event.changedTouches[i].pageX,
          y: event.changedTouches[i].pageY,
        };
      }
    }

    return false;
  }

  return {
    x: event.pageX,
    y: event.pageY,
  };
}

function valueToPercent(value, min, max) {
  return ((value - min) * 100) / (max - min);
}

function percentToValue(percent, min, max) {
  return (max - min) * percent + min;
}

function roundValueToStep(value, step) {
  return Math.round(value / step) * step;
}

function setValueIndex({ values, source, newValue, index }) {
  // Performance shortcut
  if (values[index] === newValue) {
    return source;
  }

  const output = [...values];
  output[index] = newValue;
  return output;
}

function focusThumb({ sliderRef, activeIndex, setActive }) {
  if (
    !sliderRef.current.contains(document.activeElement) ||
    Number(document.activeElement.getAttribute('data-index')) !== activeIndex
  ) {
    sliderRef.current.querySelector(`[data-index="${activeIndex}"]`).focus();
  }

  if (setActive) {
    setActive(activeIndex);
  }
}

const axisProps = {
  horizontal: {
    offset: value => ({ left: `${value}%` }),
    leap: value => ({ width: `${value}%` }),
  },
  'horizontal-reverse': {
    offset: value => ({ right: `${value}%` }),
    leap: value => ({ width: `${value}%` }),
  },
  vertical: {
    offset: value => ({ bottom: `${value}%` }),
    leap: value => ({ height: `${value}%` }),
  },
  'vertical-reverse': {
    offset: value => ({ top: `${value}%` }),
    leap: value => ({ height: `${value}%` }),
  },
};

const defaultMarks = [];
const Identity = x => x;

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 *
 * @param {function} fn
 */
function useEventCallback(fn) {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  return React.useCallback(event => (0, ref.current)(event), []);
}

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    height: 2,
    width: '100%',
    boxSizing: 'content-box',
    padding: '11px 0',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    touchAction: 'none',
    color: theme.palette.primary.main,
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    '&$disabled': {
      cursor: 'default',
      color: theme.palette.grey[400],
    },
    '&$vertical': {
      width: 2,
      height: '100%',
      padding: '0 11px',
    },
  },
  /* Styles applied to the root element if `marks` is provided with at least one label. */
  marked: {
    marginBottom: 20,
    '&$vertical': {
      marginBottom: 'auto',
      marginRight: 20,
    },
  },
  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {},
  /* Styles applied to the root element if the theme is RTL. */
  rtl: {},
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the rail element. */
  rail: {
    position: 'absolute',
    width: '100%',
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
    opacity: 0.24,
    '$vertical &': {
      height: '100%',
      width: 2,
    },
  },
  /* Styles applied to the track element. */
  track: {
    position: 'absolute',
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
    '$vertical &': {
      width: 2,
    },
  },
  /* Styles applied to the thumb element. */
  thumb: {
    position: 'absolute',
    width: 12,
    height: 12,
    marginLeft: -6,
    marginTop: -5,
    boxSizing: 'border-box',
    borderRadius: '50%',
    outline: 'none',
    backgroundColor: 'currentColor',
    transition: theme.transitions.create(['box-shadow'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&:focus,&:hover': {
      boxShadow: `0px 0px 0px 8px ${fade(theme.palette.primary.main, 0.16)}`,
    },
    '&$active': {
      boxShadow: `0px 0px 0px 14px ${fade(theme.palette.primary.main, 0.16)}`,
    },
    '$disabled &': {
      pointerEvents: 'none',
      width: 8,
      height: 8,
      marginLeft: -4,
      marginTop: -3,
      '&:focus,&:hover': {
        boxShadow: 'none',
      },
    },
    '$vertical &': {
      marginLeft: -5,
      marginBottom: -6,
    },
    '$vertical$disabled &': {
      marginLeft: -3,
      marginBottom: -4,
    },
  },
  /* Styles applied to the thumb element if it's active. */
  active: {},
  /* Styles applied to the thumb label element. */
  valueLabel: {},
  /* Styles applied to the mark element. */
  mark: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
  },
  /* Styles applied to the mark element if active (depending on the value). */
  markActive: {
    backgroundColor: lighten(theme.palette.primary.main, 0.76),
  },
  /* Styles applied to the mark label element. */
  markLabel: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    position: 'absolute',
    top: 22,
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
    '$vertical &': {
      top: 'auto',
      left: 22,
      transform: 'translateY(50%)',
    },
    '$vertical$rtl &': {
      transform: 'translateY(-50%)',
    },
  },
  /* Styles applied to the mark label element if active (depending on the value). */
  markLabelActive: {
    color: theme.palette.text.primary,
  },
});

const Slider = React.forwardRef(function Slider(props, ref) {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-valuetext': ariaValuetext,
    classes,
    className,
    component: Component = 'span',
    defaultValue,
    disabled = false,
    getAriaValueText,
    marks: marksProp = defaultMarks,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    onMouseDown,
    orientation = 'horizontal',
    step = 1,
    value: valueProp,
    ValueLabelComponent = ValueLabel,
    valueLabelDisplay = 'active',
    valueLabelFormat = Identity,
    ...other
  } = props;
  const theme = useTheme();
  const { current: isControlled } = React.useRef(valueProp != null);
  const touchId = React.useRef();
  // We can't use the :active browser pseudo-classes.
  // - The active state isn't triggered when clicking on the rail.
  // - The active state isn't transfered when inversing a range slider.
  const [active, setActive] = React.useState(-1);
  const [open, setOpen] = React.useState(-1);
  const [valueState, setValueState] = React.useState(defaultValue);
  const valueDerived = isControlled ? valueProp : valueState;
  const range = Array.isArray(valueDerived);
  const instanceRef = React.useRef();
  let values = range ? valueDerived.sort(asc) : [valueDerived];
  values = values.map(value => clamp(value, min, max));
  const marks =
    marksProp === true && step !== null
      ? [...Array(Math.floor(max / step) + 1)].map((_, index) => ({
          value: step * index,
        }))
      : marksProp;

  instanceRef.current = {
    source: valueDerived, // Keep track of the input value to leverage immutable state comparison.
  };

  const handleFocus = useEventCallback(event => {
    const index = Number(event.currentTarget.getAttribute('data-index'));
    setOpen(index);
  });
  const handleBlur = useEventCallback(() => {
    setOpen(-1);
  });
  const handleMouseOver = useEventCallback(event => {
    const index = Number(event.currentTarget.getAttribute('data-index'));
    setOpen(index);
  });
  const handleMouseLeave = useEventCallback(() => {
    setOpen(-1);
  });

  const handleKeyDown = useEventCallback(event => {
    const index = Number(event.currentTarget.getAttribute('data-index'));
    const value = values[index];
    const tenPercents = (max - min) / 10;
    const marksValues = marks.map(mark => mark.value);
    const marksIndex = marksValues.indexOf(value);
    let newValue;

    switch (event.key) {
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      case 'PageUp':
        if (step) {
          newValue = value + tenPercents;
        }
        break;
      case 'PageDown':
        if (step) {
          newValue = value - tenPercents;
        }
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        if (step) {
          newValue = value + step;
        } else {
          newValue = marksValues[marksIndex + 1] || marksValues[marksValues.length - 1];
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        if (step) {
          newValue = value - step;
        } else {
          newValue = marksValues[marksIndex - 1] || marksValues[0];
        }
        break;
      default:
        return;
    }

    event.preventDefault();

    if (step) {
      newValue = roundValueToStep(newValue, step);
    }

    newValue = clamp(newValue, min, max);

    if (range) {
      const previousValue = newValue;
      newValue = setValueIndex({
        values,
        source: valueDerived,
        newValue,
        index,
      }).sort(asc);
      focusThumb({ sliderRef, activeIndex: newValue.indexOf(previousValue) });
    }

    if (!isControlled) {
      setValueState(newValue);
    }

    if (onChange) {
      onChange(event, newValue);
    }
    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  });

  const sliderRef = React.useRef();
  const handleRef = useForkRef(sliderRef, ref);
  const previousIndex = React.useRef();
  let axis = orientation;
  if (theme.direction === 'rtl') {
    axis += '-reverse';
  }

  const getNewValue = React.useCallback(
    ({ finger, move = false, values: values2, source }) => {
      const { current: slider } = sliderRef;
      const { width, height, bottom, left } = slider.getBoundingClientRect();
      let percent;

      if (axis.indexOf('vertical') === 0) {
        percent = (bottom + ownerWindow(slider).pageYOffset - finger.y) / height;
      } else {
        percent = (finger.x - left - ownerWindow(slider).pageXOffset) / width;
      }

      if (axis.indexOf('-reverse') !== -1) {
        percent = 1 - percent;
      }

      let newValue;
      newValue = percentToValue(percent, min, max);
      if (step) {
        newValue = roundValueToStep(newValue, step);
      } else {
        const marksValues = marks.map(mark => mark.value);
        const closestIndex = findClosest(marksValues, newValue);
        newValue = marksValues[closestIndex];
      }

      newValue = clamp(newValue, min, max);
      let activeIndex = 0;

      if (range) {
        if (!move) {
          activeIndex = findClosest(values2, newValue);
        } else {
          activeIndex = previousIndex.current;
        }

        const previousValue = newValue;
        newValue = setValueIndex({
          values: values2,
          source,
          newValue,
          index: activeIndex,
        }).sort(asc);
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }

      return { newValue, activeIndex };
    },
    [max, min, axis, range, step, marks],
  );

  const handleTouchMove = useEventCallback(event => {
    const finger = trackFinger(event, touchId);

    if (!finger) {
      return;
    }

    const { newValue, activeIndex } = getNewValue({
      finger,
      move: true,
      values,
      source: valueDerived,
    });

    focusThumb({ sliderRef, activeIndex, setActive });
    if (!isControlled) {
      setValueState(newValue);
    }
    if (onChange) {
      onChange(event, newValue);
    }
  });

  const handleTouchEnd = useEventCallback(event => {
    const finger = trackFinger(event, touchId);

    if (!finger) {
      return;
    }

    const { newValue } = getNewValue({ finger, values, source: valueDerived });

    setActive(-1);
    if (event.type === 'touchend') {
      setOpen(-1);
    }

    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }

    touchId.current = undefined;
    document.body.removeEventListener('mousemove', handleTouchMove);
    document.body.removeEventListener('mouseup', handleTouchEnd);
    document.body.removeEventListener('touchmove', handleTouchMove);
    document.body.removeEventListener('touchend', handleTouchEnd);
  });

  const handleMouseEnter = useEventCallback(event => {
    // If the slider was being interacted with but the mouse went off the window
    // and then re-entered while unclicked then end the interaction.
    if (event.buttons === 0) {
      handleTouchEnd(event);
    }
  });

  const handleTouchStart = useEventCallback(event => {
    // Workaround as Safari has partial support for touchAction: 'none'.
    event.preventDefault();
    const touch = event.changedTouches.item(0);
    if (touch != null) {
      // A number that uniquely identifies the current finger in the touch session.
      touchId.current = touch.identifier;
    }
    const finger = trackFinger(event, touchId);
    const { newValue, activeIndex } = getNewValue({ finger, values, source: valueDerived });
    focusThumb({ sliderRef, activeIndex, setActive });

    if (!isControlled) {
      setValueState(newValue);
    }
    if (onChange) {
      onChange(event, newValue);
    }

    document.body.addEventListener('touchmove', handleTouchMove);
    document.body.addEventListener('touchend', handleTouchEnd);
  });

  React.useEffect(() => {
    if (disabled) {
      return () => {};
    }

    const { current: slider } = sliderRef;
    slider.addEventListener('touchstart', handleTouchStart);

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      document.body.removeEventListener('mousemove', handleTouchMove);
      document.body.removeEventListener('mouseup', handleTouchEnd);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('touchmove', handleTouchMove);
      document.body.removeEventListener('touchend', handleTouchEnd);
    };
  }, [disabled, handleMouseEnter, handleTouchEnd, handleTouchMove, handleTouchStart]);

  const handleMouseDown = useEventCallback(event => {
    if (onMouseDown) {
      onMouseDown(event);
    }

    if (disabled) {
      return;
    }

    event.preventDefault();
    const finger = trackFinger(event, touchId);
    const { newValue, activeIndex } = getNewValue({ finger, values, source: valueDerived });
    focusThumb({ sliderRef, activeIndex, setActive });

    if (!isControlled) {
      setValueState(newValue);
    }
    if (onChange) {
      onChange(event, newValue);
    }

    document.body.addEventListener('mousemove', handleTouchMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseup', handleTouchEnd);
  });

  const offset = range ? valueToPercent(values[0], min, max) : 0;
  const leap = valueToPercent(values[values.length - 1], min, max) - offset;
  const trackStyle = {
    ...axisProps[axis].offset(offset),
    ...axisProps[axis].leap(leap),
  };

  return (
    <Component
      ref={handleRef}
      className={clsx(
        classes.root,
        {
          [classes.disabled]: disabled,
          [classes.marked]: marks.length > 0 && marks.some(mark => mark.label),
          [classes.vertical]: orientation === 'vertical',
          [classes.rtl]: theme.direction === 'rtl',
        },
        className,
      )}
      onMouseDown={handleMouseDown}
      {...other}
    >
      <span className={classes.rail} />
      <span className={classes.track} style={trackStyle} />
      <input value={values.join(',')} name={name} type="hidden" />
      {marks.map(mark => {
        const percent = valueToPercent(mark.value, min, max);
        const style = axisProps[axis].offset(percent);
        const markActive = range
          ? percent >= values[0] && percent <= values[values.length - 1]
          : percent <= values[0];

        return (
          <React.Fragment key={mark.value}>
            <span
              style={style}
              className={clsx(classes.mark, {
                [classes.markActive]: markActive,
              })}
            />
            <span
              style={style}
              className={clsx(classes.markLabel, {
                [classes.markLabelActive]: markActive,
              })}
            >
              {mark.label}
            </span>
          </React.Fragment>
        );
      })}
      {values.map((value, index) => {
        const percent = valueToPercent(value, min, max);
        const style = axisProps[axis].offset(percent);

        return (
          <ValueLabelComponent
            key={index}
            valueLabelFormat={valueLabelFormat}
            valueLabelDisplay={valueLabelDisplay}
            className={classes.valueLabel}
            value={value}
            index={index}
            open={open === index || active === index}
            disabled={disabled}
          >
            <span
              className={clsx(classes.thumb, {
                [classes.active]: active === index,
              })}
              tabIndex={disabled ? null : 0}
              role="slider"
              style={style}
              data-index={index}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledby}
              aria-orientation={orientation}
              aria-valuemax={max}
              aria-valuemin={min}
              aria-valuenow={value}
              aria-valuetext={getAriaValueText ? getAriaValueText(value, index) : ariaValuetext}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            />
          </ValueLabelComponent>
        );
      })}
    </Component>
  );
});

Slider.propTypes = {
  /**
   * An alternative to `aria-labelledby`.
   */
  'aria-label': PropTypes.string,
  /**
   * Refers to the element containing the name of the slider.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext': chainPropTypes(PropTypes.string, props => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-valuetext']) {
      return new Error(
        'Material-UI: you need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range input.',
      );
    }

    return null;
  }),

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
   * The default element value, useful when not controlling the component.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * If `true`, the slider will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Returns a string value that provides a user-friendly name for the current value of the slider.
   *
   * @param {number} value The thumb label's value to format
   * @param {number} index The thumb label's index to format
   */
  getAriaValueText: PropTypes.func,
  /**
   * Marks represent predetermined values to which the user can move the slider.
   */
  marks: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   */
  max: PropTypes.number,
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   */
  min: PropTypes.number,
  /**
   * Name attribute of the hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {object} event The event source of the callback
   * @param {any} value The new value
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the mouseup is triggerd.
   *
   * @param {object} event The event source of the callback
   * @param {any} value The new value
   */
  onChangeCommitted: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
  /**
   * The stepper orientation (layout flow direction).
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The granularity the slider can step through values.
   * When step is `null`, users can only slide the thumbs onto marks.
   */
  step: PropTypes.number,
  /**
   * The value of the slider.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /**
   * The value label.
   */
  ValueLabelComponent: PropTypes.elementType,
  /**
   * Show value label.
   */
  valueLabelDisplay: PropTypes.oneOf(['on', 'active', 'off']),
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   */
  valueLabelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default withStyles(styles, { name: 'MuiSlider' })(Slider);
