import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded';

interface HeroProps {
  showCustomTheme: boolean;
  toggleCustomTheme: () => void;
}

interface ToggleCustomTheme {
  showCustomTheme: boolean;
  toggleCustomTheme: () => void;
}

function ToggleCustomTheme({
  showCustomTheme,
  toggleCustomTheme,
}: ToggleCustomTheme) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        px: 1,
        borderRadius: '999px',
        border: '1px solid ',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <BlockRoundedIcon sx={{ color: 'primary.light', fontSize: '20px' }} />
      <Switch
        checked={showCustomTheme}
        onChange={toggleCustomTheme}
        color="primary"
      />
      <AutoAwesomeRoundedIcon sx={{ color: 'primary.light', fontSize: '20px' }} />
    </Box>
  );
}

export default function Hero({ showCustomTheme, toggleCustomTheme }: HeroProps) {
  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        background: (theme) =>
          theme.palette.mode === 'light'
            ? 'linear-gradient( #9CCCFC, #FFF)'
            : 'linear-gradient( #02294F, #090E10)',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
        }}
      >
        <Stack spacing={2} sx={{ width: { xs: '100%', sm: '70%' } }}>
          {/* <Chip
            size="small"
            variant="filled"
            label="New arrivals"
            icon={<CelebrationRoundedIcon />}
            onClick={handleClick}
            sx={{
              alignSelf: 'center',
              py: 1.5,
              px: 0.5,
            }}
          /> */}
          <ToggleCustomTheme
            showCustomTheme={showCustomTheme}
            toggleCustomTheme={toggleCustomTheme}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            <Typography component="h1" variant="h1">
              Our latest&nbsp;
            </Typography>
            <Typography
              component="h1"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              products
            </Typography>
          </Box>
          <Typography
            variant="body1"
            textAlign="center"
            paragraph
            sx={{ opacity: 0.8 }}
          >
            Explore our cutting-edge dashboard, delivering high-quality solutions
            tailored to your needs. <br />
            Elevate your experience with top-tier features and services.
          </Typography>
          <Stack direction="row" spacing={1} sx={{ pt: 2, alignSelf: 'center' }}>
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              placeholder="Your email address"
              inputProps={{
                autocomplete: 'off',
              }}
              sx={{
                minWidth: '250px',
              }}
            />
            <Button variant="contained" color="primary">
              Start using
            </Button>
          </Stack>
          <Typography
            variant="caption"
            color="inherit"
            paragraph
            textAlign="center"
            sx={{ opacity: 0.8 }}
          >
            By clicking &quot;Start using&quot; you agree to our&nbsp;
            <span>
              <Link href="#" color="primary" sx={{ opacity: 1 }}>
                Terms & Conditions
              </Link>
            </span>
          </Typography>
        </Stack>
        <Box
          id="image"
          sx={{
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: '200px', sm: '600px' },
            width: '100%',
            backgroundImage: (theme) =>
              theme.palette.mode === 'light'
                ? 'url("/static/images/templates/templates-images/dashboard-placeholder-image-light.png")'
                : 'url("/static/images/templates/templates-images/dashboard-placeholder-image-dark.png")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            boxShadow: (theme) =>
              theme.palette.mode === 'light'
                ? `0 0 24px 12px ${alpha('#9CCCFC', 0.3)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
          }}
        />
      </Container>
    </Box>
  );
}
