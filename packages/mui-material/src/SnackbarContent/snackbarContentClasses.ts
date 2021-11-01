import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface SnackbarContentClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the message wrapper element. */
  message: string;
  /** Styles applied to the action wrapper element if `action` is provided. */
  action: string;
}

export type SnackbarContentClassKey = keyof SnackbarContentClasses;

export function getSnackbarContentUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSnackbarContent', slot);
}

export const getSnackbarContentClasses = (): SnackbarContentClasses => generateUtilityClasses(
  'MuiSnackbarContent',
  ['root', 'message', 'action'],
);

const snackbarContentClasses = getSnackbarContentClasses();

export default snackbarContentClasses;
