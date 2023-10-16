'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import {
  unstable_debounce as debounce,
  unstable_useForkRef as useForkRef,
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_ownerWindow as ownerWindow,
} from '@mui/utils';
import { TextareaAutosizeProps } from './TextareaAutosize.types';

type State = {
  outerHeightStyle: number;
  overflow?: boolean | undefined;
};

function getStyleValue(value: string) {
  return parseInt(value, 10) || 0;
}

const styles: {
  shadow: React.CSSProperties;
} = {
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: 'hidden',
    // Remove from the content flow
    position: 'absolute',
    // Ignore the scrollbar width
    overflow: 'hidden',
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: 'translateZ(0)',
  },
};

function isEmpty(obj: State) {
  return (
    obj === undefined ||
    obj === null ||
    Object.keys(obj).length === 0 ||
    (obj.outerHeightStyle === 0 && !obj.overflow)
  );
}

/**
 *
 * Demos:
 *
 * - [Textarea Autosize](https://mui.com/base-ui/react-textarea-autosize/)
 * - [Textarea Autosize](https://mui.com/material-ui/react-textarea-autosize/)
 *
 * API:
 *
 * - [TextareaAutosize API](https://mui.com/base-ui/react-textarea-autosize/components-api/#textarea-autosize)
 */
const TextareaAutosize = React.forwardRef(function TextareaAutosize(
  props: TextareaAutosizeProps,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const { onChange, maxRows, minRows = 1, style, value, ...other } = props;

  const { current: isControlled } = React.useRef(value != null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleRef = useForkRef(forwardedRef, inputRef);
  const shadowRef = React.useRef<HTMLTextAreaElement>(null);
  const renders = React.useRef(0);
  const [state, setState] = React.useState<State>({
    outerHeightStyle: 0,
  });

  const getUpdatedState = React.useCallback(() => {
    const input = inputRef.current!;

    const containerWindow = ownerWindow(input);
    const computedStyle = containerWindow.getComputedStyle(input);

    // If input's width is shrunk and it's not visible, don't sync height.
    if (computedStyle.width === '0px') {
      return {
        outerHeightStyle: 0,
      };
    }

    const inputShallow = shadowRef.current!;

    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || 'x';
    if (inputShallow.value.slice(-1) === '\n') {
      // Certain fonts which overflow the line height will cause the textarea
      // to report a different scrollHeight depending on whether the last line
      // is empty. Make it non-empty to avoid this issue.
      inputShallow.value += ' ';
    }

    const boxSizing = computedStyle.boxSizing;
    const padding =
      getStyleValue(computedStyle.paddingBottom) + getStyleValue(computedStyle.paddingTop);
    const border =
      getStyleValue(computedStyle.borderBottomWidth) + getStyleValue(computedStyle.borderTopWidth);

    // The height of the inner content
    const innerHeight = inputShallow.scrollHeight;

    // Measure height of a textarea with a single row
    inputShallow.value = 'x';
    const singleRowHeight = inputShallow.scrollHeight;

    // The height of the outer content
    let outerHeight = innerHeight;

    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);

    // Take the box sizing into account for applying this value as a style.
    const outerHeightStyle = outerHeight + (boxSizing === 'border-box' ? padding + border : 0);
    const overflow = Math.abs(outerHeight - innerHeight) <= 1;

    return { outerHeightStyle, overflow };
  }, [maxRows, minRows, props.placeholder]);

  const updateState = (prevState: State, newState: State) => {
    const { outerHeightStyle, overflow } = newState;
    // Need a large enough difference to update the height.
    // This prevents infinite rendering loop.
    if (
      renders.current < 20 &&
      ((outerHeightStyle > 0 &&
        Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1) ||
        prevState.overflow !== overflow)
    ) {
      renders.current += 1;
      return {
        overflow,
        outerHeightStyle,
      };
    }
    if (process.env.NODE_ENV !== 'production') {
      if (renders.current === 20) {
        console.error(
          [
            'MUI: Too many re-renders. The layout is unstable.',
            'TextareaAutosize limits the number of renders to prevent an infinite loop.',
          ].join('\n'),
        );
      }
    }
    return prevState;
  };

  const syncHeight = React.useCallback(() => {
    const newState = getUpdatedState();

    if (isEmpty(newState)) {
      return;
    }

    setState((prevState) => updateState(prevState, newState));
  }, [getUpdatedState]);

  useEnhancedEffect(() => {
    const syncHeightWithFlushSync = () => {
      const newState = getUpdatedState();

      if (isEmpty(newState)) {
        return;
      }

      // In React 18, state updates in a ResizeObserver's callback are happening after
      // the paint, this leads to an infinite rendering.
      //
      // Using flushSync ensures that the states is updated before the next pain.
      // Related issue - https://github.com/facebook/react/issues/24331
      ReactDOM.flushSync(() => {
        setState((prevState) => updateState(prevState, newState));
      });
    };

    const handleResize = () => {
      renders.current = 0;
      syncHeightWithFlushSync();
    };
    // Workaround a "ResizeObserver loop completed with undelivered notifications" error
    // in test.
    // Note that we might need to use this logic in production per https://github.com/WICG/resize-observer/issues/38
    // Also see https://github.com/mui/mui-x/issues/8733
    let rAF: any;
    const rAFHandleResize = () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        handleResize();
      });
    };
    const debounceHandleResize = debounce(handleResize);
    const input = inputRef.current!;
    const containerWindow = ownerWindow(input);

    containerWindow.addEventListener('resize', debounceHandleResize);

    let resizeObserver: ResizeObserver;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(
        process.env.NODE_ENV === 'test' ? rAFHandleResize : handleResize,
      );

      resizeObserver.observe(input);
    }

    return () => {
      debounceHandleResize.clear();
      cancelAnimationFrame(rAF);
      containerWindow.removeEventListener('resize', debounceHandleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [getUpdatedState]);

  useEnhancedEffect(() => {
    syncHeight();
  });

  React.useEffect(() => {
    renders.current = 0;
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    renders.current = 0;

    if (!isControlled) {
      syncHeight();
    }

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <React.Fragment>
      <textarea
        value={value}
        onChange={handleChange}
        ref={handleRef}
        // Apply the rows prop to get a "correct" first SSR paint
        rows={minRows as number}
        style={{
          height: state.outerHeightStyle,
          // Need a large enough difference to allow scrolling.
          // This prevents infinite rendering loop.
          overflow: state.overflow ? 'hidden' : undefined,
          ...style,
        }}
        {...other}
      />
      <textarea
        aria-hidden
        className={props.className}
        readOnly
        ref={shadowRef}
        tabIndex={-1}
        style={{
          ...styles.shadow,
          ...style,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      />
    </React.Fragment>
  );
}) as React.ForwardRefExoticComponent<TextareaAutosizeProps & React.RefAttributes<Element>>;

TextareaAutosize.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Maximum number of rows to display.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  placeholder: PropTypes.string,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * @ignore
   */
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.string,
  ]),
} as any;

export { TextareaAutosize };
