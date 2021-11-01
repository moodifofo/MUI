import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface ListItemTextClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the Typography component if primary and secondary are set. */
  multiline: string;
  /** Styles applied to the Typography component if dense. */
  dense: string;
  /** Styles applied to the root element if `inset={true}`. */
  inset: string;
  /** Styles applied to the primary `Typography` component. */
  primary: string;
  /** Styles applied to the secondary `Typography` component. */
  secondary: string;
}

export type ListItemTextClassKey = keyof ListItemTextClasses;

export function getListItemTextUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItemText', slot);
}

export const getListItemTextClasses = (): ListItemTextClasses => generateUtilityClasses('MuiListItemText', [
  'root',
  'multiline',
  'dense',
  'inset',
  'primary',
  'secondary',
]);

const listItemTextClasses = getListItemTextClasses();

export default listItemTextClasses;
