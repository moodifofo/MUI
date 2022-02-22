import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MenuItemUnstyledProps from './MenuItemUnstyledProps';
import { appendOwnerState } from '../utils';
import { getMenuItemUnstyledUtilityClass } from './menuItemUnstyledClasses';
import useMenuItem from './useMenuItem';
import composeClasses from '../composeClasses';

export interface MenuItemState {
  disabled: boolean;
  focusVisible: boolean;
}

function getUtilityClasses(ownerState: MenuItemState) {
  const { disabled, focusVisible } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible'],
  };

  return composeClasses(slots, getMenuItemUnstyledUtilityClass, {});
}

/**
 *
 * Demos:
 *
 * - [Menus](https://mui.com/components/menus/)
 *
 * API:
 *
 * - [MenuItemUnstyled API](https://mui.com/api/menu-item-unstyled/)
 */
const MenuItemUnstyled = React.forwardRef(function MenuItemUnstyled(
  props: MenuItemUnstyledProps & React.ComponentPropsWithoutRef<'li'>,
  ref: React.Ref<any>,
) {
  const {
    children,
    className,
    disabled = false,
    component,
    components = {},
    componentsProps = {},
    ...other
  } = props;

  const Root = component ?? components.Root ?? 'li';

  const { getRootProps, itemState, focusVisible } = useMenuItem({
    component: Root,
    disabled,
    ref,
  });

  if (itemState == null) {
    return null;
  }

  const ownerState: MenuItemState = { ...props, ...itemState, focusVisible };

  const classes = getUtilityClasses(ownerState);

  const rootProps = appendOwnerState(
    Root,
    {
      ...other,
      ...componentsProps.root,
      ...getRootProps(other),
      className: clsx(classes.root, className, componentsProps.root?.className),
    },
    ownerState,
  );

  return <Root {...rootProps}>{children}</Root>;
});

MenuItemUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
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
   * @ignore
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * @ignore
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.object,
  }),
  /**
   * If `true`, the menu item will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
} as any;

export default MenuItemUnstyled;
