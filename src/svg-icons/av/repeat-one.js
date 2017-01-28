import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let AvRepeatOne = (props) => (
  <SvgIcon {...props}>
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"/>
  </SvgIcon>
);
AvRepeatOne = pure(AvRepeatOne);
AvRepeatOne.displayName = 'AvRepeatOne';
AvRepeatOne.muiName = 'SvgIcon';

export default AvRepeatOne;
