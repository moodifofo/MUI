import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface BreadcrumbsTypeMap<P = {}, D extends React.ElementType = 'nav'> {
  props: P & {
    /**
     * The breadcrumb children.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css) below for more details.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the ol element. */
      ol?: string;
      /** Styles applied to the li element. */
      li?: string;
      /** Styles applied to the separator element. */
      separator?: string;
    };
    /**
     * Override the default label for the expand button.
     *
     * For localization purposes, you can use the provided [translations](/guides/localization/).
     */
    expandText?: string;
    /**
     * If max items is exceeded, the number of items to show after the ellipsis.
     */
    itemsAfterCollapse?: number;
    /**
     * If max items is exceeded, the number of items to show before the ellipsis.
     */
    itemsBeforeCollapse?: number;
    /**
     * Specifies the maximum number of breadcrumbs to display. When there are more
     * than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse`
     * will be shown, with an ellipsis in between.
     */
    maxItems?: number;
    /**
     * Custom separator node.
     */
    separator?: React.ReactNode;
  };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Breadcrumbs](https://material-ui.com/components/breadcrumbs/)
 *
 * API:
 *
 * - [Breadcrumbs API](https://material-ui.com/api/breadcrumbs/)
 */
declare const Breadcrumbs: OverridableComponent<BreadcrumbsTypeMap>;

export type BreadcrumbsClassKey = 'root' | 'ol' | 'li' | 'separator';

export type BreadcrumbsProps<
  D extends React.ElementType = BreadcrumbsTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BreadcrumbsTypeMap<P, D>, D>;

export default Breadcrumbs;
