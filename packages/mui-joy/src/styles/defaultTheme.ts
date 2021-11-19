import * as React from 'react';
import colors from '../colors';
import { ColorSystems, Palette, PaletteLetter, PaletteRange, PaletteSurface } from './ColorSystem';
import { Variant, DefaultVariantKey } from './Variant';
import {
  createLightModeVariantVariables,
  createDarkModeVariantVariables,
  createVariant,
  getTextDefaultVariant,
  getTextHoverVariant,
  getTextActiveVariant,
  getTextDisabledVariant,
  getOutlinedDefaultVariant,
  getOutlinedHoverVariant,
  getOutlinedActiveVariant,
  getOutlinedDisabledVariant,
  getFilledDefaultVariant,
  getFilledHoverVariant,
  getFilledActiveVariant,
  getFilledDisabledVariant,
  getContainedDefaultVariant,
  getContainedHoverVariant,
  getContainedActiveVariant,
  getContainedDisabledVariant,
  getContainedOverrides,
} from './variantUtils';

/**
 * ====================================================
 * Developer facing types, they can augment these types.
 * ====================================================
 */

export interface BorderRadius {
  default: React.CSSProperties['borderRadius'];
  xs: React.CSSProperties['borderRadius'];
  sm: React.CSSProperties['borderRadius'];
  md: React.CSSProperties['borderRadius'];
  lg: React.CSSProperties['borderRadius'];
  xl: React.CSSProperties['borderRadius'];
}

export interface Elevation {
  xs: React.CSSProperties['borderRadius'];
  sm: React.CSSProperties['borderRadius'];
  md: React.CSSProperties['borderRadius'];
  lg: React.CSSProperties['borderRadius'];
  xl: React.CSSProperties['borderRadius'];
}

export interface Focus {
  default: React.CSSProperties;
}

export interface FontSize {
  default: React.CSSProperties['fontSize'];
  xs: React.CSSProperties['fontSize'];
  sm: React.CSSProperties['fontSize'];
  md: React.CSSProperties['fontSize'];
  lg: React.CSSProperties['fontSize'];
  xl: React.CSSProperties['fontSize'];
  xl2: React.CSSProperties['fontSize'];
  xl3: React.CSSProperties['fontSize'];
  xl4: React.CSSProperties['fontSize'];
  xl5: React.CSSProperties['fontSize'];
  xl6: React.CSSProperties['fontSize'];
}

export interface FontFamily {
  default: React.CSSProperties['fontFamily'];
  display: React.CSSProperties['fontFamily'];
  code: React.CSSProperties['fontFamily'];
  fallback: React.CSSProperties['fontFamily'];
}

export interface FontWeight {
  // add string to support css variable value.
  default: React.CSSProperties['fontWeight'] | string;
  xs: React.CSSProperties['fontWeight'] | string;
  sm: React.CSSProperties['fontWeight'] | string;
  md: React.CSSProperties['fontWeight'] | string;
  lg: React.CSSProperties['fontWeight'] | string;
}

export interface LineHeight {
  default: React.CSSProperties['lineHeight'];
  xs: React.CSSProperties['lineHeight'];
  sm: React.CSSProperties['lineHeight'];
  md: React.CSSProperties['lineHeight'];
  lg: React.CSSProperties['lineHeight'];
}

export interface LetterSpacing {
  default: React.CSSProperties['letterSpacing'];
  sm: React.CSSProperties['letterSpacing'];
  md: React.CSSProperties['letterSpacing'];
  lg: React.CSSProperties['letterSpacing'];
}

export interface TypographySystems {
  h1: React.CSSProperties;
  h2: React.CSSProperties;
  h3: React.CSSProperties;
  h4: React.CSSProperties;
  h5: React.CSSProperties;
  headingSubtitle: React.CSSProperties;
  body: React.CSSProperties;
  caption: React.CSSProperties;
  detail: React.CSSProperties;
  headingIntro: React.CSSProperties;
  overline: React.CSSProperties;
  button: React.CSSProperties;
}

// ---------------------------------------------------------------

export interface StaticTheme {
  borderRadius: BorderRadius;
  elevation: Elevation;
  focus: Focus;
  htmlFontSize: React.CSSProperties['fontSize'];
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
  typography: TypographySystems;
  variant: Variant;
}

export interface ThemeWithoutVars extends StaticTheme, ColorSystems {}

/**
 * ==============================================
 * Internal type for definfing default Joy theme.
 * ==============================================
 */
