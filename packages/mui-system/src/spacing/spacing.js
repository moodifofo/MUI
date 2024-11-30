import responsivePropType from '../responsivePropType';
import { iterateBreakpoints } from '../breakpoints';
import { getPath } from '../style';

/* eslint-disable guard-for-in */

const EMPTY_THEME = { internal_cache: {} };

const properties = {
  m: 'margin',
  p: 'padding',
};

const directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom'],
};

const aliases = {
  marginX: 'mx',
  marginY: 'my',
  paddingX: 'px',
  paddingY: 'py',
};

const CSS_PROPERTIES = {};
for (const key in properties) {
  CSS_PROPERTIES[key] = [properties[key]];
}
for (const keyProperty in properties) {
  for (const keyDirection in directions) {
    const property = properties[keyProperty];
    const direction = directions[keyDirection];
    const value = Array.isArray(direction)
      ? direction.map((dir) => property + dir)
      : [property + direction];
    CSS_PROPERTIES[keyProperty + keyDirection] = value;
  }
}
for (const key in aliases) {
  CSS_PROPERTIES[key] = CSS_PROPERTIES[aliases[key]];
}

export const marginKeys = new Set([
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'marginInline',
  'marginInlineStart',
  'marginInlineEnd',
  'marginBlock',
  'marginBlockStart',
  'marginBlockEnd',
]);

export const paddingKeys = new Set([
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingX',
  'paddingY',
  'paddingInline',
  'paddingInlineStart',
  'paddingInlineEnd',
  'paddingBlock',
  'paddingBlockStart',
  'paddingBlockEnd',
]);

const spacingKeys = new Set([...marginKeys, ...paddingKeys]);

export function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  const themeSpacing = getPath(theme, themeKey, true) ?? defaultValue;

  if (typeof themeSpacing === 'number' || typeof themeSpacing === 'string') {
    return (val) => {
      if (typeof val === 'string') {
        return val;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (typeof val !== 'number') {
          console.error(
            `MUI: Expected ${propName} argument to be a number or a string, got ${val}.`,
          );
        }
      }

      if (typeof themeSpacing === 'string') {
        return `calc(${val} * ${themeSpacing})`;
      }
      return themeSpacing * val;
    };
  }

  if (Array.isArray(themeSpacing)) {
    return (val) => {
      if (typeof val === 'string') {
        return val;
      }
      const abs = Math.abs(val);

      if (process.env.NODE_ENV !== 'production') {
        if (!Number.isInteger(abs)) {
          console.error(
            [
              `MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.` +
                `You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`,
            ].join('\n'),
          );
        } else if (abs > themeSpacing.length - 1) {
          console.error(
            [
              `MUI: The value provided (${abs}) overflows.`,
              `The supported values are: ${JSON.stringify(themeSpacing)}.`,
              `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`,
            ].join('\n'),
          );
        }
      }

      const transformed = themeSpacing[abs];

      if (val >= 0) {
        return transformed;
      }

      if (typeof transformed === 'number') {
        return -transformed;
      }

      return `-${transformed}`;
    };
  }

  if (typeof themeSpacing === 'function') {
    return themeSpacing;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(
      [
        `MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`,
        'It should be a number, an array or a function.',
      ].join('\n'),
    );
  }

  return () => undefined;
}

export function createUnarySpacing(theme) {
  return createUnaryUnit(theme, 'spacing', 8, 'spacing');
}

export function getValue(transformer, propValue) {
  if (typeof propValue === 'string' || propValue == null) {
    return propValue;
  }
  return transformer(propValue);
}

// Avoid allocations
const container = [''];

function style(props, keys) {
  const theme = props.theme ?? EMPTY_THEME;
  const transformer = (theme.internal_cache.unarySpacing ??= createUnarySpacing(theme)); // eslint-disable-line

  const result = {};
  for (const prop in props) {
    if (!keys.has(prop)) {
      continue;
    }

    const cssProperties = CSS_PROPERTIES[prop] ?? ((container[0] = prop), container);
    const propValue = props[prop];

    iterateBreakpoints(result, props.theme, propValue, (mediaKey, value) => {
      const target = mediaKey ? result[mediaKey] : result;
      for (let i = 0; i < cssProperties.length; i += 1) {
        target[cssProperties[i]] = getValue(transformer, value);
      }
    });
  }

  return result;
}

export function margin(props) {
  return style(props, marginKeys);
}

margin.propTypes =
  process.env.NODE_ENV !== 'production'
    ? Array.from(marginKeys).reduce((obj, key) => {
        obj[key] = responsivePropType;
        return obj;
      }, {})
    : {};

margin.filterProps = marginKeys;

export function padding(props) {
  return style(props, paddingKeys);
}

padding.propTypes =
  process.env.NODE_ENV !== 'production'
    ? Array.from(paddingKeys).reduce((obj, key) => {
        obj[key] = responsivePropType;
        return obj;
      }, {})
    : {};

padding.filterProps = paddingKeys;

function spacing(props) {
  return style(props, spacingKeys);
}

spacing.propTypes =
  process.env.NODE_ENV !== 'production'
    ? Array.from(spacingKeys).reduce((obj, key) => {
        obj[key] = responsivePropType;
        return obj;
      }, {})
    : {};

spacing.filterProps = spacingKeys;

export default spacing;
