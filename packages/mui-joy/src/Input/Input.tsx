import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { useSlotProps, EventHandlers } from '@mui/base/utils';
import { styled, useThemeProps } from '../styles';
import { InputTypeMap, InputProps } from './InputProps';
import inputClasses, { getInputUtilityClass } from './inputClasses';
import useForwardedInput from './useForwardedInput';

const useUtilityClasses = (ownerState: InputProps) => {
  const { disabled, fullWidth, variant, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      fullWidth && 'fullWidth',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    input: ['input'],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
  };

  return composeClasses(slots, getInputUtilityClass, {});
};

const InputRoot = styled('div', {
  name: 'JoyInput',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: InputProps }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[`${ownerState.variant!}`]?.[ownerState.color!];
  return [
    {
      '--Input-radius': theme.vars.radius.sm,
      '--Input-gap': '0.5rem',
      '--Input-placeholderOpacity': 0.5,
      '--Input-focusedThickness': theme.vars.focus.thickness,
      '--Input-focusedHighlight':
        theme.vars.palette[ownerState.color === 'neutral' ? 'primary' : ownerState.color!]?.[500],
      ...(ownerState.size === 'sm' && {
        '--Input-minHeight': '2rem',
        '--Input-paddingInline': '0.5rem',
        '--Input-decorator-childHeight': 'min(1.5rem, var(--Input-minHeight))',
        '--Icon-fontSize': '1.25rem',
      }),
      ...(ownerState.size === 'md' && {
        '--Input-minHeight': '2.5rem',
        '--Input-paddingInline': '0.75rem',
        '--Input-decorator-childHeight': 'min(2rem, var(--Input-minHeight))',
        '--Icon-fontSize': '1.5rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Input-minHeight': '3rem',
        '--Input-paddingInline': '1rem',
        '--Input-gap': '0.75rem',
        '--Input-decorator-childHeight': 'min(2.375rem, var(--Input-minHeight))',
        '--Icon-fontSize': '1.75rem',
      }),
      // variables for controlling child components
      '--Input-decorator-childOffset':
        'min(calc(var(--Input-paddingInline) - (var(--Input-minHeight) - 2 * var(--variant-borderWidth) - var(--Input-decorator-childHeight)) / 2), var(--Input-paddingInline))',
      '--unstable_Input-paddingBlock':
        'max((var(--Input-minHeight) - 2 * var(--variant-borderWidth) - var(--Input-decorator-childHeight)) / 2, 0px)',
      '--Input-decorator-childRadius':
        'max((var(--Input-radius) - var(--variant-borderWidth)) - var(--unstable_Input-paddingBlock), min(var(--unstable_Input-paddingBlock) / 2, (var(--Input-radius) - var(--variant-borderWidth)) / 2))',
      '--Button-minHeight': 'var(--Input-decorator-childHeight)',
      '--IconButton-size': 'var(--Input-decorator-childHeight)',
      '--Button-radius': 'var(--Input-decorator-childRadius)',
      '--IconButton-radius': 'var(--Input-decorator-childRadius)',
      boxSizing: 'border-box',
      minWidth: 0,
      minHeight: 'var(--Input-minHeight)',
      ...(ownerState.fullWidth && {
        width: '100%',
      }),
      cursor: 'text',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      paddingInline: `var(--Input-paddingInline)`,
      borderRadius: 'var(--Input-radius)',
      fontFamily: theme.vars.fontFamily.body,
      fontSize: theme.vars.fontSize.md,
      ...(ownerState.size === 'sm' && {
        fontSize: theme.vars.fontSize.sm,
      }),
      // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
      transition:
        'border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      '&:before': {
        boxSizing: 'border-box',
        content: '""',
        display: 'block',
        position: 'absolute',
        pointerEvents: 'none',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        borderRadius: 'inherit',
        margin: 'calc(var(--variant-borderWidth) * -1)', // for outlined variant
      },
    },
    {
      // variant styles
      ...variantStyle,
      backgroundColor: variantStyle?.backgroundColor ?? theme.vars.palette.background.surface,
      [`&:hover:not(.${inputClasses.focused})`]: {
        ...theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
        backgroundColor: null, // it is not common to change background on hover for Input
        cursor: 'text',
      },
      [`&.${inputClasses.disabled}`]:
        theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
      [`&.${inputClasses.focused}`]: {
        '&:before': {
          boxShadow: `inset 0 0 0 var(--Input-focusedThickness) var(--Input-focusedHighlight)`,
        },
      },
    },
  ];
});

