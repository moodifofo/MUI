import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import getSignUpTheme from './getSignUpTheme';
import ToggleColorMode from './ToggleColorMode';

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-placeholder="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

const logoStyle = {
  width: '140px',
  height: '56px',
  opacity: 0.8,
  marginLeft: '-16px',
  marginTop: '-16px',
};

export default function SignUp() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('');

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('name');
    const lastName = document.getElementById('lastName');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!lastName.value || lastName.value.length < 1) {
      setLastNameError(true);
      setLastNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage('');
    }

    return isValid;
  };

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
      <CssBaseline />
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={(theme) => ({
          backgroundImage:
            theme.palette.mode === 'light'
              ? `linear-gradient(180deg, ${alpha('#CEE5FD', 0.2)}, #FFF)`
              : `linear-gradient(${alpha('#02294F', 0.2)}, ${alpha('#021F3B', 0.0)})`,
          backgroundRepeat: 'no-repeat',
          px: { xs: 2, sm: 4 },
          height: '100dvh',
        })}
        component="main"
      >
        <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            component="a"
            href="/material-ui/getting-started/templates/"
          >
            Back
          </Button>
          <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        </Stack>
        <Stack
          justifyContent={{ xs: 'start', sm: 'center' }}
          sx={{ height: '100%', mt: { xs: 0, sm: -72 } }}
        >
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: { sm: '100%', md: '450px' },
              mx: 'auto',
              p: 4,
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <img
                src={
                  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                }
                style={logoStyle}
                alt="Sitemark's logo"
              />
            </Box>
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.5rem)' }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <InputLabel htmlFor="name" sx={visuallyHidden}>
                Name
              </InputLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="First Name"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
              <InputLabel htmlFor="lastName" sx={visuallyHidden}>
                Last name
              </InputLabel>
              <TextField
                required
                fullWidth
                id="lastName"
                placeholder="Last Name"
                name="lastName"
                autoComplete="last-name"
                error={lastNameError}
                helperText={lastNameErrorMessage}
                color={lastNameError ? 'error' : 'primary'}
              />
              <InputLabel htmlFor="email" sx={visuallyHidden}>
                Email
              </InputLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="Email Address"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
              <InputLabel htmlFor="password" sx={visuallyHidden}>
                Password
              </InputLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Sign up
              </Button>
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Already have an account? Sign in
              </Link>
            </Box>
            <Divider>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => alert('Sign up with Google')}
                startIcon={
                  <img
                    src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
                    alt="Google"
                    style={{ width: 16, height: 16 }}
                  />
                }
              >
                Sign up with Google
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => alert('Sign up with Facebook')}
                startIcon={
                  <img
                    src="https://www.vectorlogo.zone/logos/facebook/facebook-tile.svg"
                    alt="Google"
                    style={{ width: 16, height: 16 }}
                  />
                }
              >
                Sign up with Facebook
              </Button>
            </Box>
          </Card>
        </Stack>
      </Stack>
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
    </ThemeProvider>
  );
}
