import * as React from 'react';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';
import LinearProgress from '@mui/joy/LinearProgress';
import Box from '@mui/joy/Box';

export default function LinearProgressVariables() {
  return (
    <JoyVariablesDemo
      componentName="LinearProgress"
      data={[
        {
          var: '--LinearProgress-size',
          defaultValue: '40px',
        },
        {
          var: '--LinearProgress-track-thickness',
          defaultValue: '6px',
        },
        {
          var: '--LinearProgress-progress-thickness',
          defaultValue: '6px',
        },
      ]}
      renderDemo={(sx) => (
        <Box sx={{ width: 300 }}>
          <LinearProgress sx={sx} />
        </Box>
      )}
    />
  );
}
