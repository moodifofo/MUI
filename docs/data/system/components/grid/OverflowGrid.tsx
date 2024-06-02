import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid',
  borderColor: '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
    borderColor: '#444d58',
  }),
}));

export default function OverflowGrid() {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        '& > div': {
          overflow: 'auto hidden',
          '&::-webkit-scrollbar': { height: 10, WebkitAppearance: 'none' },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            border: '2px solid',
            borderColor: '#E7EBF0',
            backgroundColor: 'rgba(0 0 0 / 0.5)',
            ...theme.applyStyles('dark', {
              borderColor: '',
            }),
          },
        },
      })}
    >
      <Box
        sx={{
          width: 200,
        }}
      >
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Item>Scroll bar appears</Item>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: 200, overflow: 'scroll' }}>
        <Grid container spacing={3} disableEqualOverflow>
          <Grid xs={12}>
            <Item>`disableEqualOverflow` prevents scrollbar</Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
