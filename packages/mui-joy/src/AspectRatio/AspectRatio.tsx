import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getAspectRatioUtilityClass } from './aspectRatioClasses';
import { AspectRatioProps, AspectRatioTypeMap } from './AspectRatioProps';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getAspectRatioUtilityClass, {});
};

const AspectRatioRoot = styled('div', {
  name: 'MuiAspectRatio',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AspectRatioProps }>(({ theme, ownerState }) => {
  const min = typeof ownerState.min === 'number' ? `${ownerState.min}px` : ownerState.min;
  const max = typeof ownerState.max === 'number' ? `${ownerState.max}px` : ownerState.max;
  return [
    {
      position: 'relative',
      borderRadius: 'var(--AspectRatio-radius)',
      height: 0,
      paddingBottom: `clamp(${min || '0px'}, calc(100% / (${ownerState.ratio})), ${
        max || '9999px'
      })`,
      '& > *:first-child': {
        borderRadius: 'var(--AspectRatio-radius)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: ownerState.objectFit,
      },
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
  ];
});

const AspectRatio = React.forwardRef(function AspectRatio(inProps, ref) {
  const props = useThemeProps<typeof inProps & AspectRatioProps>({
    props: inProps,
    name: 'MuiAspectRatio',
  });

  const {
    className,
    component = 'div',
    children,
    ratio = '16 / 9',
    min,
    max,
    objectFit = 'cover',
    color = 'neutral',
    variant = 'light',
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    min,
    max,
    objectFit,
    ratio,
    color,
    variant,
  };

  const classes = useUtilityClasses();

  return (
    <AspectRatioRoot
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {children}
    </AspectRatioRoot>
  );
}) as OverridableComponent<AspectRatioTypeMap>;

AspectRatio.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the AspectRatio if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
} as any;

export default AspectRatio;
