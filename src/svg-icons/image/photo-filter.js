import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let ImagePhotoFilter = (props) => (
  <SvgIcon {...props}>
    <path d="M19.02 10v9H5V5h9V3H5.02c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2zM17 10l.94-2.06L20 7l-2.06-.94L17 4l-.94 2.06L14 7l2.06.94zm-3.75.75L12 8l-1.25 2.75L8 12l2.75 1.25L12 16l1.25-2.75L16 12z"/>
  </SvgIcon>
);
ImagePhotoFilter = pure(ImagePhotoFilter);
ImagePhotoFilter.displayName = 'ImagePhotoFilter';
ImagePhotoFilter.muiName = 'SvgIcon';

export default ImagePhotoFilter;
