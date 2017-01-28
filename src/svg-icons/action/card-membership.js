import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let ActionCardMembership = (props) => (
  <SvgIcon {...props}>
    <path d="M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 13H4v-2h16v2zm0-5H4V4h16v6z"/>
  </SvgIcon>
);
ActionCardMembership = pure(ActionCardMembership);
ActionCardMembership.displayName = 'ActionCardMembership';
ActionCardMembership.muiName = 'SvgIcon';

export default ActionCardMembership;
