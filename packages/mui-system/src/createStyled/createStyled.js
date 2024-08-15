/* eslint-disable no-underscore-dangle */
import styledEngineStyled, { internal_processStyles as processStyles } from '@mui/styled-engine';
import { isPlainObject } from '@mui/utils/deepmerge';
import capitalize from '@mui/utils/capitalize';
import getDisplayName from '@mui/utils/getDisplayName';
import createTheme from '../createTheme';
import styleFunctionSx from '../styleFunctionSx';

export const systemDefaultTheme = createTheme();

// Update /system/styled/#api in case if this changes
export function shouldForwardProp(prop) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}

function resolveTheme(themeId, theme, defaultTheme) {
  return isObjectEmpty(theme) ? defaultTheme : theme[themeId] || theme;
}

function defaultOverridesResolver(slot) {
  if (!slot) {
    return null;
  }
  return (_props, styles) => styles[slot];
}

function processStyleArg(callableStyle, props) {
  const resolvedStylesArg =
    typeof callableStyle === 'function' ? callableStyle(props) : callableStyle;

  if (Array.isArray(resolvedStylesArg)) {
    return resolvedStylesArg.flatMap((style) => processStyleArg(style, props));
  }

  if (Array.isArray(resolvedStylesArg?.variants)) {
    const { variants, ...otherStyles } = resolvedStylesArg;

    let result = otherStyles;
    let mergedState; // We might not need it, initalized lazily

    variantLoop: for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];

      if (typeof variant.props === 'function') {
        mergedState ??= { ...props, ...props.ownerState, ownerState: props.ownerState };
        if (!variant.props(mergedState)) {
          continue;
        }
      } else {
        for (const key in variant.props) {
          if (props[key] !== variant.props[key] && props.ownerState?.[key] !== variant.props[key]) {
            continue variantLoop;
          }
        }
      }

      if (!Array.isArray(result)) {
        result = [result];
      }
      let style;
      if (typeof variant.style === 'function') {
        mergedState ??= { ...props, ...props.ownerState, ownerState: props.ownerState };
        style = variant.style(mergedState);
      } else {
        style = variant.style;
      }
      result.push(style);
    }

    return result;
  }

  return resolvedStylesArg;
}

export default function createStyled(input = {}) {
  const {
    themeId,
    defaultTheme = systemDefaultTheme,
    rootShouldForwardProp = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp,
  } = input;

  const systemSx = (props) => {
    return styleFunctionSx({ ...props, theme: resolveTheme(themeId, props.theme, defaultTheme) });
  };
  systemSx.__mui_systemSx = true;

  return (tag, inputOptions = {}) => {
    // Filter out the `sx` style function from the previous styled component to prevent unnecessary styles generated by the composite components.
    processStyles(tag, (styles) => styles.filter((style) => !style?.__mui_systemSx));

    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver = defaultOverridesResolver(lowercaseFirstLetter(componentSlot)),
      ...options
    } = inputOptions;

    // if skipVariantsResolver option is defined, take the value, otherwise, true for root and false for other slots.
    const skipVariantsResolver =
      inputSkipVariantsResolver !== undefined
        ? inputSkipVariantsResolver
        : // TODO v6: remove `Root` in the next major release
          // For more details: https://github.com/mui/material-ui/pull/37908
          (componentSlot && componentSlot !== 'Root' && componentSlot !== 'root') || false;

    const skipSx = inputSkipSx || false;

    let label;

    if (process.env.NODE_ENV !== 'production') {
      if (componentName) {
        // TODO v6: remove `lowercaseFirstLetter()` in the next major release
        // For more details: https://github.com/mui/material-ui/pull/37908
        label = `${componentName}-${lowercaseFirstLetter(componentSlot || 'Root')}`;
      }
    }

    let shouldForwardPropOption = shouldForwardProp;

    // TODO v6: remove `Root` in the next major release
    // For more details: https://github.com/mui/material-ui/pull/37908
    if (componentSlot === 'Root' || componentSlot === 'root') {
      shouldForwardPropOption = rootShouldForwardProp;
    } else if (componentSlot) {
      // any other slot specified
      shouldForwardPropOption = slotShouldForwardProp;
    } else if (isStringTag(tag)) {
      // for string (html) tag, preserve the behavior in emotion & styled-components.
      shouldForwardPropOption = undefined;
    }

    const defaultStyledResolver = styledEngineStyled(tag, {
      shouldForwardProp: shouldForwardPropOption,
      label,
      ...options,
    });

    const transformStyleArg = (stylesArg) => {
      // On the server Emotion doesn't use React.forwardRef for creating components, so the created
      // component stays as a function. This condition makes sure that we do not interpolate functions
      // which are basically components used as a selectors.
      if (
        (typeof stylesArg === 'function' && stylesArg.__emotion_real !== stylesArg) ||
        isPlainObject(stylesArg)
      ) {
        return (props) =>
          processStyleArg(stylesArg, {
            ...props,
            theme: resolveTheme(themeId, props.theme, defaultTheme),
          });
      }
      return stylesArg;
    };

    const muiStyledResolver = (styleArg, ...expressions) => {
      let transformedStyleArg = transformStyleArg(styleArg);
      const expressionsWithDefaultTheme = expressions ? expressions.map(transformStyleArg) : [];

      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = resolveTheme(themeId, props.theme, defaultTheme);
          if (
            !theme.components ||
            !theme.components[componentName] ||
            !theme.components[componentName].styleOverrides
          ) {
            return null;
          }

          const styleOverrides = theme.components[componentName].styleOverrides;
          const resolvedStyleOverrides = {};
          const propsWithTheme = { ...props, theme };

          // TODO: v7 remove iteration and use `resolveStyleArg(styleOverrides[slot])` directly
          for (const slotKey in styleOverrides) {
            if (styleOverrides.hasOwnProperty(slotKey)) {
              resolvedStyleOverrides[slotKey] = processStyleArg(
                styleOverrides[slotKey],
                propsWithTheme,
              );
            }
          }

          return overridesResolver(props, resolvedStyleOverrides);
        });
      }

      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = resolveTheme(themeId, props.theme, defaultTheme);
          const themeVariants = theme?.components?.[componentName]?.variants;
          return processStyleArg({ variants: themeVariants }, { ...props, theme });
        });
      }

      if (!skipSx) {
        expressionsWithDefaultTheme.push(systemSx);
      }

      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;

      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill('');
        // If the type is array, than we need to add placeholders in the template for the overrides, variants and the sx styles.
        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      }
      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);

      if (process.env.NODE_ENV !== 'production') {
        let displayName;
        if (componentName) {
          displayName = `${componentName}${capitalize(componentSlot || '')}`;
        }
        if (displayName === undefined) {
          displayName = `Styled(${getDisplayName(tag)})`;
        }
        Component.displayName = displayName;
      }

      if (tag.muiName) {
        Component.muiName = tag.muiName;
      }

      return Component;
    };

    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }

    return muiStyledResolver;
  };
}

function isObjectEmpty(obj) {
  for (const _ in obj) {
    return false;
  }
  return true;
}

// https://github.com/emotion-js/emotion/blob/26ded6109fcd8ca9875cc2ce4564fee678a3f3c5/packages/styled/src/utils.js#L40
function isStringTag(tag) {
  return (
    typeof tag === 'string' &&
    // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    tag.charCodeAt(0) > 96
  );
}

function lowercaseFirstLetter(string) {
  if (!string) {
    return string;
  }
  return string.charAt(0).toLowerCase() + string.slice(1);
}
