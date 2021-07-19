import * as React from 'react';
import { ThemeProvider, createTheme, styled } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppHeader from 'docs/src/layouts/AppHeader';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import ContentCopyRounded from '@material-ui/icons/ContentCopyRounded';

const brandingTheme = createTheme({
  palette: {
    primary: {
      main: '#007FFF',
    },
    text: {
      primary: '#0a1929',
      secondary: '#5a6978',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "'PlusJakartaSans', sans-serif",
    button: {
      textTransform: 'initial',
      fontWeight: 'bold',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variant: 'body2',
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        sizeLarge: {
          padding: '13px 20px',
        },
      },
    },
  },
});

const GradientText = styled('span')(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  backgroundClip: 'text',
  '-webkit-text-fill-color': 'transparent',
}));

const Home = () => {
  return (
    <ThemeProvider theme={brandingTheme}>
      <CssBaseline />
      <AppHeader />
      <Box sx={{ overflow: 'hidden' }}>
        <Container sx={{ minHeight: 500, height: 'calc(100vh - 120px)', maxHeight: 700 }}>
          <Grid container sx={{ height: '100%' }} alignItems="center" wrap="nowrap">
            <Grid item lg={6}>
              <Box maxWidth={500}>
                <Typography
                  variant="h1"
                  fontWeight={800}
                  fontSize="4.5rem"
                  lineHeight="80px"
                  mb={2}
                >
                  The <GradientText>ultimate</GradientText> solution for your UI.
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={2}>
                  MUI provides robust, customizable, and accessible components, enabling you to
                  build React applications faster. With a trusted open-source community and
                  beautiful designs, developing UIs have never been easier.
                </Typography>
                <Button size="large" variant="contained" endIcon={<KeyboardArrowRightRounded />}>
                  Get Started
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  endIcon={<ContentCopyRounded sx={{ color: 'grey.500' }} />}
                  sx={{ ml: 2, color: 'grey.600', border: '1px solid #e5e8ec', bgcolor: '#f3f6f9' }}
                >
                  <Box component="span" sx={{ mr: 1, color: 'grey.400' }}>
                    $
                  </Box>{' '}
                  npm install @mui/core
                </Button>
              </Box>
            </Grid>
            <Grid item lg={6} sx={{ maxHeight: '100%' }}>
              <Box height={1000} width={1000} bgcolor="grey.50" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
