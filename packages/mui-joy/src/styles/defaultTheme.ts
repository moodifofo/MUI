import * as CSS from 'csstype';
import {
  createTheme as systemCreateTheme,
  Breakpoints,
  Spacing,
  CSSObject,
  SxProps as SystemSxProps,
} from '@mui/system';
import colors from '../colors';
import {
  ColorPaletteProp,
  ColorSystem,
  Palette,
  PaletteText,
  PaletteRange,
  PaletteBackground,
} from './types/colorSystem';
import { Variants, DefaultVariantKey, DefaultContextualOverrides } from './types/variants';
import {
  createLightModeVariantVariables,
  createDarkModeVariantVariables,
  createVariant,
} from './variantUtils';
import { DefaultColorScheme, ExtendedColorScheme } from './types/colorScheme';
import { Elevation } from './types/elevation';
import { Radius } from './types/radius';
import {
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TypographySystem,
} from './types/typography';

type CSSProperties = CSS.Properties<number | string>;
export interface Focus {
  default: CSSObject;
}

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
  | 'lightColor'
  | 'lightBg'
  | 'lightHoverBg'
  | 'lightActiveBg'
  | 'lightDisabledColor'
  | 'lightDisabledBg'
  | 'containedColor'
  | 'containedBg'
  | 'containedHoverBg'
  | 'containedActiveBg'
  | 'containedDisabledBg';
type BaseDesignTokens = {
  palette: {
    primary: Pick<PaletteRange, BasePaletteRange>;
    neutral: Pick<PaletteRange, BasePaletteRange>;
    danger: Pick<PaletteRange, BasePaletteRange>;
    info: Pick<PaletteRange, BasePaletteRange>;
    success: Pick<PaletteRange, BasePaletteRange>;
    warning: Pick<PaletteRange, BasePaletteRange>;
    text: Pick<PaletteText, 'primary' | 'secondary' | 'tertiary'>;
    background: Pick<PaletteBackground, 'default' | 'level1' | 'level2' | 'level3'>;
    focusVisible: Palette['focusVisible'];
  };
  radius: Pick<Radius, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  elevationRing: CSSProperties['boxShadow'];
  elevationChannel: string;
  elevation: Pick<Elevation, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  fontSize: Pick<
    FontSize,
    'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xl2' | 'xl3' | 'xl4' | 'xl5' | 'xl6'
  >;
  fontFamily: Pick<FontFamily, 'default' | 'display' | 'code' | 'fallback'>;
  fontWeight: Pick<FontWeight, 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  lineHeight: Pick<LineHeight, 'default' | 'sm' | 'md' | 'lg'>;
  letterSpacing: Pick<LetterSpacing, 'default' | 'sm' | 'md' | 'lg'>;
};

type BaseColorSystem = Pick<BaseDesignTokens, 'palette' | 'elevationRing' | 'elevationChannel'>;

