import { unstable_capitalize as capitalize } from '@mui/utils';
import merge from '../merge';
import { getPath, getValue } from '../style';
import {
  handleBreakpoints,
  createEmptyBreakpointObject,
  removeUnusedBreakpoints,
} from '../breakpoints';
import defaultSxConfig from './defaultSxConfig';

function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}

function callIfFn(maybeFn, arg) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function unstable_createStyleFunctionSx(config = defaultSxConfig) {
  function getThemeValue(prop, value, theme) {
    const props = {
      [prop]: value,
      theme,
    };

    const options = config[prop];

    if (!options) {
      return { [prop]: value };
    }

    const { cssProperty = prop, themeKey, transform, style } = options;

    if (value == null) {
      return null;
    }

    const themeMapping = getPath(theme, themeKey) || {};

    if (style) {
      return style(props);
    }

    const styleFromPropValue = (propValueFinal) => {
      let value = getValue(themeMapping, transform, propValueFinal);

      if (propValueFinal === value && typeof propValueFinal === 'string') {
        // Haven't found value
        value = getValue(
          themeMapping,
          transform,
          `${prop}${propValueFinal === 'default' ? '' : capitalize(propValueFinal)}`,
          propValueFinal,
        );
      }

      if (cssProperty === false) {
        return value;
      }

      return {
        [cssProperty]: value,
      };
    };

    return handleBreakpoints(props, value, styleFromPropValue);
  }

  function styleFunctionSx(props) {
    const { sx, theme = {} } = props || {};
    if (!sx) {
      return null; // Emotion & styled-components will neglect null
    }

    /*
     * Receive `sxInput` as object or callback
     * and then recursively check keys & values to create media query object styles.
     * (the result will be used in `styled`)
     */
    function traverse(sxInput) {
      let sxObject = sxInput;
      if (typeof sxInput === 'function') {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== 'object') {
        // value
        return sxInput;
      }
      if (!sxObject) {
        return null;
      }
      const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);

      let css = emptyBreakpoints;

      Object.keys(sxObject).forEach((styleKey) => {
        const value = callIfFn(sxObject[styleKey], theme);
        if (value !== null && value !== undefined) {
          if (typeof value === 'object') {
            if (config[styleKey]) {
              css = merge(css, getThemeValue(styleKey, value, theme));
            } else {
              const breakpointsValues = handleBreakpoints({ theme }, value, (x) => ({
                [styleKey]: x,
              }));

              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css[styleKey] = styleFunctionSx({ sx: value, theme });
              } else {
                css = merge(css, breakpointsValues);
              }
            }
          } else {
            css = merge(css, getThemeValue(styleKey, value, theme));
          }
        }
      });

      return removeUnusedBreakpoints(breakpointsKeys, css);
    }

    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }

  return styleFunctionSx;
}

const styleFunctionSx = unstable_createStyleFunctionSx();

styleFunctionSx.filterProps = ['sx'];

export default styleFunctionSx;
