import { OverridableStringUnion } from '@mui/types';

export interface BreakpointOverrides {}

export type Breakpoint = OverridableStringUnion<
  'xs' | 'sm' | 'md' | 'lg' | 'xl',
  BreakpointOverrides
>;
export const keys: Breakpoint[];

// Keep in sync with docs/src/pages/customization/breakpoints/breakpoints.md
// #default-branch-switch
export interface Breakpoints {
  keys: Breakpoint[];
  /**
   * Each breakpoint (a key) matches with a fixed screen width (a value).
   * @default {
   *    // extra-small
   *    xs: 0,
   *    // small
   *    sm: 600,
   *    // medium
   *    md: 900,
   *    // large
   *    lg: 1200,
   *    // extra-large
   *    xl: 1536,
   * }
   */
  values: { [key in Breakpoint]: number };
  /**
   * @param key - A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.
   * @returns A media query string ready to be used with most styling solutions, which matches screen widths greater than the screen size given by the breakpoint key (inclusive).
   * @see [API documentation](https://mui.com/customization/breakpoints/#theme-breakpoints-up-key-media-query)
   */
  up: (key: Breakpoint | number) => string;
  /**
   * @param key - A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.
   * @returns A media query string ready to be used with most styling solutions, which matches screen widths less than the screen size given by the breakpoint key (exclusive).
   * @see [API documentation](https://mui.com/customization/breakpoints/#theme-breakpoints-down-key-media-query)
   */
  down: (key: Breakpoint | number) => string;
  /**
   * @param start - A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.
   * @param end - A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.
   * @returns A media query string ready to be used with most styling solutions, which matches screen widths greater than
   *          the screen size given by the breakpoint key in the first argument (inclusive) and less than the screen size given by the breakpoint key in the second argument (exclusive).
   * @see [API documentation](https://mui.com/customization/breakpoints/#theme-breakpoints-between-start-end-media-query)
   */
  between: (start: Breakpoint | number, end: Breakpoint | number) => string;
  /**
   * @param key - A breakpoint key (`xs`, `sm`, etc.) or a screen width number in px.
   * @returns A media query string ready to be used with most styling solutions, which matches screen widths starting from
   *          the screen size given by the breakpoint key (inclusive) and stopping at the screen size given by the next breakpoint key (exclusive).
   * @see [API documentation](https://mui.com/customization/breakpoints/#theme-breakpoints-only-key-media-query)
   */
  only: (key: Breakpoint) => string;
}

export interface BreakpointsOptions extends Partial<Breakpoints> {
  /**
   * The increment used to implement exclusive breakpoints.
   * @default '0.05px'
   */
  step?: string | undefined;
  /**
   * The unit used for the breakpoint's values.
   * @default 'px'
   */
  unit?: string | undefined;
}

export default function createBreakpoints(options: BreakpointsOptions): Breakpoints;
