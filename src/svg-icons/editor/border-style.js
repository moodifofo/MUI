import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let EditorBorderStyle = (props) => (
  <SvgIcon {...props}>
    <path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z"/>
  </SvgIcon>
);
EditorBorderStyle = pure(EditorBorderStyle);
EditorBorderStyle.displayName = 'EditorBorderStyle';
EditorBorderStyle.muiName = 'SvgIcon';

export default EditorBorderStyle;
