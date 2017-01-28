import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let HardwarePhoneIphone = (props) => (
  <SvgIcon {...props}>
    <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/>
  </SvgIcon>
);
HardwarePhoneIphone = pure(HardwarePhoneIphone);
HardwarePhoneIphone.displayName = 'HardwarePhoneIphone';
HardwarePhoneIphone.muiName = 'SvgIcon';

export default HardwarePhoneIphone;
