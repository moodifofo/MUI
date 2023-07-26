import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TableClasses } from './tableClasses';

export interface TablePropsSizeOverrides {}

export interface TableTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'table',
> {
  props: AdditionalProps & {
    /**
     * The content of the table, normally `TableHead` and `TableBody`.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<TableClasses>;
    /**
     * Allows TableCells to inherit padding of the Table.
     * @default 'normal'
     */
    padding?: 'normal' | 'checkbox' | 'none';
    /**
     * Allows TableCells to inherit size of the Table.
     * @default 'medium'
     */
    size?: OverridableStringUnion<'small' | 'medium', TablePropsSizeOverrides>;
    /**
     * Set the header sticky.
     *
     * ⚠️ It doesn't work with IE11.
     * @default false
     */
    stickyHeader?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: DefaultComponent;
}
/**
 *
 * Demos:
 *
 * - [Table](https://mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [Table API](https://mui.com/material-ui/api/table/)
 */
declare const Table: OverridableComponent<TableTypeMap>;

export type TableProps<
  RootComponent extends React.ElementType = TableTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TableTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default Table;
