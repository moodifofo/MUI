import * as React from 'react';
import { CSSObject, unstable_createGetCssVar as createGetCssVar } from '@mui/system';
import { ColorPaletteProp, VariantProp } from './types';
import { DefaultColorPalette } from './types/colorSystem';
import { JoyTheme } from './defaultTheme';
import { isVariantPalette } from './variantUtils';

const VariantOverride = React.createContext<VariantProp | undefined>(undefined);

const createPrefixVar = (prefix: string | undefined | null) => {
  return (cssVar: string) => `--${prefix ? `${prefix}-` : ''}${cssVar.replace(/^--/, '')}`;
};

export const createTextOverrides = (theme: JoyTheme) => {
  const getCssVar = createGetCssVar(theme.prefix);
  const prefixVar = createPrefixVar(theme.prefix);
  let result = {} as Record<DefaultColorPalette, CSSObject>;
  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry as [
      DefaultColorPalette,
      string | number | Record<string, any>,
    ];
    if (isVariantPalette(colorPalette)) {
      result = {
        ...result,
        [color]: {
          '[data-mui-color-scheme="light"] &': {
            [prefixVar('--palette-text-primary')]: getCssVar(`palette-${color}-800`),
            [prefixVar('--palette-text-secondary')]: getCssVar(`palette-${color}-700`),
            [prefixVar('--palette-text-tertiary')]: getCssVar(`palette-${color}-600`),
          },
          '[data-mui-color-scheme="dark"] &': {
            [prefixVar('--palette-text-primary')]: getCssVar(`palette-${color}-100`),
            [prefixVar('--palette-text-secondary')]: getCssVar(`palette-${color}-200`),
            [prefixVar('--palette-text-tertiary')]: getCssVar(`palette-${color}-400`),
          },
        },
      };
    }
  });
  return result;
};

export const createLightOverrides = (theme: JoyTheme) => {
  const getCssVar = createGetCssVar(theme.prefix);
  const prefixVar = createPrefixVar(theme.prefix);
  let result = {} as Record<DefaultColorPalette, CSSObject>;
  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry as [
      DefaultColorPalette,
      string | number | Record<string, any>,
    ];
    if (isVariantPalette(colorPalette)) {
      result = {
        ...result,
        [color]: {
          '--Badge-ringColor': getCssVar(`palette-${color}-lightBg`),
          '[data-mui-color-scheme="light"] &': {
            [prefixVar('--palette-background-body')]: `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.1)`,
            [prefixVar('--palette-text-primary')]: getCssVar(`palette-${color}-800`),
            [prefixVar('--palette-text-secondary')]: getCssVar(`palette-${color}-700`),
            [prefixVar('--palette-text-tertiary')]: getCssVar(`palette-${color}-600`),
            '--variant-textColor': getCssVar(`palette-${color}-700`),
            '--variant-textHoverColor': getCssVar(`palette-${color}-800`),
            '--variant-textHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.2)`,
            '--variant-textActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
            '--variant-textDisabledColor': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.6)`,

            '--variant-outlinedColor': getCssVar(`palette-${color}-700`),
            '--variant-outlinedBg': 'initial',
            '--variant-outlinedBorder': getCssVar(`palette-${color}-400`),
            '--variant-outlinedHoverColor': getCssVar(`palette-${color}-800`),
            '--variant-outlinedHoverBorder': getCssVar(`palette-${color}-600`),
            '--variant-outlinedHoverBg': getCssVar(`palette-${color}-200`),
            '--variant-outlinedActiveBg': getCssVar(`palette-${color}-300`),
            '--variant-outlinedDisabledColor': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.6)`,
            '--variant-outlinedDisabledBorder': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.2)`,

            '--variant-lightColor': getCssVar(`palette-${color}-700`),
            '--variant-lightBg': getCssVar(`palette-${color}-50`),
            '--variant-lightHoverColor': getCssVar(`palette-${color}-800`),
            '--variant-lightHoverBg': getCssVar(`palette-${color}-200`),
            '--variant-lightActiveBg': getCssVar(`palette-${color}-300`),
            '--variant-lightDisabledColor': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.6)`,
            '--variant-lightDisabledBg': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.12)`,
          },
          '[data-mui-color-scheme="dark"] &': {
            [prefixVar('--palette-background-body')]: `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.1)`,
            [prefixVar('--palette-text-primary')]: getCssVar(`palette-${color}-100`),
            [prefixVar('--palette-text-secondary')]: getCssVar(`palette-${color}-200`),
            [prefixVar('--palette-text-tertiary')]: getCssVar(`palette-${color}-400`),
            '--variant-textColor': getCssVar(`palette-${color}-50`),
            '--variant-textHoverColor': '#fff',
            '--variant-textHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.2)`,
            '--variant-textActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
            '--variant-textDisabledColor': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.6)`,

            '--variant-outlinedColor': 'rgba(255 255 255 / 0.72)',
            '--variant-outlinedHoverColor': '#fff',
            '--variant-outlinedBg': 'initial',
            '--variant-outlinedBorder': getCssVar(`palette-${color}-700`),
            '--variant-outlinedHoverBorder': getCssVar(`palette-${color}-500`),
            '--variant-outlinedHoverBg': getCssVar(`palette-${color}-800`),
            '--variant-outlinedActiveBg': getCssVar(`palette-${color}-700`),
            '--variant-outlinedDisabledColor': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.6)`,
            '--variant-outlinedDisabledBorder': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.2)`,

            '--variant-lightColor': getCssVar(`palette-${color}-100`),
            '--variant-lightBg': getCssVar(`palette-${color}-800`),
            '--variant-lightHoverColor': '#fff',
            '--variant-lightHoverBg': getCssVar(`palette-${color}-700`),
            '--variant-lightActiveBg': getCssVar(`palette-${color}-800`),
            '--variant-lightDisabledColor': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.6)`,
            '--variant-lightDisabledBg': `rgba(${getCssVar(
              `palette-${color}-mainChannel`,
            )} / 0.12)`,
          },
        },
      };
    }
  });
  return result;
};

