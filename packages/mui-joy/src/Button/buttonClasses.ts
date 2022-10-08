import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Styles applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the root element if `variant="solid"`. */
  variantSolid: string;
  /** State class applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
  /** Styles applied to the startDecorator element if supplied. */
  startDecorator: string;
  /** Styles applied to the endDecorator element if supplied. */
  endDecorator: string;
  /** Styles applied to the root element if `loading={true}`. */
  loading: string;
  /** Styles applied to the loadingIndicator element. */
  loadingIndicator: string;
  /** Styles applied to the loadingIndicator element if `loadingPosition="center"`. */
  loadingIndicatorCenter: string;
  /** Styles applied to the loadingIndicator element if `loadingPosition="start"`. */
  loadingIndicatorStart: string;
  /** Styles applied to the loadingIndicator element if `loadingPosition="end"`. */
  loadingIndicatorEnd: string;
  /** Styles applied to the endDecorator element if `loading={true}` and `loadingPosition="end"`. */
  endDecoratorLoadingEnd: string;
  /** Styles applied to the startDecorator element if `loading={true}` and `loadingPosition="start"`. */
  startDecoratorLoadingStart: string;
}

export type ButtonClassKey = keyof ButtonClasses;

export function getButtonUtilityClass(slot: string): string {
  return generateUtilityClass('JoyButton', slot);
}

const buttonClasses: ButtonClasses = generateUtilityClasses('JoyButton', [
  'root',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
  'focusVisible',
  'disabled',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'fullWidth',
  'startDecorator',
  'endDecorator',
  'loading',
  'loadingIndicator',
  'loadingIndicatorCenter',
  'loadingIndicatorStart',
  'loadingIndicatorEnd',
  'endDecoratorLoadingEnd',
  'startDecoratorLoadingStart',
]);

export default buttonClasses;
