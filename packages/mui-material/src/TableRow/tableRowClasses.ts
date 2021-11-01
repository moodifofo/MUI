import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface TableRowClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `selected={true}`. */
  selected: string;
  /** State class applied to the root element if `hover={true}`. */
  hover: string;
  /** Styles applied to the root element if table variant="head". */
  head: string;
  /** Styles applied to the root element if table variant="footer". */
  footer: string;
}

export type TableRowClassKey = keyof TableRowClasses;

export function getTableRowUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTableRow', slot);
}

export const getTableRowClasses = (): TableRowClasses => generateUtilityClasses('MuiTableRow', [
  'root',
  'selected',
  'hover',
  'head',
  'footer',
]);

const tableRowClasses = getTableRowClasses();

export default tableRowClasses;
