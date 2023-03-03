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
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: PropTypes.oneOfType([
    PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
    PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])),
    PropTypes.object,
  ]),
  /**
   * Add an element between each child.
   */
  divider: PropTypes.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * If `true`, the CSS flex `gap` is used instead of the pseudo selector approach.
   * To enable this flag globally, follow the theme's default props configuration.
   *
   * ⚠️ Warning: CSS flex `gap` is not fully supported in some browsers, we recommend to check https://caniuse.com/?search=flex%20gap before using this flag.
   * @default false
   */
  useFlexGap: PropTypes.bool,
} as any;

export default Stack;
