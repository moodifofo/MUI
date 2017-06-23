import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let FitnessCenter = props =>
  <SvgIcon {...props}>
    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
  </SvgIcon>;

FitnessCenter = pure(FitnessCenter);
FitnessCenter.muiName = 'SvgIcon';

export default FitnessCenter;
