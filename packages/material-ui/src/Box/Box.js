import React from 'react';
import clsx from 'clsx';
import {
  borders,
  compose,
  display,
  flexbox,
  grid,
  palette,
  positions,
  shadows,
  sizing,
  spacing,
  typography,
  css,
  styleFunctionInversed,
} from '@material-ui/system';
import styled from '../styles/experimentalStyled';

export const styleFunction = styleFunctionInversed;

function omit(input, fields) {
  const output = {};

  Object.keys(input).forEach((prop) => {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });

  return output;
}

/**
 * @ignore - do not document.
 */
const BoxRoot = React.forwardRef(function StyledComponent(props, ref) {
  const { children, clone, className, component: Component = 'div', ...other } = props;

  const spread = omit(other, styleFunction.filtreProps);

  if (clone) {
    return React.cloneElement(children, {
      className: clsx(children.props.className, className),
      ...spread,
    });
  }

  if (typeof children === 'function') {
    return children({ className, ...spread });
  }

  return (
    <Component ref={ref} className={className} {...spread}>
      {children}
    </Component>
  );
});

const shouldForwardProp = (prop) => styleFunctionInversed.filterProps.indexOf(prop) === -1;

/**
 * @ignore - do not document.
 */
const Box = styled(BoxRoot, { shouldForwardProp }, { muiName: 'MuiBox' })(styleFunctionInversed);

export default Box;
