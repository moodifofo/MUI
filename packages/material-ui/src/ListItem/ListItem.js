import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import { isMuiElement } from '../utils/reactHelpers';
import ListContext from '../List/ListContext';

export const styles = theme => ({
  /* Styles applied to the (normally root) `component` element. May be wrapped by a `container`. */
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'left',
    paddingTop: 8,
    paddingBottom: 8,
    '&$selected, &$selected:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  /* Styles applied to the `container` element if `children` includes `ListItemSecondaryAction`. */
  container: {
    position: 'relative',
  },
  // To remove in v4
  /* Styles applied to the `component`'s `focusVisibleClassName` property if `button={true}`. */
  focusVisible: {
    backgroundColor: theme.palette.action.selected,
  },
  /* Styles applied to the `component` element if dense. */
  dense: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  /* Styles applied to the `component` element if `alignItems="flex-start"`. */
  alignItemsFlexStart: {
    alignItems: 'flex-start',
  },
  /* Styles applied to the inner `component` element if `disabled={true}`. */
  disabled: {
    opacity: 0.5,
  },
  /* Styles applied to the inner `component` element if `divider={true}`. */
  divider: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundClip: 'padding-box',
  },
  /* Styles applied to the inner `component` element if `disableGutters={false}`. */
  gutters: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  /* Styles applied to the inner `component` element if `button={true}`. */
  button: {
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Styles applied to the `component` element if `children` includes `ListItemSecondaryAction`. */
  secondaryAction: {
    // Add some space to avoid collision as `ListItemSecondaryAction`
    // is absolutely positioned.
    paddingRight: 48,
  },
  /* Styles applied to the root element if `selected={true}`. */
  selected: {},
});

/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 */
const ListItem = React.forwardRef(function ListItem(props, ref) {
  const {
    alignItems,
    button,
    children: childrenProp,
    classes,
    className,
    component: componentProp,
    ContainerComponent,
    ContainerProps: { className: ContainerClassName, ...ContainerProps } = {},
    dense,
    disabled,
    disableGutters,
    divider,
    focusVisibleClassName,
    selected,
    ...other
  } = props;

  const context = React.useContext(ListContext);
  const childContext = {
    dense: dense || context.dense || false,
    alignItems,
  };

  const children = React.Children.toArray(childrenProp);
  const hasSecondaryAction =
    children.length && isMuiElement(children[children.length - 1], ['ListItemSecondaryAction']);

  const componentProps = {
    className: clsx(
      classes.root,
      {
        [classes.dense]: childContext.dense,
        [classes.gutters]: !disableGutters,
        [classes.divider]: divider,
        [classes.disabled]: disabled,
        [classes.button]: button,
        [classes.alignItemsFlexStart]: alignItems === 'flex-start',
        [classes.secondaryAction]: hasSecondaryAction,
        [classes.selected]: selected,
      },
      className,
    ),
    disabled,
    ...other,
  };
  let Component = componentProp || 'li';

  if (button) {
    componentProps.component = componentProp || 'div';
    componentProps.focusVisibleClassName = clsx(classes.focusVisible, focusVisibleClassName);
    Component = ButtonBase;
  }

  // Avoid nesting of li > li.
  if (ContainerComponent === 'li') {
    if (Component === 'li') {
      Component = 'div';
    } else if (componentProps.component === 'li') {
      componentProps.component = 'div';
    }
  }

  return (
    <ListContext.Provider value={childContext}>
      <ContainerComponent
        className={clsx(classes.container, ContainerClassName)}
        ref={ref}
        {...ContainerProps}
      >
        <Component {...componentProps}>{children}</Component>
        {hasSecondaryAction ? children.pop() : null}
      </ContainerComponent>
    </ListContext.Provider>
  );
});

ListItem.propTypes = {
  /**
   * Defines the `align-items` style property.
   */
  alignItems: PropTypes.oneOf(['flex-start', 'center']),
  /**
   * If `true`, the list item will be a button (using `ButtonBase`).
   */
  button: PropTypes.bool,
  /**
   * The content of the component. If a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children: chainPropTypes(PropTypes.node, props => {
    const children = React.Children.toArray(props.children);

    // React.Children.toArray(props.children).findLastIndex(isListItemSecondaryAction)
    let secondaryActionIndex = -1;
    for (let i = children.length - 1; i >= 0; i -= 1) {
      const child = children[i];
      if (isMuiElement(child, ['ListItemSecondaryAction'])) {
        secondaryActionIndex = i;
        break;
      }
    }

    //  is ListItemSecondaryAction the last child of ListItem
    if (secondaryActionIndex !== -1 && secondaryActionIndex !== children.length - 1) {
      return new Error(
        'Material-UI: you used an element after ListItemSecondaryAction. ' +
          'For ListItem to detect that it has a secondary action ' +
          'you must pass it as the last child to ListItem.',
      );
    }

    return null;
  }),
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * By default, it's a `li` when `button` is `false` and a `div` when `button` is `true`.
   */
  component: PropTypes.elementType,
  /**
   * The container component used when a `ListItemSecondaryAction` is the last child.
   */
  ContainerComponent: PropTypes.elementType,
  /**
   * Properties applied to the container component if used.
   */
  ContainerProps: PropTypes.object,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used.
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the list item will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   */
  divider: PropTypes.bool,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * Use to apply selected styling.
   */
  selected: PropTypes.bool,
};

ListItem.defaultProps = {
  alignItems: 'center',
  button: false,
  component: 'li',
  ContainerComponent: 'li',
  disabled: false,
  disableGutters: false,
  divider: false,
  selected: false,
};

export default withStyles(styles, { name: 'MuiListItem' })(ListItem);
