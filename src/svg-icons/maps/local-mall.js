import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let MapsLocalMall = (props) => (
  <SvgIcon {...props}>
    <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z"/>
  </SvgIcon>
);
MapsLocalMall = pure(MapsLocalMall);
MapsLocalMall.displayName = 'MapsLocalMall';
MapsLocalMall.muiName = 'SvgIcon';

export default MapsLocalMall;