export const createContainedOverrides = (theme: JoyTheme) => {
  const getCssVar = createGetCssVar(theme.prefix);
  const prefixVar = createPrefixVar(theme.prefix);
  let result = {} as Record<DefaultColorPalette, CSSObject>;
  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry as [
      DefaultColorPalette,
      string | number | Record<string, any>,
    ];
    if (isVariantPalette(colorPalette)) {
      result = {
        ...result,
        [color]: {
          '--Badge-ringColor': getCssVar(`palette-${color}-containedBg`),
          [prefixVar('--palette-background-body')]: 'rgba(0 0 0 / 0.1)',
          [prefixVar('--palette-text-primary')]: '#fff',
          [prefixVar('--palette-text-secondary')]: getCssVar(`palette-${color}-100`),
          [prefixVar('--palette-text-tertiary')]: getCssVar(`palette-${color}-200`),
          '--variant-focusVisible': `rgba(255 255 255 / 0.32)`,

          '--variant-textColor': getCssVar(`palette-${color}-50`),
          '--variant-textHoverColor': `#fff`,
          '--variant-textHoverBg': `rgba(255 255 255 / 0.12)`,
          '--variant-textActiveBg': `rgba(255 255 255 / 0.2)`,
          '--variant-textDisabledColor': getCssVar(`palette-${color}-300`),

          '--variant-outlinedColor': getCssVar(`palette-${color}-50`),
          '--variant-outlinedBorder': getCssVar(`palette-${color}-300`),
          '--variant-outlinedHoverColor': `#fff`,
          '--variant-outlinedHoverBorder': getCssVar(`palette-${color}-200`),
          '--variant-outlinedHoverBg': `rgba(255 255 255 / 0.12)`,
          '--variant-outlinedActiveBg': `rgba(255 255 255 / 0.2)`,
          '--variant-outlinedDisabledColor': getCssVar(`palette-${color}-300`),
          '--variant-outlinedDisabledBorder': `rgba(255 255 255 / 0.2)`,

          '--variant-lightColor': getCssVar(`palette-${color}-50`),
          '--variant-lightHoverColor': '#fff',
          '--variant-lightBg': getCssVar(`palette-${color}-700`),
          '--variant-lightHoverBg': `rgba(255 255 255 / 0.12)`,
          '--variant-lightActiveBg': `rgba(255 255 255 / 0.2)`,
          '--variant-lightDisabledColor': getCssVar(`palette-${color}-300`),
          '--variant-lightDisabledBg': `rgba(0 0 0 / 0.08)`,

          '--variant-containedColor': getCssVar(`palette-${color}-600`),
          '--variant-containedBg': getCssVar(`palette-${color}-50`, 'rgba(0 0 0 / 0.16)'),
          '--variant-containedHoverColor': getCssVar(`palette-${color}-700`),
          '--variant-containedHoverBg': '#fff',
          '--variant-containedActiveBg': getCssVar(`palette-${color}-100`),
          '--variant-containedDisabledColor': getCssVar(`palette-${color}-300`),
          '--variant-containedDisabledBg': `rgba(255 255 255 / 0.08)`,
        },
      };
    }
  });
  return result;
};

export const useVariantOverride = (childVariant: VariantProp | undefined) => {
  const upperVariant = React.useContext(VariantOverride);
  return {
    getColor: (
      instanceColorProp: ColorPaletteProp | 'inherit' | undefined,
      defaultColorProp: ColorPaletteProp | 'inherit' | undefined,
    ): ColorPaletteProp | undefined => {
      if (upperVariant && upperVariant.match(/^(light|contained)$/)) {
        if (upperVariant !== 'light' || childVariant !== 'contained') {
          // @ts-ignore internal logic
          return instanceColorProp || 'context';
        }
      }
      // @ts-ignore internal logic
      return instanceColorProp || defaultColorProp;
    },
  };
};

export default VariantOverride;
