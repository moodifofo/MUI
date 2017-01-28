import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let ActionOfflinePin = (props) => (
  <SvgIcon {...props}>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z"/>
  </SvgIcon>
);
ActionOfflinePin = pure(ActionOfflinePin);
ActionOfflinePin.displayName = 'ActionOfflinePin';
ActionOfflinePin.muiName = 'SvgIcon';

export default ActionOfflinePin;
