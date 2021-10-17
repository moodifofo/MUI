import { unstable_composeClasses as composeClasses } from '@mui/core';
import { styled, useThemeProps } from '@mui/material/styles';
import {
  createUnarySpacing,
  getValue,
  handleBreakpoints,
  unstable_resolveBreakpointValues as resolveBreakpointValues,
} from '@mui/system';
import { deepmerge, unstable_useForkRef as useForkRef } from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { getMasonryUtilityClass } from './masonryClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMasonryUtilityClass, classes);
};

const computeBreakpointsBase = (breakpoints, prop) => {
  const base = {};
  if (Array.isArray(prop)) {
    const arrayLen = prop.length;
    Object.keys(breakpoints.values).forEach((breakpoint, i) => {
      if (i < arrayLen) {
        base[breakpoint] = true;
      }
    });
  } else {
    Object.keys(breakpoints.values).forEach((breakpoint) => {
      if (prop[breakpoint] != null) {
        base[breakpoint] = true;
      }
    });
  }
  return base;
};

const validatePropValues = (base, prop) => {
  const values = {};
  if (Array.isArray(prop)) {
    Object.keys(base).forEach((breakpoint, i) => {
      values[breakpoint] = Number(prop[i]);
    });
    return values;
  }
  return prop;
};

export const getStyle = ({ ownerState, theme }) => {
  let styles = {
    display: 'flex',
    flexFlow: 'column wrap',
    alignContent: 'space-between',
    boxSizing: 'border-box',
    '& > *': {
      boxSizing: 'border-box',
    },
  };

  const stylesSSR = {};
  if (ownerState.isSSR) {
    const orderStyleSSR = {};
    const defaultSpacing = Number(theme.spacing(ownerState.defaultSpacing).replace('px', ''));
    for (let i = 1; i <= ownerState.defaultColumns; i += 1) {
      orderStyleSSR[
        `&:nth-of-type(${ownerState.defaultColumns}n+${i % ownerState.defaultColumns})`
      ] = {
        order: i,
      };
    }
    stylesSSR.height = ownerState.defaultHeight;
    stylesSSR.margin = -(defaultSpacing / 2);
    stylesSSR['& > *'] = {
      ...styles['& > *'],
      ...orderStyleSSR,
      margin: defaultSpacing / 2,
      width: `calc(${(100 / ownerState.defaultColumns).toFixed(2)}% - ${defaultSpacing}px)`,
    };

    return {
      ...styles,
      ...stylesSSR,
    };
  }

  const spacingBreakpointsBase = computeBreakpointsBase(theme.breakpoints, ownerState.spacing);
  const spacingValues = resolveBreakpointValues({
    values: validatePropValues(spacingBreakpointsBase, ownerState.spacing),
    base: spacingBreakpointsBase,
  });

  const transformer = createUnarySpacing(theme);
  const spacingStyleFromPropValue = (propValue) => {
    propValue = Number(propValue);
    const spacing = Number(getValue(transformer, propValue).replace('px', ''));
    return {
      margin: -(spacing / 2),
      '& > *': {
        margin: spacing / 2,
      },
      ...(ownerState.maxColumnHeight && {
        height: Math.ceil(ownerState.maxColumnHeight + spacing),
      }),
    };
  };

  styles = deepmerge(
    styles,
    handleBreakpoints({ theme }, spacingValues, spacingStyleFromPropValue),
  );

  const columnBreakpointsBase = computeBreakpointsBase(theme.breakpoints, ownerState.columns);
  const columnValues = resolveBreakpointValues({
    values: validatePropValues(columnBreakpointsBase, ownerState.columns),
    base: columnBreakpointsBase,
  });

  const columnStyleFromPropValue = (propValue) => {
    propValue = Number(propValue);
    const width = `${(100 / propValue).toFixed(2)}%`;
    const spacing =
      typeof spacingValues !== 'object' ? getValue(transformer, Number(spacingValues)) : '0px';
    return {
      '& > *': { width: `calc(${width} - ${spacing})` },
    };
  };

  styles = deepmerge(styles, handleBreakpoints({ theme }, columnValues, columnStyleFromPropValue));

  // configure width for responsive spacing values
  if (typeof spacingValues === 'object') {
    styles = deepmerge(
      styles,
      handleBreakpoints({ theme }, spacingValues, (propValue, breakpoint) => {
        if (breakpoint) {
          propValue = Number(propValue);
          const lastBreakpoint = Object.keys(columnValues).pop();
          const spacing = getValue(transformer, propValue);
          const column =
            typeof columnValues === 'object'
              ? columnValues[breakpoint] || columnValues[lastBreakpoint]
              : columnValues;
          const width = `${(100 / column).toFixed(2)}%`;
          return {
            '& > *': { width: `calc(${width} - ${spacing})` },
          };
        }
        return null;
      }),
    );
  }

  return styles;
};

