import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let AvNote = (props) => (
  <SvgIcon {...props}>
    <path d="M22 10l-6-6H4c-1.1 0-2 .9-2 2v12.01c0 1.1.9 1.99 2 1.99l16-.01c1.1 0 2-.89 2-1.99v-8zm-7-4.5l5.5 5.5H15V5.5z"/>
  </SvgIcon>
);
AvNote = pure(AvNote);
AvNote.displayName = 'AvNote';
AvNote.muiName = 'SvgIcon';

export default AvNote;
