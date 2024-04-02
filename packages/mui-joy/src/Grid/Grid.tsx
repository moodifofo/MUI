'use client';
import PropTypes from 'prop-types';
import { createGrid } from '@mui/system/Unstable_Grid';
import { OverridableComponent } from '@mui/types';
import { styled, useThemeProps } from '../styles';
import { GridTypeMap } from './GridProps';
/**
 *
 * Demos:
 *
 * - [Grid](https://mui.com/joy-ui/react-grid/)
 *
 * API:
 *
 * - [Grid API](https://mui.com/joy-ui/api/grid/)
 */
const Grid = createGrid({
  createStyledComponent: styled('div', {
    name: 'JoyGrid',
    slot: 'Root',
    overridesResolver: (props, styles) => styles.root,
  }),
  useThemeProps: (inProps) => useThemeProps({ props: inProps, name: 'JoyGrid' }),
}) as OverridableComponent<GridTypeMap>;

Grid.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
    PropTypes.shape({
      className: PropTypes.string,
      vars: PropTypes.object,
    }),
    PropTypes.string,
  ]),
} as any;

export default Grid;
