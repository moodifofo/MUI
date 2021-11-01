import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface MenuItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if keyboard focused. */
  focusVisible: string;
  /** Styles applied to the root element if dense. */
  dense: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `divider={true}`. */
  divider: string;
  /** Styles applied to the inner `component` element unless `disableGutters={true}`. */
  gutters: string;
  /** State class applied to the root element if `selected={true}`. */
  selected: string;
}

export type MenuItemClassKey = keyof MenuItemClasses;

export function getMenuItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuItem', slot);
}

export const getMenuItemClasses = (): MenuItemClasses => generateUtilityClasses('MuiMenuItem', [
  'root',
  'focusVisible',
  'dense',
  'disabled',
  'divider',
  'gutters',
  'selected',
]);

const menuItemClasses = getMenuItemClasses();

export default menuItemClasses;
