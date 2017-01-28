import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let AvFeaturedVideo = (props) => (
  <SvgIcon {...props}>
    <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 9H3V5h9v7z"/>
  </SvgIcon>
);
AvFeaturedVideo = pure(AvFeaturedVideo);
AvFeaturedVideo.displayName = 'AvFeaturedVideo';
AvFeaturedVideo.muiName = 'SvgIcon';

export default AvFeaturedVideo;
