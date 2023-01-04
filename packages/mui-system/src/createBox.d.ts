import { OverridableComponent } from '@mui/types';
import { BoxTypeMap } from './Box';
import { Theme as SystemTheme } from './createTheme';

export default function createBox<
  T extends object = SystemTheme,
  AdditionalProps extends {} = {},
>(options?: {
  defaultTheme: T;
  defaultClassName?: string;
  generateClassName?: (componentName: string) => string;
}): OverridableComponent<BoxTypeMap<AdditionalProps, 'div', T>>;
