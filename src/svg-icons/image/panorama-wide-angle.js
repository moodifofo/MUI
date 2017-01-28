import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let ImagePanoramaWideAngle = (props) => (
  <SvgIcon {...props}>
    <path d="M12 6c2.45 0 4.71.2 7.29.64.47 1.78.71 3.58.71 5.36 0 1.78-.24 3.58-.71 5.36-2.58.44-4.84.64-7.29.64s-4.71-.2-7.29-.64C4.24 15.58 4 13.78 4 12c0-1.78.24-3.58.71-5.36C7.29 6.2 9.55 6 12 6m0-2c-2.73 0-5.22.24-7.95.72l-.93.16-.25.9C2.29 7.85 2 9.93 2 12s.29 4.15.87 6.22l.25.89.93.16c2.73.49 5.22.73 7.95.73s5.22-.24 7.95-.72l.93-.16.25-.89c.58-2.08.87-4.16.87-6.23s-.29-4.15-.87-6.22l-.25-.89-.93-.16C17.22 4.24 14.73 4 12 4z"/>
  </SvgIcon>
);
ImagePanoramaWideAngle = pure(ImagePanoramaWideAngle);
ImagePanoramaWideAngle.displayName = 'ImagePanoramaWideAngle';
ImagePanoramaWideAngle.muiName = 'SvgIcon';

export default ImagePanoramaWideAngle;
