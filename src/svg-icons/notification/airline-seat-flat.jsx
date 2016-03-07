import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let NotificationAirlineSeatFlat = (props) => (
  <SvgIcon {...props}>
    <path d="M22 11v2H9V7h9c2.21 0 4 1.79 4 4zM2 14v2h6v2h8v-2h6v-2H2zm5.14-1.9c1.16-1.19 1.14-3.08-.04-4.24-1.19-1.16-3.08-1.14-4.24.04-1.16 1.19-1.14 3.08.04 4.24 1.19 1.16 3.08 1.14 4.24-.04z"/>
  </SvgIcon>
);
NotificationAirlineSeatFlat = pure(NotificationAirlineSeatFlat)
NotificationAirlineSeatFlat.displayName = 'NotificationAirlineSeatFlat';

export default NotificationAirlineSeatFlat;
