import { createStack } from '@mui/system';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import styled from '../styles/styled';
import { useThemeProps } from '../styles';
import { StackTypeMap } from './StackProps';

/**
 *
 * Demos:
 *
 * - [Stack](https://mui.com/joy-ui/react-stack/)
 *
 * API:
 *
 * - [Stack API](https://mui.com/joy-ui/api/stack/)
 */
const Stack = createStack({
  createStyledComponent: styled('div', {
    name: 'JoyStack',
    slot: 'Root',
    overridesResolver: (props, styles) => styles.root,
  }),
  useThemeProps: (inProps) => useThemeProps({ props: inProps, name: 'JoyStack' }),
}) as OverridableComponent<StackTypeMap>;

Stack.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Stack;
