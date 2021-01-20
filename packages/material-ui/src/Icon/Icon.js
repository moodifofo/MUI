import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { deepmerge } from '@material-ui/utils';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import { getIconUtilityClass } from './iconClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(styles.root || {}, {
    ...(styleProps.color !== 'inherit' && styles[`color${capitalize(styleProps.color)}`]),
    ...styles[`fontSize${capitalize(styleProps.fontSize)}`],
  });
};

const useUtilityClasses = (styleProps) => {
  const { color, fontSize, classes } = styleProps;

  const slots = {
    root: [
      'root',
      color !== 'inherit' && `color${capitalize(color)}`,
      `fontSize${capitalize(fontSize)}`,
    ],
  };

  return composeClasses(slots, getIconUtilityClass, classes);
};

const IconRoot = experimentalStyled(
  'span',
  {},
  {
    name: 'MuiIcon',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme, styleProps }) => ({
  /* Styles applied to the root element. */
  userSelect: 'none',
  width: '1em',
  height: '1em',
  // Chrome fix for https://bugs.chromium.org/p/chromium/issues/detail?id=820541
  // To remove at some point.
  overflow: 'hidden',
  display: 'inline-block', // allow overflow hidden to take action
  textAlign: 'center', // support non-square icon
  flexShrink: 0,
  fontSize: {
    inherit: 'inherit',
    small: theme.typography.pxToRem(20),
    large: theme.typography.pxToRem(36),
  }[styleProps.fontSize],
  // TODO v5 deprecate, v6 remove for sx
  color: {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    action: theme.palette.action.active,
    error: theme.palette.error.main,
    disabled: theme.palette.action.disabled,
    inherit: undefined,
  }[styleProps.color],
}));

const Icon = React.forwardRef(function Icon(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiIcon' });
  const {
    baseClassName = 'material-icons',
    className,
    color = 'inherit',
    component: Component = 'span',
    fontSize = 'medium',
    ...other
  } = props;

  const styleProps = {
    ...props,
    fontSize,
    baseClassName,
    color,
    component: Component,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <IconRoot
      as={Component}
      className={clsx(
        baseClassName,
        // Prevent the translation of the text content.
        // The font relies on the exact text content to render the icon.
        'notranslate',
        classes.root,
        className,
      )}
      styleProps={styleProps}
      aria-hidden
      ref={ref}
      {...other}
    />
  );
});

Icon.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The base class applied to the icon. Defaults to 'material-icons', but can be changed to any
   * other base class that suits the icon font you're using (e.g. material-icons-rounded, fas, etc).
   * @default 'material-icons'
   */
  baseClassName: PropTypes.string,
  /**
   * The name of the icon font ligature.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'inherit'
   */
  color: PropTypes.oneOf(['action', 'disabled', 'error', 'inherit', 'primary', 'secondary']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: PropTypes.oneOf(['inherit', 'large', 'medium', 'small']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

Icon.muiName = 'Icon';

export default Icon;
