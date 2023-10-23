import * as React from 'react';
import { Box } from '@mui/system';

export default function BoxBasic() {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      This is a section container
    </Box>
  );
}
