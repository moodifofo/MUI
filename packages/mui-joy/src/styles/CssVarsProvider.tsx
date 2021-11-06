import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import defaultTheme, { ColorSystems, StaticTheme, ColorScheme } from './defaultTheme';

type PartialDeep<T> = {
  [K in keyof T]?: PartialDeep<T[K]>;
};

export interface ColorSchemeOverrides {}

export type ExtendedColorScheme = OverridableStringUnion<never, ColorSchemeOverrides>;

type JoyThemeInput = PartialDeep<Omit<StaticTheme, 'typography'>> & {
  colorSchemes: Record<ColorScheme, PartialDeep<ColorSystems>>;
  typography?: Partial<StaticTheme['typography']>;
};

type ApplicationThemeInput = PartialDeep<Omit<StaticTheme, 'typography'>> & {
  colorSchemes: Record<ExtendedColorScheme, ColorSystems>;
  typography?: Partial<StaticTheme['typography']>;
};

const { palette, ...rest } = defaultTheme;

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  JoyThemeInput,
  ColorScheme,
  ApplicationThemeInput,
  ExtendedColorScheme
>({
  theme: {
    ...rest,
    colorSchemes: {
      light: {
        palette,
      },
    },
  },
  defaultColorScheme: 'light',
  prefix: 'joy',
  shouldSkipGeneratingVar: (keys) => keys[0] === 'typography',
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
