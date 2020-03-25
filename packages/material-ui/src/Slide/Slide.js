import * as React from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import debounce from '../utils/debounce';
import { Transition } from 'react-transition-group';
import { elementAcceptingRef } from '@material-ui/utils';
import useForkRef from '../utils/useForkRef';
import useTheme from '../styles/useTheme';
import { duration } from '../styles/transitions';
import { reflow, getTransitionProps } from '../transitions/utils';

// Translate the node so he can't be seen on the screen.
// Later, we gonna translate back the node to his original location
// with `none`.`
function getTranslateValue(direction, node, parentRef = window) {
  const rect = node.getBoundingClientRect();

  let transform;

  if (node.fakeTransform) {
    transform = node.fakeTransform;
  } else {
    const computedStyle = window.getComputedStyle(node);
    transform =
      computedStyle.getPropertyValue('-webkit-transform') ||
      computedStyle.getPropertyValue('transform');
  }

  let offsetX = 0;
  let offsetY = 0;

  if (transform && transform !== 'none' && typeof transform === 'string') {
    const transformValues = transform.split('(')[1].split(')')[0].split(',');
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  if (direction === 'left') {
    return `translateX(${
      parentRef === window ? window.innerWidth : rect.left + parentRef.offsetWidth
    }px) translateX(-${rect.left - offsetX}px)`;
  }

  if (direction === 'right') {
    return `translateX(-${rect.left + rect.width - offsetX}px)`;
  }

  if (direction === 'up') {
    return `translateY(${
      parentRef === window ? window.innerHeight : rect.top + parentRef.offsetHeight
    }px) translateY(-${rect.top - offsetY}px)`;
  }

  // direction === 'down'
  return `translateY(-${rect.top + rect.height - offsetY}px)`;
}

export function setTranslateValue(direction, node, parentRef) {
  const transform = getTranslateValue(direction, node, parentRef);

  if (transform) {
    node.style.webkitTransform = transform;
    node.style.transform = transform;
  }
}

const defaultTimeout = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen,
};

/**
 * The Slide transition is used by the [Drawer](/components/drawers/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
const Slide = React.forwardRef(function Slide(props, ref) {
  const {
    children,
    parentRef,
    direction = 'down',
    in: inProp,
    onEnter,
    onEntering,
    onExit,
    onExited,
    style,
    timeout = defaultTimeout,
    ...other
  } = props;

  const theme = useTheme();
  const childrenRef = React.useRef(null);
  /**
   * used in cloneElement(children, { ref: handleRef })
   */
  const handleOwnRef = React.useCallback((instance) => {
    // #StrictMode ready
    childrenRef.current = ReactDOM.findDOMNode(instance);
  }, []);
  const handleRefIntermediary = useForkRef(children.ref, handleOwnRef);
  const handleRef = useForkRef(handleRefIntermediary, ref);

  const handleEnter = (_, isAppearing) => {
    const node = childrenRef.current;
    setTranslateValue(direction, node, parentRef);
    reflow(node);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  const handleEntering = (_, isAppearing) => {
    const node = childrenRef.current;
    const transitionProps = getTransitionProps(
      { timeout, style },
      {
        mode: 'enter',
      },
    );
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
      ...transitionProps,
      easing: theme.transitions.easing.easeOut,
    });
    node.style.transition = theme.transitions.create('transform', {
      ...transitionProps,
      easing: theme.transitions.easing.easeOut,
    });
    node.style.webkitTransform = 'none';
    node.style.transform = 'none';
    if (onEntering) {
      onEntering(node, isAppearing);
    }
  };

  const handleExit = () => {
    const node = childrenRef.current;
    const transitionProps = getTransitionProps(
      { timeout, style },
      {
        mode: 'exit',
      },
    );
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
      ...transitionProps,
      easing: theme.transitions.easing.sharp,
    });
    node.style.transition = theme.transitions.create('transform', {
      ...transitionProps,
      easing: theme.transitions.easing.sharp,
    });
    setTranslateValue(direction, node, parentRef);

    if (onExit) {
      onExit(node);
    }
  };

  const handleExited = () => {
    const node = childrenRef.current;
    // No need for transitions when the component is hidden
    node.style.webkitTransition = '';
    node.style.transition = '';

    if (onExited) {
      onExited(node);
    }
  };

  const updatePosition = React.useCallback(() => {
    if (childrenRef.current) {
      setTranslateValue(direction, childrenRef.current, parentRef);
    }
  }, [direction, parentRef]);

  React.useEffect(() => {
    // Skip configuration where the position is screen size invariant.
    if (inProp || direction === 'down' || direction === 'right') {
      return undefined;
    }

    const handleResize = debounce(() => {
      if (childrenRef.current) {
        setTranslateValue(direction, childrenRef.current, parentRef);
      }
    });

    window.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
    };
  }, [direction, inProp, parentRef]);

  React.useEffect(() => {
    if (!inProp) {
      // We need to update the position of the drawer when the direction change and
      // when it's hidden.
      updatePosition();
    }
  }, [inProp, updatePosition]);

  return (
    <Transition
      onEnter={handleEnter}
      onEntering={handleEntering}
      onExit={handleExit}
      onExited={handleExited}
      appear
      in={inProp}
      timeout={timeout}
      {...other}
    >
      {(state, childProps) => {
        return React.cloneElement(children, {
          ref: handleRef,
          style: {
            visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
            ...style,
            ...children.props.style,
          },
          ...childProps,
        });
      }}
    </Transition>
  );
});

Slide.propTypes = {
  /**
   * A single child content element.
   */
  children: elementAcceptingRef,
  /**
   * Direction the child node will enter from.
   */
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
  /**
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onEntering: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  onExited: PropTypes.func,
  /**
   * If defined, then element slides in from the edge of the parentRef element, else it slides from the edge of the screen.
   */
  parentRef: PropTypes.object,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
};

export default Slide;
