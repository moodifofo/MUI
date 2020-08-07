import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import CardActions from './CardActions';

describe('<CardActions />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<CardActions />);
  });

  describeConformance(<CardActions />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