type BasePaletteRange =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 'textColor'
  | 'textHoverBg'
  | 'textActiveBg'
  | 'textDisabledColor'
  | 'outlinedColor'
  | 'outlinedBorder'
  | 'outlinedHoverBg'
  | 'outlinedHoverBorder'
  | 'outlinedActiveBg'
  | 'outlinedDisabledColor'
  | 'outlinedDisabledBorder'
  | 'filledColor'
  | 'filledBg'
  | 'filledHoverBg'
  | 'filledActiveBg'
  | 'filledDisabledColor'
  | 'filledDisabledBg'
  | 'containedColor'
  | 'containedBg'
  | 'containedHoverBg'
  | 'containedActiveBg'
  | 'containedDisabledBg';
type BaseJoyTokens = {
  palette: {
    brand: Pick<PaletteRange, BasePaletteRange>;
    neutral: Pick<PaletteRange, BasePaletteRange>;
    danger: Pick<PaletteRange, BasePaletteRange>;
    info: Pick<PaletteRange, BasePaletteRange>;
    success: Pick<PaletteRange, BasePaletteRange>;
    warning: Pick<PaletteRange, BasePaletteRange>;
    letter: Pick<PaletteLetter, 'major' | 'minor' | 'support'>;
    surface: Pick<PaletteSurface, 'default' | 'level1' | 'level2' | 'level3'>;
    focusVisible: Palette['focusVisible'];
  };
  borderRadius: Pick<BorderRadius, 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  elevationRing: React.CSSProperties['boxShadow'];
  elevation: Pick<Elevation, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  focus: Pick<Focus, 'default'>;
  fontSize: Pick<
    FontSize,
    'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xl2' | 'xl3' | 'xl4' | 'xl5' | 'xl6'
  >;
  fontFamily: Pick<FontFamily, 'default' | 'display' | 'code' | 'fallback'>;
  fontWeight: Pick<FontWeight, 'default' | 'xs' | 'sm' | 'md' | 'lg'>;
  lineHeight: Pick<LineHeight, 'default' | 'xs' | 'sm' | 'md' | 'lg'>;
  letterSpacing: Pick<LetterSpacing, 'default' | 'sm' | 'md' | 'lg'>;
  typography: Pick<
    TypographySystems,
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'headingSubtitle'
    | 'body'
    | 'caption'
    | 'detail'
    | 'headingIntro'
    | 'button'
    | 'overline'
  >;
  variant: Pick<Variant, DefaultVariantKey>;
};

export const lightColorSystem: Pick<BaseJoyTokens, 'palette' | 'elevationRing'> = {
  palette: {
    brand: {
      ...colors.purple,
      ...createLightModeVariantVariables('brand'),
    },
    neutral: {
      ...colors.grey,
      ...createLightModeVariantVariables('neutral'),
    },
    danger: {
      ...colors.red,
      ...createLightModeVariantVariables('danger'),
    },
    info: {
      ...colors.blue,
      ...createLightModeVariantVariables('info'),
    },
    success: {
      ...colors.green,
      ...createLightModeVariantVariables('success'),
    },
    warning: {
      ...colors.yellow,
      ...createLightModeVariantVariables('warning'),
    },
    letter: {
      major: 'var(--joy-palette-neutral-800)',
      minor: 'var(--joy-palette-neutral-600)',
      support: 'var(--joy-palette-neutral-500)',
    },
    surface: {
      default: 'var(--joy-palette-neutral-50)',
      level1: '#fff',
      level2: 'var(--joy-palette-neutral-100)',
      level3: 'var(--joy-palette-neutral-200)',
    },
    focusVisible: 'var(--joy-palette-brand-200)',
  },
  elevationRing: '0 0 #000',
};

export const darkColorSystem: Pick<BaseJoyTokens, 'palette' | 'elevationRing'> = {
  palette: {
    brand: {
      ...colors.purple,
      ...createDarkModeVariantVariables('brand'),
    },
    neutral: {
      ...colors.grey,
      ...createDarkModeVariantVariables('neutral'),
    },
    danger: {
      ...colors.red,
      ...createDarkModeVariantVariables('danger'),
    },
    info: {
      ...colors.blue,
      ...createDarkModeVariantVariables('info'),
    },
    success: {
      ...colors.green,
      ...createDarkModeVariantVariables('success'),
    },
    warning: {
      ...colors.yellow,
      ...createDarkModeVariantVariables('warning'),
    },
    letter: {
      major: 'var(--joy-palette-neutral-100)',
      minor: 'var(--joy-palette-neutral-300)',
      support: 'var(--joy-palette-neutral-400)',
    },
    surface: {
      default: 'var(--joy-palette-neutral-800)',
      level1: 'var(--joy-palette-neutral-900)',
      level2: 'var(--joy-palette-neutral-700)',
      level3: 'var(--joy-palette-neutral-600)',
    },
    focusVisible: 'var(--joy-palette-brand-400)',
  },
  elevationRing: '0 0 #000',
};

