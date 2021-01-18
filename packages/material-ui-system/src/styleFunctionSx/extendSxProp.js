import { deepmerge } from '@material-ui/utils';
import { propToStyleFunction } from '../getThemeValue';

const splitProps = (props) => {
  const result = {
    systemProps: {},
    otherProps: {},
  };

  Object.keys(props).forEach((prop) => {
    if (propToStyleFunction[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });

  return result;
};

export default function extendSxProp(props) {
  const { sx: inSx = {}, ...other } = props;
  const { systemProps, otherProps } = splitProps(other);

  const sx = { ...systemProps, ...inSx };

  return {
    ...otherProps,
    sx,
  };
}
