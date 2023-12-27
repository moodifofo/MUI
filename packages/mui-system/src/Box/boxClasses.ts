import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';

export interface BoxClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type BoxClassKey = keyof BoxClasses;

const boxClasses: BoxClasses = generateUtilityClasses('MuiBox', ['root']);

export default boxClasses;
