import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import useScript from './useScript';
import FirstSidebar from './components/FirstSidebar';
import SecondSidebar from './components/SecondSidebar';
import OrderTable from './components/OrderTable';

export default function JoyOrderDashboardTemplate() {
  const status = useScript(`https://unpkg.com/feather-icons`);

  React.useEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== 'undefined') {
      // @ts-ignore
      feather.replace();
      console.log('test');
    }
  }, [status]);

  return (
    <CssVarsProvider>
      <GlobalStyles
        styles={{
          '.feather': {
            color: 'var(--Icon-color)',
            margin: 'var(--Icon-margin)',
            fontSize: 'var(--Icon-fontSize, 20px)',
            width: '1em',
            height: '1em',
          },
        }}
      />
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <FirstSidebar />
        <SecondSidebar />
        <Box
          sx={{
            p: 3,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
          }}
        >
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<i data-feather="chevron-right" />}
            sx={{
              '--Breadcrumbs-gap': '1rem',
              '--Icon-fontSize': '16px',
              fontWeight: 'lg',
              color: 'neutral.400',
            }}
          >
            <Link
              underline="none"
              color="neutral"
              fontSize="inherit"
              href="#some-link"
              aria-label="Home"
            >
              <i data-feather="home" />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              fontSize="inherit"
              href="#some-link"
            >
              Dashboard
            </Link>
            <Typography fontSize="inherit" variant="soft" color="success">
              Orders
            </Typography>
          </Breadcrumbs>

          <Box sx={{ display: 'flex', alignItems: 'center', my: 1, gap: 1 }}>
            <Typography level="h1" fontSize="xl4">
              Orders
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Button
              variant="outlined"
              color="neutral"
              startDecorator={<i data-feather="download-cloud" />}
            >
              Download PDF
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              startDecorator={<i data-feather="table" />}
            >
              Download CSV
            </Button>
          </Box>

          <OrderTable />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
