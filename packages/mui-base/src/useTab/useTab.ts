import * as React from 'react';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '@mui/utils';
import { useTabContext } from '../TabsUnstyled';
import { UseTabParameters, UseTabReturnValue, UseTabRootSlotProps } from './useTab.types';
import { EventHandlers } from '../utils';
import { useCompoundItem } from '../utils/useCompound';
import { useListItem } from '../useList';
import useButton from '../useButton';
import { TabMetadata } from '../useTabs';
/**
 *
 * Demos:
 *
 * - [Unstyled Tabs](https://mui.com/base/react-tabs/#hooks)
 *
 * API:
 *
 * - [useTab API](https://mui.com/base/react-tabs/hooks-api/#use-tab)
 */
function useTab(parameters: UseTabParameters): UseTabReturnValue {
  const { value, ref: externalRef, disabled = false } = parameters;

  const tabRef = React.useRef<HTMLElement>(null);

  const { value: selectedValue, idPrefix = '', selectionFollowsFocus } = useTabContext();

  const {
    getRootProps: getTabProps,
    ref: listItemRefHandler,
    highlighted,
    selected,
  } = useListItem({
    item: value,
  });

  const {
    getRootProps: getButtonProps,
    ref: buttonRefHandler,
    active,
  } = useButton({
    disabled,
    focusableWhenDisabled: !selectionFollowsFocus,
    type: 'button',
  });

  const handleRef = useForkRef(tabRef, externalRef, listItemRefHandler, buttonRefHandler);

  const tabId = idPrefix + useId();

  const tabMetadata = React.useMemo(() => ({ disabled, ref: tabRef }), [disabled, tabRef]);

  const { index, totalItemCount: totalTabsCount } = useCompoundItem<string | number, TabMetadata>(
    value,
    tabMetadata,
  );

  const getRootProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ): UseTabRootSlotProps<TOther> => {
    const resolvedTabProps = {
      ...otherHandlers,
      ...getTabProps(otherHandlers),
    };

    const resolvedButtonProps = {
      ...resolvedTabProps,
      ...getButtonProps(resolvedTabProps),
    };

    return {
      ...resolvedButtonProps,
      role: 'tab',
      'aria-controls': 'not-implemented-yet',
      'aria-selected': selected,
      id: tabId,
      ref: handleRef,
    };
  };

  return {
    getRootProps,
    active,
    highlighted,
    index,
    // the `selected` state isn't set on the server (it relies on effects to be calculated),
    // so we fall back to checking the `value` prop with the selectedValue from the TabsContext
    selected: selected || value === selectedValue,
    totalTabsCount,
  };
}

export default useTab;