const MasonryRoot = styled('div', {
  name: 'MuiMasonry',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [styles.root];
  },
})(getStyle);

const Masonry = React.forwardRef(function Masonry(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMasonry',
  });

  const {
    children,
    className,
    component = 'div',
    columns = 4,
    spacing = 1,
    defaultColumns,
    defaultHeight,
    defaultSpacing,
    ...other
  } = props;

  const masonryRef = React.useRef();
  const [maxColumnHeight, setMaxColumnHeight] = React.useState();
  const isSSR = !maxColumnHeight && defaultColumns && defaultHeight && defaultSpacing;
  const [numberOfLineBreaks, setNumberOfLineBreaks] = React.useState(
    isSSR ? defaultColumns - 1 : 0,
  );

  const ownerState = {
    ...props,
    spacing,
    columns,
    maxColumnHeight,
    defaultColumns,
    defaultHeight,
    defaultSpacing,
    isSSR,
  };

  const classes = useUtilityClasses(ownerState);

  React.useEffect(() => {
    const handleResize = () => {
      const parentWidth = masonryRef.current.clientWidth;
      const childWidth = masonryRef.current.firstChild.clientWidth;
      const childMargin = Number(
        window.getComputedStyle(masonryRef.current.firstChild).margin.replace('px', ''),
      );

      if (parentWidth === 0 || childWidth === 0) {
        return;
      }

      const currentNumberOfColumns = Math.round(parentWidth / (childWidth + childMargin * 2));
      const columnHeights = new Array(currentNumberOfColumns).fill(0);
      let skip = false;
      masonryRef.current.childNodes.forEach((child) => {
        if (child.nodeType !== Node.ELEMENT_NODE || child.dataset.class === 'line-break' || skip) {
          return;
        }
        // if any one of children isn't rendered yet, masonry's height shouldn't be computed yet
        const childHeight = child.clientHeight
          ? Math.ceil(child.clientHeight) + childMargin * 2
          : 0;
        if (childHeight === 0) {
          skip = true;
        }
        // if there is a nested image that isn't rendered yet, masonry's height shouldn't be computed yet
        child.childNodes.forEach((nestedChild) => {
          if (nestedChild.tagName === 'IMG' && nestedChild.clientHeight === 0) {
            skip = true;
          }
        });
        if (!skip) {
          // find the current shortest column (where the current item will be placed)
          const currentMinColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
          columnHeights[currentMinColumnIndex] += childHeight;
          const order = currentMinColumnIndex + 1;
          child.style.order = order;
        }
      });
      if (!skip) {
        setMaxColumnHeight(Math.max(...columnHeights));
        const numOfLineBreaks = currentNumberOfColumns > 0 ? currentNumberOfColumns - 1 : 0;
        setNumberOfLineBreaks(numOfLineBreaks);
      }
    };

    // IE and old browsers are not supported
    if (typeof ResizeObserver === 'undefined') {
      return null;
    }
    const resizeObserver = new ResizeObserver(handleResize);

    const container = masonryRef.current;
    resizeObserver.observe(container);
    // Observing window in addition to masonry container is more stable
    window.addEventListener('resize', handleResize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [columns, spacing]);

  const handleRef = useForkRef(ref, masonryRef);
  const lineBreakStyle = {
    flexBasis: '100%',
    width: 0,
    margin: 0,
    padding: 0,
  };

  return (
    <MasonryRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={handleRef}
      ownerState={ownerState}
      {...other}
    >
      {children}
      {new Array(numberOfLineBreaks).fill('').map((_, index) => (
        <span key={index} data-class="line-break" style={{ ...lineBreakStyle, order: index + 1 }} />
      ))}
    </MasonryRoot>
  );
});

Masonry.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Number of columns.
   * @default 4
   */
  columns: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The default number of columns of the component. This is provided for server-side rendering.
   */
  defaultColumns: PropTypes.number,
  /**
   * The default height of the component in px. This is provided for server-side rendering.
   */
  defaultHeight: PropTypes.number,
  /**
   * The default spacing of the component. This is provided for server-side rendering.
   */
  defaultSpacing: PropTypes.number,
  /**
   * Defines the space between children. It is a factor of the theme's spacing.
   * @default 1
   */
  spacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * Allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default Masonry;
