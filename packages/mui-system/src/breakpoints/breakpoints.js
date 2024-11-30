import PropTypes from 'prop-types';
import isObjectEmpty from '@mui/utils/isObjectEmpty';
import fastDeepAssign from '@mui/utils/fastDeepAssign';
import deepmerge from '@mui/utils/deepmerge';
import merge from '../merge';
import { isCqShorthand, getContainerQuery } from '../cssContainerQueries';
import createBreakpoints from '../createBreakpoints/createBreakpoints';

const EMPTY_THEME = {};

// The breakpoint **start** at this value.
// For instance with the first breakpoint xs: [xs, sm[.
export const values = {
  xs: 0, // phone
  sm: 600, // tablet
  md: 900, // small laptop
  lg: 1200, // desktop
  xl: 1536, // large screen
};

export const DEFAULT_BREAKPOINTS = createBreakpoints({ values });

const defaultContainerQueries = {
  containerQueries: (containerName) => ({
    up: (key) => {
      let result = typeof key === 'number' ? key : values[key] || key;
      if (typeof result === 'number') {
        result = `${result}px`;
      }
      return containerName
        ? `@container ${containerName} (min-width:${result})`
        : `@container (min-width:${result})`;
    },
  }),
};

export function handleBreakpoints(props, propValue, styleFromPropValue) {
  const result = {};
  return iterateBreakpoints(result, props.theme, propValue, (mediaKey, value, initialKey) => {
    const finalValue = styleFromPropValue(value, initialKey);
    if (mediaKey) {
      result[mediaKey] = finalValue;
    } else {
      fastDeepAssign(result, finalValue);
    }
  });
}

export function iterateBreakpoints(target, theme, propValue, callback) {
  theme ??= EMPTY_THEME;

  if (Array.isArray(propValue)) {
    const breakpoints = theme.breakpoints ?? DEFAULT_BREAKPOINTS;
    for (let i = 0; i < propValue.length; i += 1) {
      buildBreakpoint(
        target,
        breakpoints.up(breakpoints.keys[i]),
        propValue[i],
        undefined,
        callback,
      );
    }
    return target;
  }

  if (typeof propValue === 'object') {
    const breakpoints = theme.breakpoints ?? DEFAULT_BREAKPOINTS;
    const breakpointValues = breakpoints.values ?? values;

    for (const key in propValue) {
      if (isCqShorthand(breakpoints.keys, key)) {
        const containerKey = getContainerQuery(
          theme.containerQueries ? theme : defaultContainerQueries,
          key,
        );
        if (containerKey) {
          buildBreakpoint(target, containerKey, propValue[key], key, callback);
        }
      }
      // key is key
      else if (key in breakpointValues) {
        const mediaKey = breakpoints.up(key);
        buildBreakpoint(target, mediaKey, propValue[key], key, callback);
      } else {
        const cssKey = key;
        target[cssKey] = propValue[cssKey];
      }
    }

    return target;
  }

  callback(undefined, propValue);

  return target;
}

function buildBreakpoint(target, mediaKey, value, initialKey, callback) {
  target[mediaKey] ??= {};
  callback(mediaKey, value, initialKey);
}

function setupBreakpoints(styleFunction) {
  // eslint-disable-next-line react/function-component-definition
  const newStyleFunction = (props) => {
    const theme = props.theme || {};
    const base = styleFunction(props);
    const themeBreakpoints = theme.breakpoints || DEFAULT_BREAKPOINTS;

    const extended = themeBreakpoints.keys.reduce((acc, key) => {
      if (props[key]) {
        acc = acc || {};
        acc[themeBreakpoints.up(key)] = styleFunction({ theme, ...props[key] });
      }
      return acc;
    }, null);

    return merge(base, extended);
  };

  newStyleFunction.propTypes =
    process.env.NODE_ENV !== 'production'
      ? {
          ...styleFunction.propTypes,
          xs: PropTypes.object,
          sm: PropTypes.object,
          md: PropTypes.object,
          lg: PropTypes.object,
          xl: PropTypes.object,
        }
      : {};

  newStyleFunction.filterProps = ['xs', 'sm', 'md', 'lg', 'xl', ...styleFunction.filterProps];

  return newStyleFunction;
}

export function createEmptyBreakpointObject(breakpoints = DEFAULT_BREAKPOINTS) {
  const { internal_mediaKeys: mediaKeys } = breakpoints;
  const result = {};
  for (let i = 0; i < mediaKeys.length; i += 1) {
    result[mediaKeys[i]] = {};
  }
  return result;
}

export function removeUnusedBreakpoints(breakpoints, style) {
  const breakpointKeys = breakpoints.internal_mediaKeys;

  for (let i = 0; i < breakpointKeys.length; i += 1) {
    const key = breakpointKeys[i];

    if (isObjectEmpty(style[key])) {
      delete style[key];
    }
  }

  return style;
}

export function mergeBreakpointsInOrder(breakpoints, ...styles) {
  const emptyBreakpoints = createEmptyBreakpointObject(breakpoints);
  const mergedOutput = [emptyBreakpoints, ...styles].reduce(
    (prev, next) => deepmerge(prev, next),
    {},
  );
  return removeUnusedBreakpoints(breakpoints, mergedOutput);
}

// compute base for responsive values; e.g.,
// [1,2,3] => {xs: true, sm: true, md: true}
// {xs: 1, sm: 2, md: 3} => {xs: true, sm: true, md: true}
export function computeBreakpointsBase(breakpointValues, themeBreakpoints) {
  // fixed value
  if (typeof breakpointValues !== 'object') {
    return {};
  }
  const base = {};
  const breakpointsKeys = Object.keys(themeBreakpoints);
  if (Array.isArray(breakpointValues)) {
    breakpointsKeys.forEach((breakpoint, i) => {
      if (i < breakpointValues.length) {
        base[breakpoint] = true;
      }
    });
  } else {
    breakpointsKeys.forEach((breakpoint) => {
      if (breakpointValues[breakpoint] != null) {
        base[breakpoint] = true;
      }
    });
  }
  return base;
}

export function resolveBreakpointValues({
  values: breakpointValues,
  breakpoints: themeBreakpoints,
  base: customBase,
}) {
  const base = customBase || computeBreakpointsBase(breakpointValues, themeBreakpoints);
  const keys = Object.keys(base);

  if (keys.length === 0) {
    return breakpointValues;
  }

  let previous;

  return keys.reduce((acc, breakpoint, i) => {
    if (Array.isArray(breakpointValues)) {
      acc[breakpoint] =
        breakpointValues[i] != null ? breakpointValues[i] : breakpointValues[previous];
      previous = i;
    } else if (typeof breakpointValues === 'object') {
      acc[breakpoint] =
        breakpointValues[breakpoint] != null
          ? breakpointValues[breakpoint]
          : breakpointValues[previous];
      previous = breakpoint;
    } else {
      acc[breakpoint] = breakpointValues;
    }
    return acc;
  }, {});
}

export function hasBreakpoint(breakpoints, value) {
  if (Array.isArray(value)) {
    return true;
  }
  if (typeof value === 'object' && value !== null) {
    for (let i = 0; i < breakpoints.keys.length; i += 1) {
      if (breakpoints.keys[i] in value) {
        return true;
      }
    }
  }
  return false;
}

export default setupBreakpoints;
