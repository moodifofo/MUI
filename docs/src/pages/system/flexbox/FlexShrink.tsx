import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        p: 1,
        m: 1,
        borderRadius: 1,
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

export default function FlexShrink() {
  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', p: 1, bgcolor: 'background.paper' }}>
        <Item sx={{ width: '100%' }}>Item 1</Item>
        <Item sx={{ flexShrink: 1 }}>Item 2</Item>
        <Item sx={{ flexShrink: 0 }}>Item 3</Item>
      </Box>
    </div>
  );
}
