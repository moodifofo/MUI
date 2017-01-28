import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let ImagePhotoSizeSelectActual = (props) => (
  <SvgIcon {...props}>
    <path d="M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z"/>
  </SvgIcon>
);
ImagePhotoSizeSelectActual = pure(ImagePhotoSizeSelectActual);
ImagePhotoSizeSelectActual.displayName = 'ImagePhotoSizeSelectActual';
ImagePhotoSizeSelectActual.muiName = 'SvgIcon';

export default ImagePhotoSizeSelectActual;
