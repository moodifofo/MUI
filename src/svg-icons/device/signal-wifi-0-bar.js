import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let DeviceSignalWifi0Bar = (props) => (
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/>
  </SvgIcon>
);
DeviceSignalWifi0Bar = pure(DeviceSignalWifi0Bar);
DeviceSignalWifi0Bar.displayName = 'DeviceSignalWifi0Bar';
DeviceSignalWifi0Bar.muiName = 'SvgIcon';

export default DeviceSignalWifi0Bar;
