import * as React from 'react';
import { createRenderer, describeConformance } from '@mui-internal/test-utils';
import TableContainer, { tableContainerClasses as classes } from '@mui/material/TableContainer';

describe('<TableContainer />', () => {
  const { render } = createRenderer();

  describeConformance(<TableContainer />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiTableContainer',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['componentsProp'],
  }));
});
