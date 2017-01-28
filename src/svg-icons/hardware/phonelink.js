import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let HardwarePhonelink = (props) => (
  <SvgIcon {...props}>
    <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"/>
  </SvgIcon>
);
HardwarePhonelink = pure(HardwarePhonelink);
HardwarePhonelink.displayName = 'HardwarePhonelink';
HardwarePhonelink.muiName = 'SvgIcon';

export default HardwarePhonelink;
