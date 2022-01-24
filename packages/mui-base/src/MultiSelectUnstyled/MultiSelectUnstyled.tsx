import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  unstable_useForkRef as useForkRef,
  unstable_useControlled as useControlled,
} from '@mui/utils';
import MultiSelectUnstyledProps, {
  MultiSelectUnstyledOwnerState,
} from './MultiSelectUnstyledProps';
import { flattenOptionGroups, getOptionsFromChildren } from '../SelectUnstyled/utils';
import useSelect from '../SelectUnstyled/useSelect';
import { SelectChild, SelectOption } from '../SelectUnstyled/useSelectProps';
import { appendOwnerState } from '../utils';
import PopperUnstyled from '../PopperUnstyled';
import {
  SelectUnstyledContext,
  SelectUnstyledContextType,
} from '../SelectUnstyled/SelectUnstyledContext';
import composeClasses from '../composeClasses';
import { getSelectUnstyledUtilityClass } from '../SelectUnstyled/selectUnstyledClasses';

function defaultRenderMultipleValues<TValue>(selectedOptions: SelectOption<TValue>[]) {
  return <React.Fragment>{selectedOptions.map((o) => o.label).join(', ')}</React.Fragment>;
}

function useUtilityClasses(ownerState: MultiSelectUnstyledOwnerState<any>) {
  const { active, disabled, open, focusVisible } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      active && 'active',
      open && 'expanded',
    ],
    listbox: ['listbox', disabled && 'disabled'],
    popper: ['popper'],
  };

  return composeClasses(slots, getSelectUnstyledUtilityClass, {});
}

/**
 * The foundation for building custom-styled multi-selection select components.
 */
const MultiSelectUnstyled = React.forwardRef(function MultiSelectUnstyled<TValue>(
  props: MultiSelectUnstyledProps<TValue>,
  ref: React.ForwardedRef<any>,
) {
  const {
    autoFocus,
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultListboxOpen = false,
    defaultValue = [],
    disabled: disabledProp,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
    value: valueProp,
    ...other
  } = props;

  const renderValue = props.renderValue ?? defaultRenderMultipleValues;

  const [groupedOptions, setGroupedOptions] = React.useState<SelectChild<TValue>[]>([]);
  const options = React.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
  const [listboxOpen, setListboxOpen] = useControlled({
    controlled: listboxOpenProp,
    default: defaultListboxOpen,
    name: 'MultiSelectUnstyled',
    state: 'listboxOpen',
  });

  React.useEffect(() => {
    setGroupedOptions(getOptionsFromChildren(children));
  }, [children]);

  const [buttonDefined, setButtonDefined] = React.useState(false);
  const buttonRef = React.useRef<HTMLElement | null>(null);

  const Button = component ?? components.Root ?? 'button';
  const ListboxRoot = components.Listbox ?? 'ul';
  const Popper = components.Popper ?? PopperUnstyled;

  const handleButtonRefChange = (element: HTMLElement | null) => {
    buttonRef.current = element;

    if (element != null) {
      setButtonDefined(true);
    }
  };

  const handleButtonRef = useForkRef(ref, handleButtonRefChange);

  const [listboxFocusRequested, requestListboxFocus] = React.useState(false);
  const listboxRef = React.useRef<HTMLElement | null>(null);

  const focusListboxIfRequested = React.useCallback(() => {
    if (listboxFocusRequested && listboxRef.current != null) {
      listboxRef.current.focus();
      requestListboxFocus(false);
    }
  }, [listboxFocusRequested]);

  const handleListboxRef = (listboxElement: HTMLUListElement) => {
    listboxRef.current = listboxElement;
    focusListboxIfRequested();
  };

  React.useEffect(() => {
    focusListboxIfRequested();
  }, [focusListboxIfRequested]);

  React.useEffect(() => {
    if (autoFocus) {
      buttonRef.current!.focus();
    }
  }, [autoFocus]);

  const handleOpenChange = (isOpen: boolean) => {
    requestListboxFocus(isOpen);
    setListboxOpen(isOpen);
    onListboxOpenChange?.(isOpen);
  };

  const {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    value,
  } = useSelect<TValue>({
    buttonComponent: Button,
    buttonRef: handleButtonRef,
    defaultValue,
    disabled: disabledProp,
    listboxId: componentsProps.listbox?.id,
    listboxRef: handleListboxRef,
    multiple: true,
    onChange,
    onOpenChange: handleOpenChange,
    open: listboxOpen,
    options,
    value: valueProp,
  });

  const ownerState: MultiSelectUnstyledOwnerState<TValue> = {
    ...props,
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open: listboxOpen,
    renderValue,
    value,
  };

  const classes = useUtilityClasses(ownerState);

  const selectedOptions = React.useMemo(() => {
    if (value == null) {
      return [];
    }
    return options.filter((o) => (value as TValue[]).includes(o.value));
  }, [options, value]);

  const buttonProps = appendOwnerState(
    Button,
    {
      ...other,
      ...componentsProps.root,
      ...getButtonProps(),
      className: clsx(className, componentsProps.root?.className, classes.root),
    },
    ownerState,
  );

  const listboxProps = appendOwnerState(
    ListboxRoot,
    {
      ...componentsProps.listbox,
      ...getListboxProps(),
      className: clsx(componentsProps.listbox?.className, classes.listbox),
    },
    ownerState,
  );

  const popperProps = appendOwnerState(
    Popper,
    {
      open: listboxOpen,
      anchorEl: buttonRef.current,
      placement: 'bottom-start',
      disablePortal: true,
      role: undefined,
      ...componentsProps.popper,
      className: clsx(componentsProps.popper?.className, classes.popper),
    },
    ownerState,
  );

  const context: SelectUnstyledContextType = {
    getOptionProps,
    getOptionState,
  };

  return (
    <React.Fragment>
      <Button {...buttonProps}>{renderValue(selectedOptions as any)}</Button>
      {buttonDefined && (
        <Popper {...popperProps}>
          <ListboxRoot {...listboxProps}>
            <SelectUnstyledContext.Provider value={context}>
              {children}
            </SelectUnstyledContext.Provider>
          </ListboxRoot>
        </Popper>
      )}
    </React.Fragment>
  );
});

MultiSelectUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    listbox: PropTypes.object,
    popper: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen: PropTypes.bool,
  /**
   * The default selected values. Use when the component is not controlled.
   * @default []
   */
  defaultValue: PropTypes.array,
  /**
   * If `true`, the select is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen: PropTypes.bool,
  /**
   * Callback fired when an option is selected.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange: PropTypes.func,
  /**
   * Function that customizes the rendering of the selected values.
   */
  renderValue: PropTypes.func,
  /**
   * The selected values.
   * Set to an empty array to deselect all options.
   */
  value: PropTypes.array,
} as any;

/**
 * The foundation for building custom-styled multi-selection select components.
 *
 * Demos:
 *
 * - [Selects](https://mui.com/components/selects/)
 *
 * API:
 *
 * - [MultiSelectUnstyled API](https://mui.com/api/multi-select-unstyled/)
 */
export default MultiSelectUnstyled as <TValue extends {}>(
  props: MultiSelectUnstyledProps<TValue> & React.RefAttributes<HTMLElement>,
) => JSX.Element | null;
