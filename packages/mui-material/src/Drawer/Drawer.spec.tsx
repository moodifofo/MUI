import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { PaperProps } from '@mui/material/Paper';
import { expectType } from '@mui/types';

const paperProps: PaperProps<'span'> = {
  component: 'span',
  onClick: (event) => {
    expectType<React.MouseEvent<HTMLSpanElement, MouseEvent>, typeof event>(event);
  },
};
function Test() {
  return (
    <React.Fragment>
      <Drawer open />;
      <Drawer open PaperProps={paperProps} />;
    </React.Fragment>
  );
}
