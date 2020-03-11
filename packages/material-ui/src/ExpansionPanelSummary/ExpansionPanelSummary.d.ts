import * as React from 'react';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { IconButtonProps } from '../IconButton';
import { OverrideProps } from '../OverridableComponent';

export type ExpansionPanelSummaryTypeMap<
  P = {},
  D extends React.ElementType = 'div'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    expandIcon?: React.ReactNode;
    IconButtonProps?: Partial<IconButtonProps>;
  };
  defaultComponent: D;
  classKey: ExpansionPanelSummaryClassKey;
}>;

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/expansion-panels Expansion Panels}
 *
 * API:
 * - {@link https://material-ui.com/api/ExpansionPanelSummary ExpansionPanelSummary API}
 * - inherits {@link https://material-ui.com/api//api/button-base ButtonBase API}
 */
declare const ExpansionPanelSummary: ExtendButtonBase<ExpansionPanelSummaryTypeMap>;

export type ExpansionPanelSummaryClassKey =
  | 'root'
  | 'expanded'
  | 'focused'
  | 'disabled'
  | 'content'
  | 'expandIcon';

export type ExpansionPanelSummaryProps<
  D extends React.ElementType = ExpansionPanelSummaryTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ExpansionPanelSummaryTypeMap<P, D>, D>;

export default ExpansionPanelSummary;
