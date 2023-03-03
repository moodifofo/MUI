import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export default function StressNestedGrid2() {
  return (
    <Box
      sx={{
        width: 600,
        display: 'flex',
        bgcolor: 'secondary.main',
        '& .MuiPaper-root': {
          p: 2,
          textAlign: 'center',
        },
      }}
    >
      <Grid container spacing={1}>
        <Grid xs={12}>
          <Paper>xs=12</Paper>
        </Grid>
        <Grid xs={6}>
          <Paper>xs=6</Paper>
        </Grid>
        <Grid xs={6}>
          <Paper>xs=6</Paper>
        </Grid>
        <Box sx={{ p: 2, width: '100%' }}>
          <Grid container spacing={3}>
            <Grid xs={6}>
              <Paper>xs=6</Paper>
            </Grid>
            <Grid container spacing={2} xs={6}>
              <Grid container spacing={1} xs={6}>
                <Grid xs={7}>
                  <Paper>xs=7</Paper>
                </Grid>
                <Grid xs={5}>
                  <Paper>xs=5</Paper>
                </Grid>
              </Grid>
              <Grid xs={6}>
                <Paper>xs=6</Paper>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Grid container xs={6} spacing={3}>
          <Grid xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
          <Grid xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
        </Grid>
        <Grid container xs={6} spacing={3}>
          <Grid xs={8}>
            <Paper>xs=8</Paper>
          </Grid>
          <Grid xs={4}>
            <Paper>xs=4</Paper>
          </Grid>
        </Grid>
        <Grid container xs={6} spacing={2}>
          <Grid xs={4}>
            <Paper>xs=4</Paper>
          </Grid>
          <Grid xs={4}>
            <Paper>xs=4</Paper>
          </Grid>
          <Grid xs={4}>
            <Paper>xs=4</Paper>
          </Grid>
        </Grid>
        <Grid container xs={6} spacing={5}>
          <Grid xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
          <Grid xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
