'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useSnackbar } from '@mui/base/useSnackbar';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import { keyframes } from '@mui/system';
import { ColorInversionProvider } from '../styles/ColorInversion';
import useSlot from '../utils/useSlot';
import styled from '../styles/styled';
import { useThemeProps } from '../styles';
import { resolveSxValue } from '../styles/styleUtils';
import { SnackbarProps, SnackbarOwnerState, SnackbarTypeMap } from './SnackbarProps';
import { getSnackbarUtilityClass } from './snackbarClasses';

const useUtilityClasses = (ownerState: SnackbarOwnerState) => {
  const { variant, color, size, anchorOrigin } = ownerState;

  const slots = {
    root: [
      'root',
      size && `size${capitalize(size)}`,
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
      `anchorOrigin${capitalize(anchorOrigin!.vertical)}${capitalize(anchorOrigin!.horizontal)}`,
    ],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
  };

  return composeClasses(slots, getSnackbarUtilityClass, {});
};

const inAnimationVerticalTop = keyframes`
  0% {
    transform: translateY(-24px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const outAnimationVerticalTop = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-24px);
    opacity: 0;
  }
`;

const inAnimationVerticalBottom = keyframes`
  0% {
    transform: translateY(24px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const outAnimationVerticalBottom = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(24px);
    opacity: 0;
  }
`;

