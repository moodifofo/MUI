import * as React from 'react';
import {
  unstable_setRef as setRef,
  unstable_useForkRef as useForkRef,
  unstable_useIsFocusVisible as useIsFocusVisible,
} from '@mui/utils';
import UseButtonProps from './UseButtonProps';
import extractEventHandlers from '../utils/extractEventHandlers';

export default function useButton(props: UseButtonProps) {
  const { component, components = {}, disabled = false, href, ref, tabIndex = 0, to, type } = props;

  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();

  const [active, setActive] = React.useState<boolean>(false);

  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  const [focusVisible, setFocusVisible] = React.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }

  React.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);

  const createHandleMouseLeave =
    (otherHandlers: Record<string, React.EventHandler<any>>) => (event: React.MouseEvent) => {
      if (focusVisible) {
        event.preventDefault();
      }

      otherHandlers.onMouseLeave?.(event);
    };

  const createHandleBlur =
    (otherHandlers: Record<string, React.EventHandler<any>>) => (event: React.FocusEvent) => {
      handleBlurVisible(event);

      if (isFocusVisibleRef.current === false) {
        setFocusVisible(false);
      }

      otherHandlers.onBlur?.(event);
    };

  const createHandleFocus =
    (otherHandlers: Record<string, React.EventHandler<any>>) =>
    (event: React.FocusEvent<HTMLButtonElement>) => {
      // Fix for https://github.com/facebook/react/issues/7769
      if (!buttonRef.current) {
        buttonRef.current = event.currentTarget;
      }

      handleFocusVisible(event);
      if (isFocusVisibleRef.current === true) {
        setFocusVisible(true);
        otherHandlers.onFocusVisible?.(event);
      }

      otherHandlers.onFocus?.(event);
    };

  const elementType = component ?? components.Root ?? 'button';

  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return (
      elementType !== 'button' && !(button?.tagName === 'A' && (button as HTMLAnchorElement)?.href)
    );
  };

  const createHandleMouseDown =
    (otherHandlers: Record<string, React.EventHandler<any>>) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event.target === event.currentTarget && !disabled) {
        setActive(true);
      }

      otherHandlers.onMouseDown?.(event);
    };

  const createHandleMouseUp =
    (otherHandlers: Record<string, React.EventHandler<any>>) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event.target === event.currentTarget) {
        setActive(false);
      }

      otherHandlers.onMouseUp?.(event);
    };

  const createHandleKeyDown =
    (otherHandlers: Record<string, React.EventHandler<any>>) => (event: React.KeyboardEvent) => {
      otherHandlers.onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (event.target === event.currentTarget && isNonNativeButton() && event.key === ' ') {
        event.preventDefault();
      }

      if (event.target === event.currentTarget && event.key === ' ' && !disabled) {
        setActive(true);
      }

      // Keyboard accessibility for non interactive elements
      if (
        event.target === event.currentTarget &&
        isNonNativeButton() &&
        event.key === 'Enter' &&
        !disabled
      ) {
        otherHandlers.onClick?.(event);
        event.preventDefault();
      }
    };

  const createHandleKeyUp =
    (otherHandlers: Record<string, React.EventHandler<any>>) => (event: React.KeyboardEvent) => {
      // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
      // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0

      if (event.target === event.currentTarget) {
        setActive(false);
      }

      otherHandlers.onKeyUp?.(event);

      // Keyboard accessibility for non interactive elements
      if (
        event.target === event.currentTarget &&
        isNonNativeButton() &&
        event.key === ' ' &&
        !event.defaultPrevented
      ) {
        otherHandlers.onClick?.(event);
      }
    };

  const handleOwnRef = useForkRef(focusVisibleRef, buttonRef);
  const handleRef = useForkRef(ref, handleOwnRef);

  const [hostElementName, setHostElementName] = React.useState<string>('');

  const updateRef = (instance: HTMLElement | null) => {
    setHostElementName(instance?.tagName ?? '');
    setRef(handleRef, instance);
  };

  const buttonProps: Record<string, unknown> = {};

  if (hostElementName === 'BUTTON') {
    buttonProps.type = type ?? 'button';
    buttonProps.disabled = disabled;
  } else if (hostElementName !== '') {
    if (!href && !to) {
      buttonProps.role = 'button';
    }
    if (disabled) {
      buttonProps['aria-disabled'] = disabled;
    }
  }

  const getRootProps = (otherHandlers?: Record<string, React.EventHandler<any>>) => {
    const propsEventHandlers = extractEventHandlers(props);
    const externalEventHandlers = { ...propsEventHandlers, ...otherHandlers };

    const ownEventHandlers = {
      onBlur: createHandleBlur(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      onKeyUp: createHandleKeyUp(externalEventHandlers),
      onMouseDown: createHandleMouseDown(externalEventHandlers),
      onMouseLeave: createHandleMouseLeave(externalEventHandlers),
      onMouseUp: createHandleMouseUp(externalEventHandlers),
    };

    const mergedEventHandlers: Record<string, React.EventHandler<any>> = {
      ...externalEventHandlers,
      ...ownEventHandlers,
    };

    // onFocusVisible can be present on the props, but since it's not a valid React event handler,
    // it must not be forwarded to the inner component.
    delete mergedEventHandlers.onFocusVisible;

    return {
      tabIndex: disabled ? -1 : tabIndex,
      type,
      ...buttonProps,
      ...mergedEventHandlers,
      ref: updateRef,
    };
  };

  return {
    getRootProps,
    focusVisible,
    setFocusVisible,
    disabled,
    active,
  };
}
