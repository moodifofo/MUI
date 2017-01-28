import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let MapsLocalGasStation = (props) => (
  <SvgIcon {...props}>
    <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
  </SvgIcon>
);
MapsLocalGasStation = pure(MapsLocalGasStation);
MapsLocalGasStation.displayName = 'MapsLocalGasStation';
MapsLocalGasStation.muiName = 'SvgIcon';

export default MapsLocalGasStation;
