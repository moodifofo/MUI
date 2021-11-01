import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface CardHeaderClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the avatar element. */
  avatar: string;
  /** Styles applied to the action element. */
  action: string;
  /** Styles applied to the content wrapper element. */
  content: string;
  /** Styles applied to the title Typography element. */
  title: string;
  /** Styles applied to the subheader Typography element. */
  subheader: string;
}

export type CardHeaderClassKey = keyof CardHeaderClasses;

export function getCardHeaderUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCardHeader', slot);
}

export const getCardHeaderClasses = (): CardHeaderClasses => generateUtilityClasses('MuiCardHeader', [
  'root',
  'avatar',
  'action',
  'content',
  'title',
  'subheader',
]);

const cardHeaderClasses = getCardHeaderClasses();

export default cardHeaderClasses;