/**
 * Base Joy Theme
 * Any value with `var(--joy-*)` can be used. 'joy-' will be replaced by the application prefix if provided.
 */
const themeWithoutVars: BaseJoyTokens = {
  ...lightColorSystem,
  borderRadius: {
    default: '28px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '20px',
    xl: '32px',
  },
  elevation: {
    xs: 'var(--joy-elevationRing), 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: 'var(--joy-elevationRing), 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: 'var(--joy-elevationRing), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: 'var(--joy-elevationRing), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: 'var(--joy-elevationRing), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  focus: {
    default: {
      outline: '4px solid',
      outlineColor: 'var(--joy-palette-focusVisible)',
    },
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xl2: '1.875rem',
    xl3: '2.25rem',
    xl4: '3rem',
    xl5: '3.75rem',
    xl6: '4.5rem',
  },
  fontFamily: {
    default: '"Public Sans", var(--joy-fontFamily-fallback)',
    display: '"PlusJakartaSans-ExtraBold", var(--joy-fontFamily-fallback)',
    code: 'Consolas',
    fallback:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  fontWeight: {
    default: 400,
    xs: 200,
    sm: 300,
    md: 500,
    lg: 700,
  },
  lineHeight: {
    default: 1.5,
    xs: 1,
    sm: 1.25,
    md: 1.7,
    lg: 2,
  },
  letterSpacing: {
    default: 0,
    sm: '-0.01em',
    md: '0.1em',
    lg: '0.125em',
  },
  typography: {
    h1: {
      fontFamily: 'var(--joy-fontFamily-display)',
      fontWeight: 'var(--joy-fontWeight-lg)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl4)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      letterSpacing: 'var(--joy-letterSpacing-xs)',
      color: 'var(--joy-palette-text-heading)',
    },
    h2: {
      fontFamily: 'var(--joy-fontFamily-display)',
      fontWeight: 'var(--joy-fontWeight-md)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl3)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-heading)',
    },
    h3: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-default)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl2)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-heading)',
    },
    h4: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-heading)',
    },
    h5: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-default)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-lg)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-heading)',
    },
    headingSubtitle: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-default)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-lg)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-letter-major)',
    },
    body: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-default)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-md)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-letter-major)',
    },
    caption: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-default)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-sm)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-letter-major)',
    },
    detail: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-default)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xs)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-letter-minor)',
    },
    headingIntro: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-extraBold)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-md)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-lg)',
      textTransform: 'uppercase',
      color: 'var(--joy-palette-letter-minor)',
    },
    overline: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-extraBold)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xs)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-lg)',
      textTransform: 'uppercase',
      color: 'var(--joy-palette-letter-support)',
    },
    button: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-bold)' as React.CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-md)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
    },
  },
  variant: {
    text: createVariant(getTextDefaultVariant),
    textHover: createVariant(getTextHoverVariant),
    textActive: createVariant(getTextActiveVariant),
    textDisabled: createVariant(getTextDisabledVariant),
    outlined: createVariant(getOutlinedDefaultVariant),
    outlinedHover: createVariant(getOutlinedHoverVariant),
    outlinedActive: createVariant(getOutlinedActiveVariant),
    outlinedDisabled: createVariant(getOutlinedDisabledVariant),
    filled: createVariant(getFilledDefaultVariant),
    filledHover: createVariant(getFilledHoverVariant),
    filledActive: createVariant(getFilledActiveVariant),
    filledDisabled: createVariant(getFilledDisabledVariant),
    contained: createVariant(getContainedDefaultVariant),
    containedHover: createVariant(getContainedHoverVariant),
    containedActive: createVariant(getContainedActiveVariant),
    containedDisabled: createVariant(getContainedDisabledVariant),
    containedContext: createVariant(getContainedOverrides),
  },
};

// ---------------------------------------------------------------

export type ColorScheme = 'light' | 'dark';

export interface JoyTheme<ExtendedColorScheme extends string = never> extends ThemeWithoutVars {
  colorSchemes: Record<ColorScheme | ExtendedColorScheme, ColorSystems>;
  vars: ThemeWithoutVars;
}

const defaultTheme = {
  ...themeWithoutVars,
  colorSchemes: {
    light: lightColorSystem,
    dark: darkColorSystem,
  },
  vars: themeWithoutVars,
} as JoyTheme;

export default defaultTheme;
