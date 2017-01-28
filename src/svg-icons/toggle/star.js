import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let ToggleStar = (props) => (
  <SvgIcon {...props}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </SvgIcon>
);
ToggleStar = pure(ToggleStar);
ToggleStar.displayName = 'ToggleStar';
ToggleStar.muiName = 'SvgIcon';

export default ToggleStar;
