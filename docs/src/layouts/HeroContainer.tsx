import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { alpha } from '@mui/material/styles';

export default function HeroContainer({
  left,
  right,
  rightRef,
  rightSx,
  linearGradient,
}: {
  left: React.ReactElement;
  right: React.ReactElement;
  rightRef?: React.MutableRefObject<HTMLDivElement | null>;
  rightSx?: BoxProps['sx'];
  linearGradient?: boolean;
}) {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Container
        sx={{
          minHeight: 500,
          height: 'calc(100vh - 120px)',
          maxHeight: { xs: 500, sm: 700, xl: 1000 },
          transition: '0.3s',
        }}
      >
        <Grid container alignItems="center" wrap="nowrap" sx={{ height: '100%', mx: 'auto' }}>
          <Grid item md={7} lg={6} sx={{ m: 'auto' }}>
            {left}
          </Grid>
          <Grid
            item
            md={5}
            lg={6}
            sx={{ maxHeight: '100%', display: { xs: 'none', md: 'initial' } }}
          >
            <Box
              ref={rightRef}
              id="hero-container-right-area"
              aria-hidden="true"
              sx={[
                (theme) => ({
                  minWidth: '50vw',
                  minHeight: 500,
                  height: 'calc(100vh - 120px)',
                  maxHeight: { md: 700, xl: 1000 },
                  borderBottomLeftRadius: 12,
                  transition: 'max-height 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                  borderLeft: '1px solid',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  ...(linearGradient && {
                    background: `radial-gradient(farthest-corner circle at 100% 0%, ${
                      (theme.vars || theme).palette.grey[50]
                    } 0%, ${(theme.vars || theme).palette.primary[50]} 100%)`,
                  }),
                }),
                (theme) =>
                  theme.applyDarkStyles({
                    background: 'primaryDark.900',
                    borderColor: 'primaryDark.700',
                    ...(linearGradient && {
                      background: `radial-gradient(farthest-corner circle at 100% 0%, ${alpha(
                        theme.palette.primary[900],
                        0.3,
                      )} 0%, ${(theme.vars || theme).palette.primaryDark[900]} 100%)`,
                    }),
                  }),
                ...(Array.isArray(rightSx) ? rightSx : [rightSx]),
              ]}
            >
              {right}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
