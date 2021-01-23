import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import { alpha } from '../styles/colorManipulator';
import dividerClasses, { getDividerUtilityClass } from './dividerClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(styles.root || {}, {
    ...styles[styleProps.variant],
    ...(styleProps.absolute && styles.absolute),
    ...(styleProps.flexItem && styles.flexItem),
    ...(styleProps.light && styles.light),
    ...(styleProps.orientation === 'vertical' && styles.vertical),
    ...(styleProps.children && styles.withChildren),
    ...(styleProps.children &&
      styleProps.orientation === 'vertical' &&
      styles.withChildrenVertical),
    ...(styleProps.textAlign === 'right' &&
      styleProps.orientation !== 'vertical' &&
      styles.textAlignRight),
    ...(styleProps.textAlign === 'left' &&
      styleProps.orientation !== 'vertical' &&
      styles.textAlignLeft),
    [`&.${dividerClasses.wrapper}`]: styles.wrapper,
    [`&.${dividerClasses.wrapper} .${dividerClasses.wrapperVertical}`]: styles.wrapperVertical,
  });
};

const useUtilityClasses = (styleProps) => {
  const {
    classes,
    variant,
    absolute,
    flexItem,
    light,
    orientation,
    children,
    textAlign,
  } = styleProps;

  const slots = {
    root: [
      'root',
      variant,
      absolute && 'absolute',
      flexItem && 'flexItem',
      light && 'light',
      orientation === 'vertical' && 'vertical',
      children && 'withChildren',
      children && orientation === 'vertical' && 'withChildrenVertical',
      textAlign === 'right' && orientation !== 'vertical' && 'textAlignRight',
      textAlign === 'left' && orientation !== 'vertical' && 'textAlignLeft',
    ],
    wrapper: ['wrapper', orientation === 'vertical' && 'wrapperVertical'],
  };

  return composeClasses(slots, getDividerUtilityClass, classes);
};

const DividerRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiXyz',
    slot: 'Root',
    overridesResolver,
  },
)(
  ({ theme }) => ({
    /* Styles applied to the root element. */
    margin: 0, // Reset browser default style.
    flexShrink: 0,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    borderBottomWidth: 'thin',
  }),
  ({ styleProps }) => ({
    /* Styles applied to the root element if `absolute={true}`. */
    ...(styleProps.absolute && {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
    }),
  }),
  ({ theme, styleProps }) => ({
    /* Styles applied to the root element if `variant="inset"`. */
    ...(styleProps.variant === 'inset' && {
      marginLeft: 72,
    }),
    /* Styles applied to the root element if `variant="middle"`. */
    ...(styleProps.variant === 'middle' && {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    }),
  }),
  ({ theme, styleProps }) => ({
    /* Styles applied to the root element if `light={true}`. */
    ...(styleProps.light && {
      borderColor: alpha(theme.palette.divider, 0.08),
    }),
  }),
  ({ styleProps }) => ({
    /* Styles applied to the root element if `orientation="vertical"`. */
    ...(styleProps.orientation === 'vertical' && {
      height: '100%',
      borderBottomWidth: 0,
      borderRightWidth: 'thin',
    }),
  }),
  ({ styleProps }) => ({
    /* Styles applied to the root element if `flexItem={true}`. */
    ...(styleProps.flexItem && {
      alignSelf: 'stretch',
      height: 'auto',
    }),
  }),
  ({ theme, styleProps }) => ({
    /* Styles applied to the root element if divider have text. */
    ...(styleProps.children && {
      display: 'flex',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      border: 0,
      '&::before, &::after': {
        position: 'relative',
        width: '100%',
        borderColor: theme.palette.divider,
        borderTop: 'thin',
        borderLeft: 0,
        borderRight: 0,
        borderBottom: 0,
        borderStyle: 'solid',
        top: '50%',
        content: '""',
        transform: 'translateY(50%)',
      },
    }),
    /* Styles applied to the root element if divider have text and `orientation="vertical"`. */
    ...(styleProps.children &&
      styleProps.orientation === 'vertical' && {
        flexDirection: 'column',
        '&::before, &::after': {
          height: '100%',
          top: '0%',
          left: '50%',
          borderColor: theme.palette.divider,
          borderTop: 0,
          borderLeft: 'thin',
          borderStyle: 'solid',
          transform: 'translateX(0%)',
        },
      }),
  }),
  ({ styleProps }) => ({
    /* Styles applied to the root element if `textAlign="right" orientation="horizontal"`. */
    ...(styleProps.textAlign === 'right' &&
      styleProps.orientation !== 'vertical' && {
        '&::before': {
          width: '90%',
        },
        '&::after': {
          width: '10%',
        },
      }),
    /* Styles applied to the root element if `textAlign="left" orientation="horizontal"`. */
    ...(styleProps.textAlign === 'left' &&
      styleProps.orientation !== 'vertical' && {
        '&::before': {
          width: '10%',
        },
        '&::after': {
          width: '90%',
        },
      }),
  }),
);

const DividerWrapper = experimentalStyled(
  'span',
  {},
  {
    name: 'MuiDivider',
    slot: 'Wrapper',
  },
)(
  ({ theme }) => ({
    display: 'inline-block',
    paddingLeft: theme.spacing(1.2),
    paddingRight: theme.spacing(1.2),
  }),
  ({ theme, styleProps }) => ({
    ...(styleProps.orientation === 'vertical' && {
      paddingTop: theme.spacing(1.2),
      paddingBottom: theme.spacing(1.2),
    }),
  }),
);

const Divider = React.forwardRef(function Divider(props, ref) {
  const {
    absolute = false,
    className,
    children,
    component = children ? 'div' : 'hr',
    flexItem = false,
    light = false,
    orientation = 'horizontal',
    role = component !== 'hr' ? 'separator' : undefined,
    textAlign = 'center',
    variant = 'fullWidth',
    ...other
  } = props;

  const styleProps = {
    ...props,
    absolute,
    children,
    flexItem,
    light,
    orientation,
    role,
    textAlign,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <DividerRoot
      as={component}
      className={clsx(classes.root, className)}
      role={role}
      ref={ref}
      styleProps={styleProps}
      {...other}
    >
      {children ? (
        <DividerWrapper className={classes.wrapper} styleProps={styleProps}>
          {children}
        </DividerWrapper>
      ) : null}
    </DividerRoot>
  );
});

Divider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Absolutely position the element.
   * @default false
   */
  absolute: PropTypes.bool,
  /**
   * The content of the component.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem: PropTypes.bool,
  /**
   * If `true`, the divider will have a lighter color.
   * @default false
   */
  light: PropTypes.bool,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The text alignment.
   * @default 'center'
   */
  textAlign: PropTypes.oneOf(['center', 'left', 'right']),
  /**
   * The variant to use.
   * @default 'fullWidth'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['fullWidth', 'inset', 'middle']),
    PropTypes.string,
  ]),
};

export default Divider;