const SnackbarRoot = styled('div', {
  name: 'JoySnackbar',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SnackbarOwnerState }>(({ theme, ownerState }) => {
  const { p, padding, borderRadius } = resolveSxValue({ theme, ownerState }, [
    'p',
    'padding',
    'borderRadius',
  ]);

  return [
    {
      zIndex: theme.vars.zIndex.snackbar,
      position: 'fixed',
      display: 'flex',
      left: 8,
      right: 8,
      justifyContent: 'flex-start',
      alignItems: 'center',
      minWidth: 300,
      ...(ownerState.anchorOrigin!.vertical === 'top' ? { top: 8 } : { bottom: 8 }),
      [theme.breakpoints.up('sm')]: {
        ...(ownerState.anchorOrigin!.vertical === 'top' ? { top: 24 } : { bottom: 24 }),
        ...(ownerState.anchorOrigin!.horizontal === 'center' && {
          left: '50%',
          right: 'auto',
          marginLeft: -150,
        }),
        ...(ownerState.anchorOrigin!.horizontal === 'left' && {
          left: 24,
          right: 'auto',
        }),
        ...(ownerState.anchorOrigin!.horizontal === 'right' && {
          right: 24,
          left: 'auto',
        }),
      },
      ...(ownerState.open && {
        animation: `${
          ownerState.anchorOrigin!.vertical === 'top'
            ? inAnimationVerticalTop
            : inAnimationVerticalBottom
        } ${ownerState.animationDuration}ms`,
      }),
      ...(!ownerState.open && {
        animation: `${
          ownerState.anchorOrigin!.vertical === 'top'
            ? outAnimationVerticalTop
            : outAnimationVerticalBottom
        } ${ownerState.animationDuration}ms`,
      }),
      '--Snackbar-radius': theme.vars.radius.sm,
      '--Snackbar-decoratorChildRadius':
        'max((var(--Snackbar-radius) - var(--variant-borderWidth, 0px)) - var(--Snackbar-padding), min(var(--Snackbar-padding) + var(--variant-borderWidth, 0px), var(--Snackbar-radius) / 2))',
      '--Button-minHeight': 'var(--Snackbar-decoratorChildHeight)',
      '--IconButton-size': 'var(--Snackbar-decoratorChildHeight)',
      '--Button-radius': 'var(--Snackbar-decoratorChildRadius)',
      '--IconButton-radius': 'var(--Snackbar-decoratorChildRadius)',
      '--Icon-color': 'currentColor',
      ...(ownerState.size === 'sm' && {
        '--Snackbar-padding': '0.5rem',
        '--Snackbar-decoratorChildHeight': '1.5rem',
        '--Icon-fontSize': theme.vars.fontSize.xl,
        gap: '0.5rem',
      }),
      ...(ownerState.size === 'md' && {
        '--Snackbar-padding': '0.75rem',
        '--Snackbar-decoratorChildHeight': '2rem',
        '--Icon-fontSize': theme.vars.fontSize.xl,
        gap: '0.625rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Snackbar-padding': '1rem',
        '--Snackbar-decoratorChildHeight': '2.375rem',
        '--Icon-fontSize': theme.vars.fontSize.xl2,
        gap: '0.875rem',
      }),
      boxShadow: theme.vars.shadow.md,
      backgroundColor: theme.vars.palette.background.surface,
      padding: `var(--Snackbar-padding)`,
      borderRadius: 'var(--Snackbar-radius)',
      ...theme.typography[`body-${({ sm: 'xs', md: 'sm', lg: 'md' } as const)[ownerState.size!]}`],
      fontWeight: theme.vars.fontWeight.md,
      ...theme.variants[ownerState.variant!]?.[ownerState.color!],
    } as const,
    ownerState.color !== 'context' &&
      ownerState.invertedColors &&
      theme.colorInversion[ownerState.variant!]?.[ownerState.color!],
    p !== undefined && { '--Snackbar-padding': p },
    padding !== undefined && { '--Snackbar-padding': padding },
    borderRadius !== undefined && { '--Snackbar-radius': borderRadius },
  ];
});

const SnackbarStartDecorator = styled('span', {
  name: 'JoySnackbar',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})({
  display: 'inherit',
  flex: 'none',
});

const SnackbarEndDecorator = styled('span', {
  name: 'JoySnackbar',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})({
  display: 'inherit',
  flex: 'none',
  marginLeft: 'auto',
});

function useDelayUnmount(isMounted: boolean, delayTime: number) {
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    let timeoutId: number;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = window.setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => window.clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
}

/**
 *
 * Demos:
 *
 * - [Snackbar](https://mui.com/joy-ui/react-snackbar/)
 *
 * API:
 *
 * - [Snackbar API](https://mui.com/joy-ui/api/snackbar/)
 */
const Snackbar = React.forwardRef(function Snackbar(inProps, ref) {
  const props = useThemeProps<typeof inProps & SnackbarProps>({
    props: inProps,
    name: 'JoySnackbar',
  });

  const {
    anchorOrigin: { vertical, horizontal } = { vertical: 'bottom', horizontal: 'left' },
    animationDuration = 500,
    autoHideDuration = null,
    color = 'neutral',
    children,
    className,
    ClickAwayListenerProps,
    component,
    disableWindowBlurListener = false,
    invertedColors = false,
    onBlur,
    onClose,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    open,
    resumeHideDuration,
    size = 'md',
    slots = {},
    slotProps,
    variant = 'outlined',
    ...other
  } = props;

  const ownerState = {
    ...props,
    anchorOrigin: { vertical, horizontal },
    autoHideDuration,
    color,
    animationDuration,
    disableWindowBlurListener,
    invertedColors,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const { getRootProps, onClickAway } = useSnackbar({ ...ownerState });

  const shouldRender = useDelayUnmount(open, animationDuration);

  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: SnackbarRoot,
    externalForwardedProps,
    getSlotProps: getRootProps,
    ownerState,
  });

  const [SlotStartDecorator, startDecoratorProps] = useSlot('startDecorator', {
    className: classes.startDecorator,
    elementType: SnackbarStartDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotEndDecorator, endDecoratorProps] = useSlot('endDecorator', {
    className: classes.endDecorator,
    elementType: SnackbarEndDecorator,
    externalForwardedProps,
    ownerState,
  });

  if (!shouldRender) {
    return null;
  }

  const result = (
    <React.Fragment>
      {slots.startDecorator && (
        <SlotStartDecorator {...startDecoratorProps}>{<slots.startDecorator />}</SlotStartDecorator>
      )}

      {children}
      {slots.endDecorator && (
        <SlotEndDecorator {...endDecoratorProps}>{<slots.endDecorator />}</SlotEndDecorator>
      )}
    </React.Fragment>
  );

  return (
    <ClickAwayListener onClickAway={onClickAway} {...ClickAwayListenerProps}>
      <SlotRoot {...rootProps}>
        {invertedColors ? (
          <ColorInversionProvider variant={variant}>{result}</ColorInversionProvider>
        ) : (
          result
        )}
      </SlotRoot>
    </ClickAwayListener>
  );
}) as OverridableComponent<SnackbarTypeMap>;

Snackbar.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The anchor of the `Snackbar`.
   * On smaller screens, the component grows to occupy all the available width,
   * the horizontal alignment is ignored.
   * @default { vertical: 'bottom', horizontal: 'left' }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['center', 'left', 'right']).isRequired,
    vertical: PropTypes.oneOf(['bottom', 'top']).isRequired,
  }),
  /**
   * The duration of the animation in milliseconds. This value is used to control
   * the length of time it takes for an animation to complete one cycle. It is also
   * utilized for delaying the unmount of the component.
   * Provide this value if you have your own animation so that we can precisely
   * time the component's unmount to match your custom animation.
   * @default 500
   */
  animationDuration: PropTypes.number,
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default null
   */
  autoHideDuration: PropTypes.number,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Props applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps: PropTypes.object,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   * @default false
   */
  disableWindowBlurListener: PropTypes.bool,
  /**
   * If `true`, the children with an implicit color prop invert their colors to match the component's variant and color.
   * @default false
   */
  invertedColors: PropTypes.bool,
  /**
   * When displaying multiple consecutive snackbars using a single parent-rendered
   * `<Snackbar/>`, add the `key` prop to ensure independent treatment of each message.
   * For instance, use `<Snackbar key={message} />`. Otherwise, messages might update
   * in place, and features like `autoHideDuration` could be affected.
   */
  key: () => null,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
   */
  onClose: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onMouseEnter: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration: PropTypes.number,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    endDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    endDecorator: PropTypes.elementType,
    root: PropTypes.elementType,
    startDecorator: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default Snackbar;
