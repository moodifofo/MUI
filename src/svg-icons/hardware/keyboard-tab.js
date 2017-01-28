import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let HardwareKeyboardTab = (props) => (
  <SvgIcon {...props}>
    <path d="M11.59 7.41L15.17 11H1v2h14.17l-3.59 3.59L13 18l6-6-6-6-1.41 1.41zM20 6v12h2V6h-2z"/>
  </SvgIcon>
);
HardwareKeyboardTab = pure(HardwareKeyboardTab);
HardwareKeyboardTab.displayName = 'HardwareKeyboardTab';
HardwareKeyboardTab.muiName = 'SvgIcon';

export default HardwareKeyboardTab;
