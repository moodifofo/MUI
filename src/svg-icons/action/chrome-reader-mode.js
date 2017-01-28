import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let ActionChromeReaderMode = (props) => (
  <SvgIcon {...props}>
    <path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"/>
  </SvgIcon>
);
ActionChromeReaderMode = pure(ActionChromeReaderMode);
ActionChromeReaderMode.displayName = 'ActionChromeReaderMode';
ActionChromeReaderMode.muiName = 'SvgIcon';

export default ActionChromeReaderMode;
