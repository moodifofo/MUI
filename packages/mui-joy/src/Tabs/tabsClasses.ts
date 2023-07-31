import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface TabsClasses {
  /** Classname applied to the root element. */
  root: string;
  /** Classname applied to the root element if `orientation="horizontal"`. */
  horizontal: string;
  /** Classname applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** Classname applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Classname applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Classname applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Classname applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Classname applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Classname applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Classname applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Classname applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Classname applied to the root element if `variant="solid"`. */
  variantSolid: string;
  /** Classname applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Classname applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Classname applied to the root element if `size="lg"`. */
  sizeLg: string;
}

export type TabsClassKey = keyof TabsClasses;

export function getTabsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTabs', slot);
}

const tabListClasses: TabsClasses = generateUtilityClasses('MuiTabs', [
  'root',
  'horizontal',
  'vertical',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
  'sizeSm',
  'sizeMd',
  'sizeLg',
]);

export default tabListClasses;