const InputInput = styled('input', {
  name: 'JoyInput',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: InputProps }>(({ theme, ownerState }) => ({
  border: 'none', // remove the native input width
  minWidth: 0, // remove the native input width
  outline: 0, // remove the native input outline
  padding: 0, // remove the native input padding
  flex: 1,
  alignSelf: 'stretch',
  color: 'inherit',
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontStyle: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  textOverflow: 'ellipsis',
  '&:-webkit-autofill': {
    WebkitBackgroundClip: 'text', // remove autofill background
    WebkitTextFillColor: theme.vars.palette[ownerState.color!]?.overrideTextPrimary,
  },
  '&::-webkit-input-placeholder': { opacity: 'var(--Input-placeholderOpacity)', color: 'inherit' },
  '&::-moz-placeholder': { opacity: 'var(--Input-placeholderOpacity)', color: 'inherit' }, // Firefox 19+
  '&:-ms-input-placeholder': { opacity: 'var(--Input-placeholderOpacity)', color: 'inherit' }, // IE11
  '&::-ms-input-placeholder': { opacity: 'var(--Input-placeholderOpacity)', color: 'inherit' }, // Edge
}));

const InputStartDecorator = styled('span', {
  name: 'JoyInput',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: InputProps & { focused: boolean } }>(({ theme, ownerState }) => ({
  '--Button-margin': '0 0 0 calc(var(--Input-decorator-childOffset) * -1)',
  '--IconButton-margin': '0 0 0 calc(var(--Input-decorator-childOffset) * -1)',
  '--Icon-margin': '0 0 0 calc(var(--Input-paddingInline) / -4)',
  display: 'inherit',
  alignItems: 'center',
  paddingBlock: 'var(--unstable_Input-paddingBlock)', // for wrapping Autocomplete's tags
  flexWrap: 'wrap', // for wrapping Autocomplete's tags
  marginInlineEnd: 'var(--Input-gap)',
  color: theme.vars.palette.text.tertiary,
  cursor: 'initial',
  ...(ownerState.focused && {
    color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
  }),
}));

const InputEndDecorator = styled('span', {
  name: 'JoyInput',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: InputProps }>(({ theme, ownerState }) => ({
  '--Button-margin': '0 calc(var(--Input-decorator-childOffset) * -1) 0 0',
  '--IconButton-margin': '0 calc(var(--Input-decorator-childOffset) * -1) 0 0',
  '--Icon-margin': '0 calc(var(--Input-paddingInline) / -4) 0 0',
  display: 'inherit',
  alignItems: 'center',
  marginInlineStart: 'var(--Input-gap)',
  color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
  cursor: 'initial',
}));

const Input = React.forwardRef(function Input(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyInput',
  });

  const {
    propsToForward,
    rootStateClasses,
    inputStateClasses,
    getRootProps,
    getInputProps,
    component,
    componentsProps = {},
    formControl,
    focused,
    error: errorProp = false,
    disabled,
    fullWidth = false,
    size: sizeProp = 'md',
    color: colorProp = 'neutral',
    variant = 'outlined',
    startDecorator,
    endDecorator,
    ...other
  } = useForwardedInput<InputProps>(props, inputClasses);

  if (process.env.NODE_ENV !== 'production') {
    const registerEffect = formControl?.registerEffect;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (registerEffect) {
        return registerEffect();
      }

      return undefined;
    }, [registerEffect]);
  }

  const error = inProps.error ?? formControl?.error ?? errorProp;
  const size = inProps.size ?? formControl?.size ?? sizeProp;
  const color = error ? 'danger' : inProps.color ?? formControl?.color ?? colorProp;

  const ownerState = {
    ...props,
    fullWidth,
    color,
    disabled,
    error,
    focused,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: InputRoot,
    getSlotProps: getRootProps,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref,
      as: component,
    },
    ownerState,
    className: [classes.root, rootStateClasses],
  });

  const inputProps = useSlotProps({
    elementType: InputInput,
    getSlotProps: (otherHandlers: EventHandlers) =>
      getInputProps({ ...otherHandlers, ...propsToForward }),
    externalSlotProps: componentsProps.input,
    ownerState,
    additionalProps: formControl
      ? {
          id: formControl.htmlFor,
          'aria-describedby': formControl['aria-describedby'],
        }
      : {},
    className: [classes.input, inputStateClasses],
  });

  const startDecoratorProps = useSlotProps({
    elementType: InputStartDecorator,
    externalSlotProps: componentsProps.startDecorator,
    ownerState,
    className: classes.startDecorator,
  });

  const endDecoratorProps = useSlotProps({
    elementType: InputEndDecorator,
    externalSlotProps: componentsProps.endDecorator,
    ownerState,
    className: classes.endDecorator,
  });

  return (
    <InputRoot {...rootProps}>
      {startDecorator && (
        <InputStartDecorator {...startDecoratorProps}>{startDecorator}</InputStartDecorator>
      )}

      <InputInput {...inputProps} />
      {endDecorator && <InputEndDecorator {...endDecoratorProps}>{endDecorator}</InputEndDecorator>}
    </InputRoot>
  );
}) as OverridableComponent<InputTypeMap>;

Input.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  autoComplete: PropTypes.string,
  /**
   * @ignore
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside the component.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    endDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * @ignore
   */
  defaultValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * Trailing adornment for this input.
   */
  endDecorator: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  placeholder: PropTypes.string,
  /**
   * @ignore
   */
  readOnly: PropTypes.bool,
  /**
   * @ignore
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * Leading adornment for this input.
   */
  startDecorator: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @ignore
   */
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Input;
