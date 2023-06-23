import { deepmerge } from '@mui/utils';
import {
  BreakpointsOptions,
  SpacingOptions,
  createBreakpoints,
  createSpacing,
  colorChannel,
  unstable_prepareCssVars as prepareCssVars,
  unstable_createGetCssVar as systemCreateGetCssVar,
  unstable_styleFunctionSx as styleFunctionSx,
  SxConfig,
} from '@mui/system';
import defaultSxConfig from './sxConfig';
import colors from '../colors';
import defaultShouldSkipGeneratingVar from './shouldSkipGeneratingVar';
import { DefaultColorScheme, ExtendedColorScheme, SupportedColorScheme } from './types/colorScheme';
import { ColorSystem, ColorPaletteProp, Palette, PaletteOptions } from './types/colorSystem';
import { Focus } from './types/focus';
import { TypographySystemOptions, FontSize } from './types/typography';
import { Variants, ColorInversion, ColorInversionConfig } from './types/variants';
import { Theme, ThemeCssVar, ThemeScalesOptions, SxProps, ThemeVars } from './types';
import { Components } from './components';
import { generateUtilityClass } from '../className';
import { createSoftInversion, createSolidInversion, createVariant } from './variantUtils';
import { MergeDefault } from './types/utils';

type Partial2Level<T> = {
  [K in keyof T]?: T[K] extends Record<any, any>
    ? {
        [J in keyof T[K]]?: T[K][J];
      }
    : T[K];
};

type Partial3Level<T> = {
  [K in keyof T]?: {
    [J in keyof T[K]]?: T[K][J] extends Record<any, any>
      ? {
          [P in keyof T[K][J]]?: T[K][J][P];
        }
      : T[K][J];
  };
};

export type ColorSystemOptions = Partial3Level<
  MergeDefault<ColorSystem, { palette: PaletteOptions }>
> & {
  shadowRing?: string;
  shadowChannel?: string;
  shadowOpacity?: string;
};

// Use Partial2Level instead of PartialDeep because nested value type is CSSObject which does not work with PartialDeep.
export interface CssVarsThemeOptions extends Partial2Level<ThemeScalesOptions> {
  /**
   * Prefix of the generated CSS variables
   * @default 'joy'
   * @example extendTheme({ cssVarPrefix: 'foo-bar' })
   * // { ..., typography: { body1: { fontSize: 'var(--foo-bar-fontSize-md)' } }, ... }
   *
   * @example <caption>Provides empty string ('') to remove the prefix</caption>
   * extendTheme({ cssVarPrefix: '' })
   * // { ..., typography: { body1: { fontSize: 'var(--fontSize-md)' } }, ... }
   */
  cssVarPrefix?: string;
  focus?: Partial<Focus>;
  typography?: Partial<TypographySystemOptions>;
  variants?: Partial2Level<Variants>;
  colorInversion?:
    | Partial2Level<ColorInversion>
    | ((theme: Theme) => Partial2Level<ColorInversion>);
  colorInversionConfig?: ColorInversionConfig;
  breakpoints?: BreakpointsOptions;
  spacing?: SpacingOptions;
  components?: Components<Theme>;
  colorSchemes?: Partial<Record<DefaultColorScheme | ExtendedColorScheme, ColorSystemOptions>>;
  unstable_sxConfig?: SxConfig;
  /**
   * A function to determine if the key, value should be attached as CSS Variable
   * `keys` is an array that represents the object path keys.
   *  Ex, if the theme is { foo: { bar: 'var(--test)' } }
   *  then, keys = ['foo', 'bar']
   *        value = 'var(--test)'
   */
  shouldSkipGeneratingVar?: (keys: string[], value: string | number) => boolean;
}

export const createGetCssVar = (cssVarPrefix = 'joy') =>
  systemCreateGetCssVar<ThemeCssVar>(cssVarPrefix);

