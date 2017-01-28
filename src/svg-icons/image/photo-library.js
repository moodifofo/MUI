import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let ImagePhotoLibrary = (props) => (
  <SvgIcon {...props}>
    <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/>
  </SvgIcon>
);
ImagePhotoLibrary = pure(ImagePhotoLibrary);
ImagePhotoLibrary.displayName = 'ImagePhotoLibrary';
ImagePhotoLibrary.muiName = 'SvgIcon';

export default ImagePhotoLibrary;