export const lightColorSystem: BaseColorSystem = {
  palette: {
    primary: {
      ...colors.blue,
      ...createLightModeVariantVariables('primary'),
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
    text: {
      primary: 'var(--joy-palette-neutral-800)',
      secondary: 'var(--joy-palette-neutral-600)',
      tertiary: 'var(--joy-palette-neutral-500)',
    },
    background: {
      default: '#fff',
      level1: 'var(--joy-palette-neutral-50)',
      level2: 'var(--joy-palette-neutral-100)',
      level3: 'var(--joy-palette-neutral-200)',
    },
    focusVisible: 'var(--joy-palette-primary-200)',
  },
  elevationRing: '0 0 #000',
  elevationChannel: '187 187 187',
};

export const darkColorSystem: BaseColorSystem = {
  palette: {
    primary: {
      ...colors.blue,
      ...createDarkModeVariantVariables('primary'),
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
    text: {
      primary: 'var(--joy-palette-neutral-100)',
      secondary: 'var(--joy-palette-neutral-300)',
      tertiary: 'var(--joy-palette-neutral-400)',
    },
    background: {
      default: 'var(--joy-palette-neutral-900)',
      level1: 'var(--joy-palette-neutral-800)',
      level2: 'var(--joy-palette-neutral-700)',
      level3: 'var(--joy-palette-neutral-600)',
    },
    focusVisible: 'var(--joy-palette-primary-400)',
  },
  elevationRing: '0 0 #000',
  elevationChannel: '0 0 0',
};

/**
 * Base Joy design tokens
 * Any value with `var(--joy-*)` can be used. 'joy-' will be replaced by the application prefix if provided.
 */
const baseDesignTokens: BaseDesignTokens = {
  ...lightColorSystem,
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  elevation: {
    xs: 'var(--joy-elevationRing), 0 1px 2px 0 rgba(var(--joy-elevationChannel) / 0.12)',
    sm: 'var(--joy-elevationRing), 0.3px 0.8px 1.1px rgba(var(--joy-elevationChannel) / 0.11), 0.5px 1.3px 1.8px -0.6px rgba(var(--joy-elevationChannel) / 0.18), 1.1px 2.7px 3.8px -1.2px rgba(var(--joy-elevationChannel) / 0.26)',
    md: 'var(--joy-elevationRing), 0.3px 0.8px 1.1px rgba(var(--joy-elevationChannel) / 0.12), 1.1px 2.8px 3.9px -0.4px rgba(var(--joy-elevationChannel) / 0.17), 2.4px 6.1px 8.6px -0.8px rgba(var(--joy-elevationChannel) / 0.23), 5.3px 13.3px 18.8px -1.2px rgba(var(--joy-elevationChannel) / 0.29)',
    lg: 'var(--joy-elevationRing), 0.3px 0.8px 1.1px rgba(var(--joy-elevationChannel) / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(var(--joy-elevationChannel) / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(var(--joy-elevationChannel) / 0.16), 4.8px 12px 17px -0.5px rgba(var(--joy-elevationChannel) / 0.19), 7px 17.5px 24.7px -0.7px rgba(var(--joy-elevationChannel) / 0.21)',
    xl: 'var(--joy-elevationRing), 0.3px 0.8px 1.1px rgba(var(--joy-elevationChannel) / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(var(--joy-elevationChannel) / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(var(--joy-elevationChannel) / 0.16), 4.8px 12px 17px -0.5px rgba(var(--joy-elevationChannel) / 0.19), 7px 17.5px 24.7px -0.7px rgba(var(--joy-elevationChannel) / 0.21), 10.2px 25.5px 36px -0.9px rgba(var(--joy-elevationChannel) / 0.24), 14.8px 36.8px 52.1px -1.1px rgba(var(--joy-elevationChannel) / 0.27), 21px 52.3px 74px -1.2px rgba(var(--joy-elevationChannel) / 0.29)',
  },
  fontSize: {
    default: '1rem',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1.125rem',
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
    display: '"Public Sans", var(--joy-fontFamily-fallback)',
    code: 'Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
    fallback:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  fontWeight: {
    default: 400,
    xs: 200,
    sm: 300,
    md: 500,
    lg: 700,
    xl: 800,
  },
  lineHeight: {
    default: 1.5,
    sm: 1.25,
    md: 1.7,
    lg: 2,
  },
  letterSpacing: {
    default: 0,
    sm: '-0.01em',
    md: '0.083em',
    lg: '0.125em',
  },
};

const defaultSystemTheme = systemCreateTheme();

// Internal usage for providing type safe.
// Module augmentation in this repo has no impact.
const internalDefaultTheme: BaseDesignTokens & {
  colorSchemes: Record<DefaultColorScheme, BaseColorSystem>;
  focus: Pick<Focus, 'default'>;
  typography: Pick<
    TypographySystem,
    'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'body3'
  >;
  variants: Pick<Variants, DefaultVariantKey> &
    Record<DefaultContextualOverrides, Record<Exclude<ColorPaletteProp, 'context'>, CSSObject>>;
  vars: BaseDesignTokens & BaseColorSystem;
  spacing: Spacing;
  breakpoints: Breakpoints;
} = {
  ...baseDesignTokens,
  colorSchemes: {
    light: lightColorSystem,
    dark: darkColorSystem,
  },
  focus: {
    default: {
      outline: '4px solid',
      outlineColor: 'var(--joy-palette-focusVisible)',
    },
  },
  typography: {
    h1: {
      fontFamily: 'var(--joy-fontFamily-display)',
      fontWeight: 'var(--joy-fontWeight-lg)' as CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl4)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      letterSpacing: 'var(--joy-letterSpacing-sm)',
      color: 'var(--joy-palette-text-primary)',
    },
    h2: {
      fontFamily: 'var(--joy-fontFamily-display)',
      fontWeight: 'var(--joy-fontWeight-lg)' as CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl3)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      letterSpacing: 'var(--joy-letterSpacing-sm)',
      color: 'var(--joy-palette-text-primary)',
    },
    h3: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl2)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-primary)',
    },
    h4: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xl)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-primary)',
    },
    h5: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-lg)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-primary)',
    },
    h6: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-md)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-primary)',
    },
    body1: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-default)' as CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-default)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-primary)',
    },
    body2: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-default)' as CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-sm)',
      lineHeight: 'var(--joy-lineHeight-md)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-secondary)',
    },
    body3: {
      fontFamily: 'var(--joy-fontFamily-default)',
      fontWeight: 'var(--joy-fontWeight-md)' as CSSProperties['fontWeight'],
      fontSize: 'var(--joy-fontSize-xs)',
      lineHeight: 'var(--joy-lineHeight-default)',
      letterSpacing: 'var(--joy-letterSpacing-default)',
      color: 'var(--joy-palette-text-tertiary)',
    },
  },
  variants: {
    text: createVariant('text'),
    textHover: createVariant('textHover'),
    textActive: createVariant('textActive'),
    textDisabled: createVariant('textDisabled'),
    outlined: createVariant('outlined'),
    outlinedHover: createVariant('outlinedHover'),
    outlinedActive: createVariant('outlinedActive'),
    outlinedDisabled: createVariant('outlinedDisabled'),
    light: createVariant('light'),
    lightHover: createVariant('lightHover'),
    lightActive: createVariant('lightActive'),
    lightDisabled: createVariant('lightDisabled'),
    contained: createVariant('contained'),
    containedHover: createVariant('containedHover'),
    containedActive: createVariant('containedActive'),
    containedDisabled: createVariant('containedDisabled'),
    containedOverrides: createVariant('containedOverrides'),
  },
  vars: baseDesignTokens,
  breakpoints: defaultSystemTheme.breakpoints,
  spacing: defaultSystemTheme.spacing,
};

// ==============================================

export interface ThemeScales {
  radius: Radius;
  elevation: Elevation;
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
}

export interface JoyTheme<ApplicationColorScheme extends string = ExtendedColorScheme>
  extends ThemeScales,
    ColorSystem {
  colorSchemes: Record<DefaultColorScheme | ApplicationColorScheme, ColorSystem>;
  focus: Focus;
  typography: TypographySystem;
  variants: Variants;
  spacing: Spacing;
  breakpoints: Breakpoints;
  vars: ThemeScales & ColorSystem;
}

export type SxProps = SystemSxProps<JoyTheme>;

const defaultTheme = internalDefaultTheme as unknown as JoyTheme;

export default defaultTheme;
