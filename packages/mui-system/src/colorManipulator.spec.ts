import { expectType } from '@mui/types';
import {
  hexToRgb,
  rgbToHex,
  hslToRgb,
  decomposeColor,
  colorChannel,
  recomposeColor,
  getContrastRatio,
  getLuminance,
  emphasize,
  alpha,
  lighten,
  darken,
} from '@mui/system';

type ColorFormat = 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'color';

interface ColorObject {
  type: ColorFormat;
  values: [number, number, number] | [number, number, number, number];
  colorSpace?: 'srgb' | 'display-p3' | 'a98-rgb' | 'prophoto-rgb' | 'rec-2020';
}

expectType<(color: string) => string, typeof hexToRgb>(hexToRgb);

expectType<(color: string) => string, typeof rgbToHex>(rgbToHex);

expectType<(color: string) => string, typeof hslToRgb>(hslToRgb);

expectType<(color: string) => ColorObject, typeof decomposeColor>(decomposeColor);

expectType<(color: string) => string, typeof colorChannel>(colorChannel);

expectType<(color: ColorObject) => string, typeof recomposeColor>(recomposeColor);

expectType<(foreground: string, background: string) => number, typeof getContrastRatio>(
  getContrastRatio,
);

expectType<(color: string) => number, typeof getLuminance>(getLuminance);

expectType<(color: string, coefficient?: number) => string, typeof emphasize>(emphasize);

expectType<(color: string, value: number) => string, typeof alpha>(alpha);

expectType<(color: string, coefficient: number) => string, typeof darken>(darken);

expectType<(color: string, coefficient: number) => string, typeof lighten>(lighten);
