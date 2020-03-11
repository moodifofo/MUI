import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    dense?: boolean;
    disablePadding?: boolean;
    subheader?: React.ReactElement;
  };
  defaultComponent: D;
  classKey: ListClassKey;
}

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/lists Lists}
 * - {@link https://material-ui.com/components/transfer-list Transfer List}
 *
 * API:
 * - {@link https://material-ui.com/api/List List API}
 *
 */
declare const List: OverridableComponent<ListTypeMap>;

export type ListClassKey = 'root' | 'padding' | 'dense' | 'subheader';

export type ListProps<
  D extends React.ElementType = ListTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ListTypeMap<P, D>, D>;

export default List;
