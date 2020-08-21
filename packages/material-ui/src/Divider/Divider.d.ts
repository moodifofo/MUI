import { OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface DividerPropsVariantOverrides {}
export type DividerVariantDefaults = Record<'fullWidth' | 'inset' | 'middle', true>;

export interface DividerTypeMap<P = {}, D extends React.ElementType = 'hr'> {
  props: P & {
    /**
     * Absolutely position the element.
     */
    absolute?: boolean;
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css) below for more details.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element if `absolute={true}`. */
      absolute?: string;
      /** Styles applied to the root element if `variant="inset"`. */
      inset?: string;
      /** Styles applied to the root element if `variant="fullWidth"`. */
      fullWidth?: string;
      /** Styles applied to the root element if `light={true}`. */
      light?: string;
      /** Styles applied to the root element if `variant="middle"`. */
      middle?: string;
      /** Styles applied to the root element if `orientation="vertical"`. */
      vertical?: string;
      /** Styles applied to the root element if `flexItem={true}`. */
      flexItem?: string;
    };
    /**
     * If `true`, a vertical divider will have the correct height when used in flex container.
     * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
     */
    flexItem?: boolean;
    /**
     * If `true`, the divider will have a lighter color.
     */
    light?: boolean;
    /**
     * The divider orientation.
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The variant to use.
     */
    variant?: OverridableStringUnion<DividerVariantDefaults, DividerPropsVariantOverrides>;
  };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Dividers](https://material-ui.com/components/dividers/)
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [Divider API](https://material-ui.com/api/divider/)
 */
declare const Divider: OverridableComponent<DividerTypeMap>;

export type DividerClassKey =
  | 'root'
  | 'absolute'
  | 'inset'
  | 'fullWidth'
  | 'light'
  | 'middle'
  | 'vertical';

export type DividerProps<
  D extends React.ElementType = DividerTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<DividerTypeMap<P, D>, D>;

export default Divider;
