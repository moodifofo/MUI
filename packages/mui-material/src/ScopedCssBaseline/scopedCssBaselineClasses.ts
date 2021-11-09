import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ScopedCssBaselineClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ScopedCssBaselineClassKey = keyof ScopedCssBaselineClasses;

export function getScopedCssBaselineUtilityClass(slot: string): string {
  return generateUtilityClass('MuiScopedCssBaseline', slot);
}

const scopedCssBaselineClasses = generateUtilityClasses('MuiScopedCssBaseline', ['root']);

export default scopedCssBaselineClasses;
