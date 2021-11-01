import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface StepperClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** Styles applied to the root element if `alternativeLabel={true}`. */
  alternativeLabel: string;
}

export type StepperClassKey = keyof StepperClasses;

export function getStepperUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStepper', slot);
}

export const getStepperClasses = (): StepperClasses => generateUtilityClasses('MuiStepper', [
  'root',
  'horizontal',
  'vertical',
  'alternativeLabel',
]);

const stepperClasses = getStepperClasses();

export default stepperClasses;
