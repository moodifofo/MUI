import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce'; // < 1kb payload overhead when lodash/debounce is > 3kb.

const styles = {
  width: 99,
  height: 99,
  position: 'absolute',
  top: -9999,
  overflow: 'scroll',
  // TODO Do we need this style for IE 11 support?
  msOverflowStyle: 'scrollbar',
};

/**
 * @ignore - internal component.
 * The component is originates from https://github.com/STORIS/react-scrollbar-size.
 * It has been moved into the core in order to minimize the bundle size.
 */
function ScrollbarSize(props) {
  const { onChange } = props;
  const scrollbarHeight = React.useRef();
  const nodeRef = React.useRef();

  const setMeasurements = () => {
    if (!nodeRef.current) {
      return;
    }

    scrollbarHeight.current = nodeRef.current.offsetHeight - nodeRef.current.clientHeight;
  };

  React.useEffect(() => {
    const handleResize = debounce(() => {
      const prevHeight = scrollbarHeight.current;
      setMeasurements();

      if (prevHeight !== scrollbarHeight.current) {
        onChange(scrollbarHeight.current);
      }
    }, 166); // Corresponds to 10 frames at 60 Hz.

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [onChange]);

  const handleRef = ref => {
    nodeRef.current = ref;
  };

  React.useEffect(() => {
    setMeasurements();
    onChange(scrollbarHeight.current);
  }, [onChange]);

  return (
    <React.Fragment>
      <div style={styles} ref={handleRef} />
    </React.Fragment>
  );
}

ScrollbarSize.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ScrollbarSize;
