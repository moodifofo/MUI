import * as React from 'react';

export interface ScrollableTabsContextValue {
  /**
   * The currently selected tab's value.
   */
  value: number | string | null;
  /**
   * Callback for setting new value.
   */
  onSelected: (event: React.SyntheticEvent | null, value: number | string | null) => void;
  /**
   * The component orientation (layout flow direction).
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The direction of the tabs.
   */
  direction?: 'ltr' | 'rtl';
  /**
   * Registers a function that returns the id of the tab with the given value.
   */
  registerTabIdLookup: (lookupFunction: (id: string | number) => string | undefined) => void;
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus?: boolean;
  /**
   * Gets the id of the tab with the given value.
   * @param value Value to find the tab for.
   */
  getTabId: (value: number | string) => string | undefined;
  /**
   * Gets the id of the tab panel with the given value.
   * @param value Value to find the tab panel for.
   */
  getTabPanelId: (value: number | string) => string | undefined;
  getScrollButtonProps: any;
}

/**
 * @ignore - internal component.
 */
const Context = React.createContext<ScrollableTabsContextValue | null>(null);

if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'TabsContext';
}

export function useTabsContext() {
  const context = React.useContext(Context);
  if (context == null) {
    throw new Error('No TabsContext provided');
  }

  return context;
}

export default Context;
