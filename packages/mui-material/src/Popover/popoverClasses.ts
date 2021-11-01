import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface PopoverClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the Paper component. */
  paper: string;
}

export type PopoverClassKey = keyof PopoverClasses;

export function getPopoverUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPopover', slot);
}

export const getPopoverClasses = (): PopoverClasses => generateUtilityClasses('MuiPopover', ['root', 'paper']);

const popoverClasses = getPopoverClasses();

export default popoverClasses;
