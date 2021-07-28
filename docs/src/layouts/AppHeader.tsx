import * as React from 'react';
import NextLink from 'next/link';
import { styled } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import HeaderNavBar from 'docs/src/components/header/HeaderNavBar';
import HeaderNavDropdown from 'docs/src/components/header/HeaderNavDropdown';
import ThemeModeToggle from 'docs/src/components/header/ThemeModeToggle';
import { getCookie } from 'docs/src/modules/utils/helpers';
import { useChangeTheme } from '../modules/ThemeContext';

const Header = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
  backdropFilter: 'blur(20px)',
  boxShadow: 'inset 0px -1px 1px #EAEEF3',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.72)' : 'rgba(255,255,255,0.72)',
}));

export default function AppHeader() {
  const changeTheme = useChangeTheme();
  const [mode, setMode] = React.useState(getCookie('paletteMode') || 'system');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredMode = prefersDarkMode ? 'dark' : 'light';

  const handleChangeThemeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    let paletteMode = 'system';
    paletteMode = event.target.checked ? 'dark' : 'light';
    if (paletteMode === null) {
      return;
    }

    setMode(paletteMode);

    if (paletteMode === 'system') {
      document.cookie = `paletteMode=;path=/;max-age=31536000`;
      changeTheme({ paletteMode: preferredMode });
    } else {
      document.cookie = `paletteMode=${paletteMode};path=/;max-age=31536000`;
      changeTheme({ paletteMode });
    }
  };
  return (
    <Header>
      <Container sx={{ display: 'flex', alignItems: 'center', minHeight: 64 }}>
        <NextLink href="/branding/home" passHref>
          <Box component="a" sx={{ lineHeight: 0, mr: 2 }}>
            <SvgMuiLogo width={32} />
          </Box>
        </NextLink>
        <Box sx={{ display: { xs: 'none', md: 'initial' } }}>
          <HeaderNavBar />
        </Box>
        <Box sx={{ ml: 'auto' }} />
        <Box sx={{ display: { md: 'none' } }}>
          <HeaderNavDropdown />
        </Box>
        <ThemeModeToggle checked={mode === 'dark'} onChange={handleChangeThemeMode} />
      </Container>
    </Header>
  );
}
