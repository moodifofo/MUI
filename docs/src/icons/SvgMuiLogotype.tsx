import * as React from 'react';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

export default function SvgMuiLogomark(props: RootSvgProps) {
  return (
    <RootSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 117 36"
      fill="none"
      sx={[
        (theme) => ({
          flexShrink: 0,
          color: '#0B0D0E',
          [theme.getColorSchemeSelector('dark')]: {
            color: '#fff',
          },
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
      {...props}
    >
      <path
        d="M11.59 10.73.75 4.43a.5.5 0 0 0-.75.44V22.4c0 .18.1.34.25.43l4.05 2.38a.5.5 0 0 0 .75-.43V13.34a.2.2 0 0 1 .3-.17l6.25 3.58a2 2 0 0 0 2-.01l6.1-3.57a.2.2 0 0 1 .3.17v5.6a1 1 0 0 1-.48.85l-6.28 3.86a.5.5 0 0 0-.24.43v5.64c0 .18.09.34.23.43l8.23 5.2a2 2 0 0 0 2.1.02l10.46-6.2a2 2 0 0 0 .98-1.73V16.63a.5.5 0 0 0-.76-.43l-3.31 2a2 2 0 0 0-.97 1.7v5.43a.5.5 0 0 1-.25.43l-6.19 3.65a2 2 0 0 1-2.04-.01l-3.33-2a.5.5 0 0 1-.02-.84l6.02-3.97a2 2 0 0 0 .9-1.67V4.87a.5.5 0 0 0-.75-.43l-10.7 6.29a2 2 0 0 1-2.01 0Z"
        fill="#007FFF"
      />
      <path
        d="M35 5.36v3.42a2 2 0 0 1-.94 1.7l-3.3 2.05a.5.5 0 0 1-.76-.43V8.52a2 2 0 0 1 1-1.73l3.25-1.86a.5.5 0 0 1 .75.43Z"
        fill="#007FFF"
      />
      <path
        d="M50.38 26.5V8.3h4.5l7.56 10.5-3.32-.02L66.7 8.3h4.44v18.2H66.2v-5.02c0-1.49.03-2.86.1-4.1.07-1.27.21-2.55.42-3.83l.52 1.61-5.64 7.28h-1.72l-5.62-7.35.58-1.54c.2 1.25.34 2.5.41 3.75.07 1.24.1 2.64.1 4.18v5.02h-4.96Zm34.88.16c-1.77 0-3.34-.35-4.7-1.04a7.87 7.87 0 0 1-3.18-2.89 7.92 7.92 0 0 1-1.11-4.19V8.3h5.2v10.09c0 .76.16 1.43.49 2 .33.57.78 1.01 1.35 1.33a4 4 0 0 0 1.95.46c.76 0 1.44-.15 2.03-.46.6-.32 1.07-.76 1.4-1.33.35-.57.52-1.24.52-2V8.3h5.05v10.24a7.78 7.78 0 0 1-4.3 7.08c-1.33.69-2.9 1.04-4.7 1.04Zm14.41-.16v-4.32h4.19v-9.56h-4.19V8.3h13.5v4.32H109v9.56h4.16v4.32h-13.5Z"
        fill="currentColor"
      />
    </RootSvg>
  );
}
