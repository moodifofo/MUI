'use client';
import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSnackbar } from '@mui/base/useSnackbar';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
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
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: 300,
      ...(ownerState.anchorOrigin!.vertical === 'top' ? { top: 8 } : { bottom: 8 }),
      ...(ownerState.anchorOrigin!.horizontal === 'left' && { justifyContent: 'flex-start' }),
      ...(ownerState.anchorOrigin!.horizontal === 'right' && { justifyContent: 'flex-end' }),
      [theme.breakpoints.up('sm')]: {
        ...(ownerState.anchorOrigin!.vertical === 'top' ? { top: 24 } : { bottom: 24 }),
        ...(ownerState.anchorOrigin!.horizontal === 'center' && {
          left: '50%',
          right: 'auto',
          transform: 'translateX(-50%)',
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
      '--Snackbar-radius': theme.vars.radius.sm,
      '--Snackbar-decoratorChildRadius':
        'max((var(--Snackbar-radius) - var(--variant-borderWidth, 0px)) - var(--Snackbar-padding), min(var(--Snackbar-padding) + var(--variant-borderWidth, 0px), var(--Snackbar-radius) / 2))',
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
      backgroundColor: theme.vars.palette.background.surface,
      padding: `var(--Snackbar-padding)`,
      borderRadius: 'var(--Snackbar-radius)',
      ...theme.typography[`body-${({ sm: 'xs', md: 'sm', lg: 'md' } as const)[ownerState.size!]}`],
      fontWeight: theme.vars.fontWeight.md,
      ...theme.variants[ownerState.variant!]?.[ownerState.color!],
    } as const,
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

const Snackbar = React.forwardRef(function Snackbar(inProps, ref) {
  const props = useThemeProps<typeof inProps & SnackbarProps>({
    props: inProps,
    name: 'JoySnackbar',
  });

  const {
    anchorOrigin: { vertical, horizontal } = { vertical: 'bottom', horizontal: 'left' },
    autoHideDuration = null,
    color = 'neutral',
    children,
    className,
    component,
    disableWindowBlurListener = false,
    onBlur,
    onClose,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    open,
    resumeHideDuration,
    size = 'md',
    slots,
    slotProps,
    variant = 'outlined',
    ...other
  } = props;

  const ownerState = {
    ...props,
    anchorOrigin: { vertical, horizontal },
    autoHideDuration,
    color,
    disableWindowBlurListener,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const { getRootProps } = useSnackbar({ ...ownerState });

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

  if (!open) {
    return null;
  }

  return (
    <SlotRoot {...rootProps}>
      {slots?.startDecorator && (
        <SlotStartDecorator {...startDecoratorProps}>
          {slots?.startDecorator as React.ReactNode}
        </SlotStartDecorator>
      )}
      {children}
      {slots?.endDecorator && (
        <SlotEndDecorator {...endDecoratorProps}>
          {slots?.endDecorator as React.ReactNode}
        </SlotEndDecorator>
      )}
    </SlotRoot>
  );
}) as OverridableComponent<SnackbarTypeMap>;

export default Snackbar;
