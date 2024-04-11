import * as React from 'react';
import { PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import getDashboardTheme from './getDashboardTheme';
import ToggleCustomTheme from './internals/components/ToggleCustomTheme';
import Copyright from './internals/components/Copyright';
import Navbar from './components/Navbar';
import SecondaryNavbar from './components/SecondaryNavbar';
import ChartUserByCountry from './components/ChartUserByCountry';

export default function Dashboard() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const dashboardTheme = createTheme(getDashboardTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? dashboardTheme : defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Navbar mode={mode} toggleColorMode={toggleColorMode} />
        <SecondaryNavbar />
        <Box
          component="main"
          sx={{
            backgroundColor: 'background.paper',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          {/* Main content */}
          <Container
            maxWidth="xl"
            sx={{
              pt: { xs: 14, sm: 20 },
              pb: { xs: 8, sm: 12 },
            }}
          >
            <ChartUserByCountry />
            Main content
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
        <ToggleCustomTheme
          showCustomTheme={showCustomTheme}
          toggleCustomTheme={toggleCustomTheme}
        />
      </Box>
    </ThemeProvider>
  );
}
