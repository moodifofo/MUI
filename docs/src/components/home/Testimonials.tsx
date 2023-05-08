import * as React from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MuiStatistics from 'docs/src/components/home/MuiStatistics';
import { alpha } from '@mui/material/styles';

const UserFeedbacks = dynamic(() => import('./UserFeedbacks'));

function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '500px',
  });
  return (
    <Box
      data-mui-color-scheme="dark"
      ref={ref}
      sx={(theme) => ({
        background: `linear-gradient(180deg, ${
          (theme.vars || theme).palette.primaryDark[700]
        } 0%, ${alpha(theme.palette.primaryDark[600], 0.2)} 100%),
        ${(theme.vars || theme).palette.primaryDark[700]}
        `,
      })}
    >
      <Container sx={{ py: { xs: 4, md: 8 } }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6} sx={{ zIndex: 1, minHeight: { xs: 400, sm: 307, lg: 355 } }}>
            {inView && <UserFeedbacks />}
          </Grid>
          <MuiStatistics />
        </Grid>
      </Container>
    </Box>
  );
}

export default Testimonials;
