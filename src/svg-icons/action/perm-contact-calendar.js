import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionPermContactCalendar = (props) => (
  <SvgIcon {...props}>
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"/>
  </SvgIcon>
);
ActionPermContactCalendar = pure(ActionPermContactCalendar);
ActionPermContactCalendar.displayName = 'ActionPermContactCalendar';
ActionPermContactCalendar.muiName = 'SvgIcon';

export default ActionPermContactCalendar;