export default function extendTheme(themeOptions?: CssVarsThemeOptions): Theme {
  const {
    cssVarPrefix = 'joy',
    breakpoints,
    spacing,
    components: componentsInput,
    variants: variantsInput,
    colorInversion: colorInversionInput,
    shouldSkipGeneratingVar = defaultShouldSkipGeneratingVar,
    ...scalesInput
  } = themeOptions || {};
  const getCssVar = createGetCssVar(cssVarPrefix);

  const defaultColors = {
    primary: colors.blue,
    neutral: colors.grey,
    danger: colors.red,
    success: colors.green,
    warning: colors.yellow,
    common: {
      white: '#fff',
      black: '#000',
    },
  };

  const getCssVarColor = (cssVar: string) => {
    const tokens = cssVar.split('-');
    const color = tokens[1];
    const index = tokens[2];

    // @ts-ignore
    return getCssVar(cssVar, defaultColors[color]?.[index]);
  };

  const createLightModeVariantVariables = (color: ColorPaletteProp) => ({
    plainColor: getCssVarColor(`palette-${color}-500`),
    plainIcon: getCssVarColor(`palette-${color}-400`),
    plainHoverBg: getCssVarColor(`palette-${color}-50`),
    plainHoverIcon: getCssVarColor(`palette-${color}-500`),
    plainActiveBg: getCssVarColor(`palette-${color}-100`),
    plainDisabledColor: getCssVarColor(`palette-neutral-400`),

    outlinedColor: getCssVarColor(`palette-${color}-500`),
    outlinedBorder: getCssVarColor(`palette-${color}-300`),
    outlinedIcon: getCssVarColor(`palette-${color}-400`),
    outlinedHoverBg: getCssVarColor(`palette-${color}-100`),
    outlinedHoverBorder: getCssVarColor(`palette-${color}-300`),
    outlinedActiveColor: getCssVarColor(`palette-${color}-700`),
    outlinedActiveBg: getCssVarColor(`palette-${color}-200`),
    outlinedHoverIcon: getCssVarColor(`palette-${color}-500`),
    outlinedActiveBorder: getCssVarColor(`palette-${color}-300`),
    outlinedDisabledColor: getCssVarColor(`palette-neutral-400`),
    outlinedDisabledBorder: getCssVarColor(`palette-neutral-200`),
    
    softColor: getCssVarColor(`palette-${color}-500`),
    softBg: `rgba(${getCssVar('palette-neutral', colorChannel(defaultColors.neutral[500]),)} / 0.1)`,
    softHoverBg: `rgba(${getCssVar('palette-neutral', colorChannel(defaultColors.neutral[500]),)} / 0.20)`,
    softActiveColor: getCssVarColor(`palette-common-white`),
    softActiveBg: getCssVarColor(`palette-${color}-500`),
    softDisabledColor: getCssVarColor(`palette-neutral-400`),
    softDisabledBg: getCssVarColor(`palette-neutral-200`),

    solidColor: getCssVarColor(`palette-common-white`),
    solidBg: getCssVarColor(`palette-${color}-500`),
    solidHoverBg: getCssVarColor(`palette-${color}-400`),
    solidActiveBg: getCssVarColor(`palette-${color}-600`),
    solidDisabledColor: getCssVarColor(`palette-neutral-400`),
    solidDisabledBg: getCssVarColor(`palette-neutral-200`),
  });

  const createDarkModeVariantVariables = (color: ColorPaletteProp) => ({
    plainColor: getCssVarColor(`palette-${color}-300`),
    plainIcon: getCssVarColor(`palette-${color}-300`),
    plainHoverBg: getCssVarColor(`palette-${color}-800`),
    plainHoverIcon: getCssVarColor(`palette-${color}-300`),
    plainActiveBg: getCssVarColor(`palette-${color}-900`),
    plainActiveIcon: getCssVarColor(`palette-${color}-300`),
    plainDisabledColor: getCssVarColor(`palette-neutral-400`),
    plainDisabledIcon: getCssVarColor(`palette-neutral-500`),

    outlinedColor: getCssVarColor(`palette-${color}-200`),
    outlinedBorder: getCssVarColor(`palette-${color}-700`),
    outlinedIcon: getCssVarColor(`palette-${color}-300`),
    outlinedHoverBg: getCssVarColor(`palette-${color}-800`),
    outlinedHoverBorder: getCssVarColor(`palette-${color}-700`),
    outlinedHoverIcon: getCssVarColor(`palette-${color}-300`),
    outlinedActiveColor: getCssVarColor(`palette-${color}-300`),
    outlinedActiveBg: getCssVarColor(`palette-${color}-900`),
    outlinedActiveBorder: getCssVarColor(`palette-${color}-700`),
    outlinedActiveIcon: getCssVarColor(`palette-${color}-300`),
    outlinedDisabledColor: getCssVarColor(`palette-neutral-400`),
    outlinedDisabledBorder: getCssVarColor(`palette-neutral-800`),
    outlinedDisabledIcon: getCssVarColor(`palette-neutral-500`),

    softColor: getCssVarColor(`palette-${color}-200`),
    softBg: getCssVarColor(`palette-${color}-800`),
    softIcon: getCssVarColor(`palette-${color}-200`),
    softHoverBg: getCssVarColor(`palette-${color}-700`),
    softHoverIcon: getCssVarColor(`palette-${color}-200`),
    softActiveColor: getCssVarColor(`palette-${color}-100`),
    softActiveBg: getCssVarColor(`palette-${color}-600`),
    softActiveIcon: getCssVarColor(`palette-${color}-300`),
    softDisabledColor: getCssVarColor(`palette-neutral-400`),
    softDisabledBg: getCssVarColor(`palette-${color}-900`),
    softDisabledIcon: getCssVarColor(`palette-neutral-500`),

    solidColor: getCssVarColor(`palette-common-white`),
    solidBg: getCssVarColor(`palette-${color}-600`),
    solidIcon: getCssVarColor(`palette-${color}-200`),
    solidHoverBg: getCssVarColor(`palette-${color}-700`),
    solidActiveBg: getCssVarColor(`palette-${color}-800`),
    solidActiveIcon: getCssVarColor(`palette-${color}-200`),
    solidDisabledColor: getCssVarColor(`palette-neutral-400`),
    solidDisabledBg: getCssVarColor(`palette-${color}-900`),
    solidDisabledIcon: getCssVarColor(`palette-neutral-500`),
  });

  const lightColorSystem = {
    palette: {
      mode: 'light',

      primary: {
        ...defaultColors.primary,
        ...createLightModeVariantVariables('primary'),

        softColor: getCssVarColor(`palette-primary-500`),
        softBg: `rgba(${getCssVar('palette-primary',colorChannel(defaultColors.primary[500]),)} / 0.15)`,
        softHoverBg: `rgba(${getCssVar('palette-primary',colorChannel(defaultColors.primary[500]),)} / 0.20)`,
        softActiveColor: getCssVarColor(`palette-common-white`),
        softActiveBg: getCssVarColor(`palette-primary-500`),

        
      },

      neutral: {
        ...defaultColors.neutral,
        ...createLightModeVariantVariables('neutral'),
        softColor: getCssVarColor(`palette-primary-500`),
      },

      danger: {
        ...defaultColors.danger,
        ...createLightModeVariantVariables('danger'),
        softColor: getCssVarColor(`palette-danger-500`),
      },

      success: {
        ...defaultColors.success,
        ...createLightModeVariantVariables('success'),
        softColor: getCssVarColor(`palette-success-500`),
      },

      warning: {
        ...defaultColors.warning,
        ...createLightModeVariantVariables('warning'),
        solidColor: getCssVarColor(`palette-common-black`),
        softColor: getCssVarColor(`palette-warning-700`),
        softActiveColor: getCssVarColor(`palette-common-black`),
      },

      common: {
        white: '#fff',
        black: '#000',
      },

      text: {
        primary: getCssVarColor('palette-neutral-800'),
        secondary: getCssVarColor('palette-neutral-700'),
        tertiary: getCssVarColor('palette-neutral-600'),
      },

      background: {
        body: getCssVarColor('palette-common-white'),
        surface: `rgba(${getCssVar('palette-neutral',colorChannel(defaultColors.neutral[50]),)} / 0.8)`, //Is there a way to add background blur?
        popup: getCssVarColor('palette-neutral-50'),
        level1: `rgba(${getCssVar('palette-neutral',colorChannel(defaultColors.common.white),)} / 0.8)`,
        level2: getCssVarColor('palette-neutral-50'),
        level3: getCssVarColor('palette-neutral-100'),
        tooltip: getCssVarColor('palette-neutral-800'),
        backdrop: `rgba(${getCssVar(
          'palette-neutral-darkChannel',
          colorChannel(defaultColors.neutral[900]), // should be the same index as in `attachColorChannels`
        )} / 0.25)`,
      },
      divider: `rgba(${getCssVar(
        'palette-neutral-mainChannel',
        colorChannel(defaultColors.neutral[500]), // should be the same index as in `attachColorChannels`
      )} / 0.3)`,
      focusVisible: getCssVarColor('palette-primary-500'),
    },
    shadowRing: '0 0 #000',
    shadowChannel: '187 187 187',
    shadowOpacity: '0.2',
  };
  const darkColorSystem = {
    palette: {
      mode: 'dark',
      primary: {
        ...defaultColors.primary,
        ...createDarkModeVariantVariables('primary'),
        softBg: `rgba(${getCssVar('palette-danger',colorChannel(defaultColors.neutral[900]),)} / 0.8)`,
      },
      neutral: {
        ...defaultColors.neutral,
        ...createDarkModeVariantVariables('neutral'),
      },
      danger: {
        ...defaultColors.danger,
        ...createDarkModeVariantVariables('danger'),
      },
      success: {
        ...defaultColors.success,
        ...createDarkModeVariantVariables('success'),
      },
      warning: {
        ...defaultColors.warning,
        ...createDarkModeVariantVariables('warning'),
      },
      common: {
        white: '#fff',
        black: '#000',
      },
      text: {
        primary: getCssVarColor('palette-neutral-50'),
        secondary: getCssVarColor('palette-neutral-200'),
        tertiary: getCssVarColor('palette-neutral-300'),
      },
      background: {
        body: getCssVarColor('palette-common-black'),
        surface: `rgba(${getCssVar('palette-neutral',colorChannel(defaultColors.neutral[900]),)} / 0.8)`,
        popup: getCssVarColor('palette-neutral-900'),
        level1: `rgba(${getCssVar('palette-neutral',colorChannel(defaultColors.neutral[900]),)} / 0.8)`,
        level2: getCssVarColor('palette-neutral-900'),
        level3: getCssVarColor('palette-neutral-800'),
        tooltip: getCssVarColor('palette-neutral-600'),
        backdrop: `rgba(${getCssVar(
          'palette-neutral-darkChannel',
          colorChannel(defaultColors.neutral[500]), // should be the same index as in `attachColorChannels`
        )} / 0.25)`,
      },
      divider: `rgba(${getCssVar(
        'palette-neutral-mainChannel',
        colorChannel(defaultColors.neutral[500]), // should be the same index as in `attachColorChannels`
      )} / 0.15)`,
      focusVisible: getCssVarColor('palette-primary-500'),
    },
    shadowRing: '0 0 #000',
    shadowChannel: '0 0 0',
    shadowOpacity: '0.6',
  };

  const fontFamilyFallback =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  const fontFamily = {
    body: `"Open Sans", ${getCssVar('fontFamily-fallback', fontFamilyFallback)}`,
    display: `"Open Sans", ${getCssVar('fontFamily-fallback', fontFamilyFallback)}`,
    code: 'Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
    fallback: fontFamilyFallback,
    ...scalesInput.fontFamily,
  };

  const fontWeight = {
    sm: 400, // regular
    md: 500, // medium
    lg: 600, // semi bold
    xl: 700, // bold
    ...scalesInput.fontWeight,
  };

  const fontSize = {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.2rem', // 20px
    xl: '1.3rem', // 24px
    xl2: '1.7rem', // 32px
    xl3: '2rem', // 40px
    xl4: '2.25rem', // 56px
    xl5: '3rem', // 64px

    ...scalesInput.fontSize,
  };

  const lineHeight = {
    xs: '1.33334', // largest font sizes: h1, h2
    sm: '1.42858', // normal font sizes
    md: '1.5', // normal font sizes
    lg: '1.55556', // large font sizes for components
    xl: '1.66667', // smallest font sizes
    ...scalesInput.lineHeight,
  };

  const defaultShadowRing =
    scalesInput.colorSchemes?.light?.shadowRing ?? lightColorSystem.shadowRing;
  const defaultShadowChannel =
    scalesInput.colorSchemes?.light?.shadowChannel ?? lightColorSystem.shadowChannel;
  const defaultShadowOpacity =
    scalesInput.colorSchemes?.light?.shadowOpacity ?? lightColorSystem.shadowOpacity;
  const defaultScales = {
    colorSchemes: {
      light: lightColorSystem,
      dark: darkColorSystem,
    },
    fontSize,
    fontFamily,
    fontWeight,
    focus: {
      thickness: '2px',
      selector: `&.${generateUtilityClass('', 'focusVisible')}, &:focus-visible`,
      default: {
        outlineOffset: `var(--focus-outline-offset, ${getCssVar(
          'focus-thickness',
          scalesInput.focus?.thickness ?? '2px',
        )})`,
        outline: `${getCssVar(
          'focus-thickness',
          scalesInput.focus?.thickness ?? '2px',
        )} solid ${getCssVar('palette-focusVisible', defaultColors.primary[500])}`,
      },
    },
    lineHeight,
    radius: {
      xs: '8px',
      sm: '12px',
      md: '16px',
      lg: '32px',
      xl: '40px',
    },

    shadow: {
      xs: `${getCssVar('shadowRing', defaultShadowRing)}, 0px 1px 2px 0px rgba(${getCssVar(
        'shadowChannel',
        defaultShadowChannel,
      )} / ${getCssVar('shadowOpacity', defaultShadowOpacity)})`,

      sm: `${getCssVar('shadowRing', defaultShadowRing)}, 0px 1px 2px 0px rgba(${getCssVar(
        'shadowChannel',
        defaultShadowChannel,
      )} / ${getCssVar('shadowOpacity', defaultShadowOpacity)}), 0px 2px 4px 0px rgba(${getCssVar(
        'shadowChannel',
        defaultShadowChannel,
      )} / ${getCssVar('shadowOpacity', defaultShadowOpacity)})`,

      md: `${getCssVar('shadowRing', defaultShadowRing)}, 0px 2px 8px -2px rgba(${getCssVar(
        'shadowChannel',
        defaultShadowChannel,
      )} / ${getCssVar('shadowOpacity', defaultShadowOpacity)}), 0px 6px 12px -2px rgba(${getCssVar(
        'shadowChannel',
        defaultShadowChannel,
      )} / ${getCssVar('shadowOpacity', defaultShadowOpacity)})`,

      lg: `${getCssVar('shadowRing', defaultShadowRing)}, 0px 2px 8px -2px rgba(${getCssVar(
        'shadowChannel',
        defaultShadowChannel,
      )} / ${getCssVar(
        'shadowOpacity',
        defaultShadowOpacity,
      )}), 0px 12px 16px -4px rgba(${getCssVar(
        'shadowChannel',
        defaultShadowChannel,
      )} / ${getCssVar('shadowOpacity', defaultShadowOpacity)})`,

      xl: `${getCssVar('shadowRing', defaultShadowRing)}, 0px 2px 8px -2px rgba(${getCssVar(
        'shadowChannel',
        defaultShadowChannel,
      )} / ${getCssVar(
        'shadowOpacity',
        defaultShadowOpacity,
      )}), 0px 20px 24px -4px rgba(${getCssVar(
        'shadowChannel',
        defaultShadowChannel,
      )} / ${getCssVar('shadowOpacity', defaultShadowOpacity)})`,
    },

    zIndex: {
      badge: 1,
      table: 10,
      popup: 1000,
      modal: 1300,
      tooltip: 1500,
    },

    typography: {
      h1: {
        fontFamily: getCssVar('fontFamily-display', fontFamily.display),
        fontWeight: getCssVar('fontWeight-sm', fontWeight.sm.toString()),
        fontSize: getCssVar('fontSize-xl5', fontSize.xl5),
        lineHeight: getCssVar('lineHeight-sm', lineHeight.sm.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },

      h2: {
        fontFamily: getCssVar('fontFamily-display', fontFamily.display),
        fontWeight: getCssVar('fontWeight-xl', fontWeight.xl.toString()),
        fontSize: getCssVar('fontSize-xl3', fontSize.xl3),
        lineHeight: getCssVar('lineHeight-xs', lineHeight.xs.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },

      h3: {
        fontFamily: getCssVar('fontFamily-display', fontFamily.display),
        fontWeight: getCssVar('fontWeight-sm', fontWeight.sm.toString()),
        fontSize: getCssVar('fontSize-xl2', fontSize.xl2),
        lineHeight: getCssVar('lineHeight-md', lineHeight.md.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },

      h4: {
        fontFamily: getCssVar('fontFamily-display', fontFamily.display),
        fontWeight: getCssVar('fontWeight-lg', fontWeight.lg.toString()),
        fontSize: getCssVar('fontSize-xl', fontSize.xl),
        lineHeight: getCssVar('lineHeight-lg', lineHeight.lg.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },

      'title-lg': {
        fontFamily: getCssVar('fontFamily-display', fontFamily.display),
        fontWeight: getCssVar('fontWeight-lg', fontWeight.lg.toString()),
        fontSize: getCssVar('fontSize-lg', fontSize.lg),
        lineHeight: getCssVar('lineHeight-xl', lineHeight.xl.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },

      'title-md': {
        fontFamily: getCssVar('fontFamily-display', fontFamily.display),
        fontWeight: getCssVar('fontWeight-md', fontWeight.md.toString()),
        fontSize: getCssVar('fontSize-md', fontSize.md),
        lineHeight: getCssVar('lineHeight-md', lineHeight.md.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },

      'title-sm': {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontWeight: getCssVar('fontWeight-sm', fontWeight.sm.toString()),
        fontSize: getCssVar('fontSize-xl', fontSize.xl),
        lineHeight: getCssVar('lineHeight-md', lineHeight.md.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },
      'title-xs': {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontWeight: getCssVar('fontWeight-sm', fontWeight.sm.toString()),
        fontSize: getCssVar('fontSize-lg', fontSize.lg),
        lineHeight: getCssVar('lineHeight-md', lineHeight.md.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },
      'body-lg': {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontWeight: getCssVar('fontWeight-sm', fontWeight.sm.toString()),
        fontSize: getCssVar('fontSize-md', fontSize.md),
        lineHeight: getCssVar('lineHeight-lg', lineHeight.lg.toString()),
        color: getCssVar('palette-text-primary', lightColorSystem.palette.text.primary),
      },

      'body-md': {
        fontFamily: getCssVar('fontFamily-display', fontFamily.display),
        fontWeight: getCssVar('fontWeight-sm', fontWeight.sm.toString()),
        fontSize: getCssVar('fontSize-md', fontSize.md),
        lineHeight: getCssVar('lineHeight-sm', lineHeight.sm.toString()),
        color: getCssVar('palette-text-secondary', lightColorSystem.palette.text.secondary),
      },

      'body-sm': {
        fontFamily: getCssVar('fontFamily-body', fontFamily.body),
        fontWeight: getCssVar('fontWeight-sm', fontWeight.sm.toString()),
        fontSize: getCssVar('fontSize-xs', fontSize.xs),
        lineHeight: getCssVar('lineHeight-xl', lineHeight.xl.toString()),
        color: getCssVar('palette-text-tertiary', lightColorSystem.palette.text.tertiary),
      },
    },
  };

  const { colorSchemes, ...mergedScales } = scalesInput
    ? deepmerge(defaultScales, scalesInput)
    : defaultScales;

  const theme = {
    colorSchemes,
    ...mergedScales,
    breakpoints: createBreakpoints(breakpoints ?? {}),
    components: deepmerge(
      {
        // TODO: find a way to abstract SvgIcon out of @mui/material
        MuiSvgIcon: {
          defaultProps: {
            fontSize: 'xl2',
          },
          styleOverrides: {
            root: ({ ownerState, theme: themeProp }) => {
              const instanceFontSize = ownerState.instanceFontSize as 'inherit' | keyof FontSize;
              return {
                color: 'var(--Icon-color)',
                margin: 'var(--Icon-margin)',
                ...(ownerState.fontSize &&
                  ownerState.fontSize !== 'inherit' && {
                    fontSize: `var(--Icon-fontSize, ${
                      themeProp.vars.fontSize[ownerState.fontSize]
                    })`,
                  }),
                ...(ownerState.color &&
                  ownerState.color !== 'inherit' &&
                  ownerState.color !== 'context' &&
                  themeProp.vars.palette[ownerState.color!] && {
                    color: `rgba(${themeProp.vars.palette[ownerState.color]?.mainChannel} / 1)`,
                  }),
                ...(ownerState.color === 'context' && {
                  color: themeProp.vars.palette.text.secondary,
                }),
                ...(instanceFontSize &&
                  instanceFontSize !== 'inherit' && {
                    '--Icon-fontSize': themeProp.vars.fontSize[instanceFontSize],
                  }),
              };
            },
          },
        },
      } as Components<Theme>,
      componentsInput,
    ),
    cssVarPrefix,
    getCssVar,
    spacing: createSpacing(spacing),
    colorInversionConfig: {
      soft: ['plain', 'outlined', 'soft', 'solid'],
      solid: ['plain', 'outlined', 'soft', 'solid'],
    },
  } as unknown as Theme; // Need type casting due to module augmentation inside the repo

  /**
   Color channels generation
  */
  function attachColorChannels(
    supportedColorScheme: SupportedColorScheme,
    palette: Pick<Palette, ColorPaletteProp>,
  ) {
    (Object.keys(palette) as Array<ColorPaletteProp>).forEach((key) => {
      const channelMapping = {
        main: '500',
        light: '200',
        dark: '800',
      } as const;
      if (supportedColorScheme === 'dark') {
        // @ts-ignore internal
        channelMapping.main = 400;
      }
      if (!palette[key].mainChannel && palette[key][channelMapping.main]) {
        palette[key].mainChannel = colorChannel(palette[key][channelMapping.main]);
      }
      if (!palette[key].lightChannel && palette[key][channelMapping.light]) {
        palette[key].lightChannel = colorChannel(palette[key][channelMapping.light]);
      }
      if (!palette[key].darkChannel && palette[key][channelMapping.dark]) {
        palette[key].darkChannel = colorChannel(palette[key][channelMapping.dark]);
      }
    });
  }
  // Set the channels
  (
    Object.entries(theme.colorSchemes) as Array<
      [SupportedColorScheme, { palette: Pick<Palette, ColorPaletteProp> }]
    >
  ).forEach(([supportedColorScheme, colorSystem]) => {
    attachColorChannels(supportedColorScheme, colorSystem.palette);
  });

  // ===============================================================
  // Create `theme.vars` that contain `var(--*)` as values
  // ===============================================================
  const parserConfig = {
    prefix: cssVarPrefix,
    shouldSkipGeneratingVar,
  };

  const { vars: themeVars, generateCssVars } = prepareCssVars<Theme, ThemeVars>(
    // @ts-ignore property truDark is missing from colorSchemes
    { colorSchemes, ...mergedScales },
    parserConfig,
  );
  theme.vars = themeVars;
  theme.generateCssVars = generateCssVars;
  theme.unstable_sxConfig = {
    ...defaultSxConfig,
    ...themeOptions?.unstable_sxConfig,
  };
  theme.unstable_sx = function sx(props: SxProps) {
    return styleFunctionSx({
      sx: props,
      theme: this,
    });
  };
  theme.getColorSchemeSelector = (colorScheme: SupportedColorScheme) =>
    colorScheme === 'light'
      ? '&'
      : `&[data-joy-color-scheme="${colorScheme}"], [data-joy-color-scheme="${colorScheme}"] &`;

  const createVariantInput = { getCssVar, palette: theme.colorSchemes.light.palette };
  theme.variants = deepmerge(
    {
      plain: createVariant('plain', createVariantInput),
      plainHover: createVariant('plainHover', createVariantInput),
      plainActive: createVariant('plainActive', createVariantInput),
      plainDisabled: createVariant('plainDisabled', createVariantInput),
      outlined: createVariant('outlined', createVariantInput),
      outlinedHover: createVariant('outlinedHover', createVariantInput),
      outlinedActive: createVariant('outlinedActive', createVariantInput),
      outlinedDisabled: createVariant('outlinedDisabled', createVariantInput),
      soft: createVariant('soft', createVariantInput),
      softHover: createVariant('softHover', createVariantInput),
      softActive: createVariant('softActive', createVariantInput),
      softDisabled: createVariant('softDisabled', createVariantInput),
      solid: createVariant('solid', createVariantInput),
      solidHover: createVariant('solidHover', createVariantInput),
      solidActive: createVariant('solidActive', createVariantInput),
      solidDisabled: createVariant('solidDisabled', createVariantInput),
    },
    variantsInput,
  );

  theme.palette = {
    ...theme.colorSchemes.light.palette,
    colorScheme: 'light',
  };

  theme.shouldSkipGeneratingVar = shouldSkipGeneratingVar;

  // @ts-ignore if the colorInversion is provided as callbacks, it needs to be resolved in the CssVarsProvider
  theme.colorInversion =
    typeof colorInversionInput === 'function'
      ? colorInversionInput
      : deepmerge(
          {
            soft: createSoftInversion(theme, true),
            solid: createSolidInversion(theme, true),
          },
          colorInversionInput || {},
          { clone: false },
        );

  return theme;
}
