import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import composeClasses from './composeClasses';
import useThemeProps from './useThemeProps';
import useTheme from './useTheme';
import systemStyled from './styled';
import { getContainerUtilityClass as defaultGetContainerUtilityClasses } from './Container/containerClasses';

const useUtilityClasses = (ownerState, getContainerUtilityClass) => {
  const { classes, fixed, disableGutters, maxWidth } = ownerState;

  const slots = {
    root: [
      'root',
      maxWidth && `maxWidth${capitalize(String(maxWidth))}`,
      fixed && 'fixed',
      disableGutters && 'disableGutters',
    ],
  };

  return composeClasses(slots, getContainerUtilityClass, classes);
};

export default function createContainer(options = {}) {
  const {
    defaultTheme,
    // This will allow adding custom styled fn (for example for custom sx style function)
    styled = systemStyled,
    getContainerUtilityClass = defaultGetContainerUtilityClasses,
  } = options;

  const ContainerRoot = styled('div', {
    name: 'MuiContainer',
    slot: 'Root',
    overridesResolver: (props, styles) => {
      const { ownerState } = props;

      return [
        styles.root,
        styles[`maxWidth${capitalize(String(ownerState.maxWidth))}`],
        ownerState.fixed && styles.fixed,
        ownerState.disableGutters && styles.disableGutters,
      ];
    },
  })(
    ({ theme, ownerState }) => ({
      width: '100%',
      marginLeft: 'auto',
      boxSizing: 'border-box',
      marginRight: 'auto',
      display: 'block', // Fix IE11 layout when used with main.
      ...(!ownerState.disableGutters && {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
        },
      }),
    }),
    ({ theme, ownerState }) =>
      ownerState.fixed &&
      Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
        const value = theme.breakpoints.values[breakpoint];

        if (value !== 0) {
          acc[theme.breakpoints.up(breakpoint)] = {
            maxWidth: `${value}${theme.breakpoints.unit}`,
          };
        }
        return acc;
      }, {}),
    ({ theme, ownerState }) => ({
      ...(ownerState.maxWidth === 'xs' && {
        [theme.breakpoints.up('xs')]: {
          maxWidth: Math.max(theme.breakpoints.values.xs, 444),
        },
      }),
      ...(ownerState.maxWidth &&
        ownerState.maxWidth !== 'xs' && {
          [theme.breakpoints.up(ownerState.maxWidth)]: {
            maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`,
          },
        }),
    }),
  );

  const Container = React.forwardRef(function Container(inProps, ref) {
    const theme = useTheme(defaultTheme);
    const props = useThemeProps({ props: inProps, name: 'MuiContainer', defaultTheme });
    const {
      className,
      component = 'div',
      disableGutters = false,
      fixed = false,
      maxWidth = 'lg',
      classes: classesProp,
      ...other
    } = props;

    const ownerState = {
      ...props,
      component,
      disableGutters,
      fixed,
      maxWidth,
    };

    const classes = useUtilityClasses(ownerState, getContainerUtilityClass);

    return (
      <ContainerRoot
        as={component}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        ref={ref}
        theme={theme}
        {...other}
      />
    );
  });

  Container.propTypes /* remove-proptypes */ = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
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
     * If `true`, the left and right padding is removed.
     * @default false
     */
    disableGutters: PropTypes.bool,
    /**
     * Set the max-width to match the min-width of the current breakpoint.
     * This is useful if you'd prefer to design for a fixed set of sizes
     * instead of trying to accommodate a fully fluid viewport.
     * It's fluid by default.
     * @default false
     */
    fixed: PropTypes.bool,
    /**
     * Determine the max-width of the container.
     * The container width grows with the size of the screen.
     * Set to `false` to disable `maxWidth`.
     * @default 'lg'
     */
    maxWidth: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
      PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
      PropTypes.string,
    ]),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
      PropTypes.func,
      PropTypes.object,
    ]),
  };

  return Container;
}
