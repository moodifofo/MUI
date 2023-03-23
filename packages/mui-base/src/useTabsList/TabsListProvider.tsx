import * as React from 'react';
import { ListContext, ListContextValue, ListState } from '../useList';
import { TabMetadata } from '../useTabs/useTabs';
import { CompoundComponentContext, CompoundComponentContextValue } from '../utils/useCompound';

export type TabsListProviderValue = CompoundComponentContextValue<string | number, TabMetadata> &
  ListContextValue<string | number, ListState<string | number>>;

export interface TabsListProviderProps {
  value: TabsListProviderValue;
  children: React.ReactNode;
}

/**
 * Sets up the contexts for the underlying Tab components.
 */
export default function TabsListProvider(props: TabsListProviderProps) {
  const { value, children } = props;
  const {
    dispatch,
    getItemIndex,
    getItemState,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler,
    registerItem,
    unregisterItem,
    totalSubitemCount,
  } = value;

  const listContextValue: ListContextValue<
    string | number,
    ListState<string | number>
  > = React.useMemo(
    () => ({
      dispatch,
      getItemState,
      getItemIndex,
      registerHighlightChangeHandler,
      registerSelectionChangeHandler,
    }),
    [
      dispatch,
      getItemIndex,
      getItemState,
      registerHighlightChangeHandler,
      registerSelectionChangeHandler,
    ],
  );

  const compoundComponentContextValue: CompoundComponentContextValue<string | number, TabMetadata> =
    React.useMemo(
      () => ({
        getItemIndex,
        registerItem,
        totalSubitemCount,
        unregisterItem,
      }),
      [registerItem, getItemIndex, unregisterItem, totalSubitemCount],
    );

  return (
    <CompoundComponentContext.Provider value={compoundComponentContextValue}>
      <ListContext.Provider value={listContextValue}>{children}</ListContext.Provider>
    </CompoundComponentContext.Provider>
  );
}
