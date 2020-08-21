import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@material-ui/core';

export type TabPanelClassKey = 'root';

export interface TabPanelProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
  };
  /**
   * The `value` of the corresponding `Tab`. Must use the index of the `Tab` when
   * no `value` was passed to `Tab`.
   */
  value: string;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://material-ui.com/components/tabs/)
 *
 * API:
 *
 * - [TabPanel API](https://material-ui.com/api/tab-panel/)
 */
export default function TabPanel(props: TabPanelProps): JSX.Element;
