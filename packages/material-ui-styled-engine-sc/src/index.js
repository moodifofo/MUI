import scStyled from 'styled-components';

export default function styled(tag, options) {
  let stylesFactory;

  if (options) {
    stylesFactory = scStyled(tag).withConfig({
      displayName: options.label,
      shouldForwardProp: options.shouldForwardProp,
    });
  }

  stylesFactory = scStyled(tag);

  if (process.env.NODE_ENV !== 'production') {
    return (...styles) => {
      if (styles.some((style) => style === undefined)) {
        console.error('empty', options.label);
      }
      return stylesFactory(...styles);
    };
  }

  return stylesFactory;
}

export { ThemeContext, keyframes, css } from 'styled-components';
export { default as StyledEngineProvider } from './StyledEngineProvider';
export { default as GlobalStyles } from './GlobalStyles';
