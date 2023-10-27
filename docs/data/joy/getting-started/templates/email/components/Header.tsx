import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Avatar from '@mui/joy/Avatar';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import ListItemDecorator from '@mui/joy/ListItemDecorator';

// Icons import
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <Tooltip title="Change theme" variant="outlined">
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="soft"
        color="neutral"
        sx={{ alignSelf: 'center' }}
        onClick={() => {
          if (mode === 'light') {
            setMode('dark');
          } else {
            setMode('light');
          }
        }}
      >
        {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        <IconButton
          size="md"
          variant="outlined"
          color="neutral"
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            borderRadius: '50%',
          }}
        >
          <LanguageRoundedIcon />
        </IconButton>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          href="/joy-ui/getting-started/templates/email/"
          size="sm"
          sx={{ alignSelf: 'center' }}
        >
          Email
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/team/"
          size="sm"
          sx={{ alignSelf: 'center' }}
        >
          Team
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/files/"
          size="sm"
          sx={{ alignSelf: 'center' }}
        >
          Files
        </Button>
      </Stack>
      <Box sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
        <Dropdown>
          <MenuButton variant="plain" endDecorator={<ExpandMoreRoundedIcon />}>
            Email
          </MenuButton>
          <Menu
            placement="bottom-start"
            sx={{ zIndex: '99999', width: 120, justifyContent: 'center' }}
          >
            <MenuItem
              selected
              component="a"
              href="/joy-ui/getting-started/templates/email/"
            >
              Email
            </MenuItem>
            <MenuItem component="a" href="/joy-ui/getting-started/templates/team/">
              Team
            </MenuItem>
            <MenuItem component="a" href="/joy-ui/getting-started/templates/files/">
              Files
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
        <Input
          size="sm"
          variant="outlined"
          placeholder="Search anything…"
          startDecorator={<SearchRoundedIcon color="primary" />}
          endDecorator={
            <IconButton
              variant="outlined"
              color="neutral"
              sx={{ bgcolor: 'background.level1' }}
            >
              <Typography level="title-sm" textColor="text.icon">
                ⌘ k
              </Typography>
            </IconButton>
          }
          sx={{
            alignSelf: 'center',
            display: {
              xs: 'none',
              sm: 'flex',
            },
          }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
        >
          <SearchRoundedIcon />
        </IconButton>
        <Tooltip title="Joy UI overview" variant="outlined">
          <IconButton
            size="sm"
            variant="soft"
            color="neutral"
            component="a"
            href="/blog/first-look-at-joy/"
            sx={{ alignSelf: 'center' }}
          >
            <BookRoundedIcon />
          </IconButton>
        </Tooltip>
        <ColorSchemeToggle />
        <Dropdown>
          <MenuButton
            variant="outlined"
            size="sm"
            slots={{ root: Box }}
            sx={{
              p: 1,
              borderRadius: '999px',
              '&:hover': {
                bgcolor: 'var(--joy-palette-neutral-plainHoverBg)',
                cursor: 'pointer',
              },
              '&:active': {
                bgcolor: 'var(--joy-palette-neutral-plainActiveBg)',
                cursor: 'pointer',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar
                src="https://i.pravatar.cc/40?img=2"
                srcSet="https://i.pravatar.cc/80?img=2"
                sx={{ borderRadius: '50%' }}
                size="sm"
              />
              <Box sx={{ ml: 2, display: { xs: 'none', sm: 'block' } }}>
                <Typography level="title-sm" textColor="text.primary">
                  Rick Sanchez
                </Typography>
              </Box>
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                sx={{ ml: 1, display: { xs: 'none', sm: 'flex' } }}
              >
                <ExpandMoreRoundedIcon />
              </IconButton>
            </Box>
          </MenuButton>
          <Menu
            size="sm"
            sx={{
              zIndex: '99999',
              p: 1.5,
              gap: 1,
              '--List-radius': '8px',
            }}
          >
            <MenuItem disabled>rick@email.com</MenuItem>
            <ListDivider />
            <MenuItem>
              <ListItemDecorator>
                <HelpRoundedIcon />
              </ListItemDecorator>
              Help
            </MenuItem>
            <MenuItem>
              <ListItemDecorator>
                <SettingsRoundedIcon />
              </ListItemDecorator>
              Settings
            </MenuItem>
            <ListDivider />
            <MenuItem component="a" href="/blog/first-look-at-joy/">
              First look at Joy UI
              <ListItemDecorator>
                <OpenInNewRoundedIcon />
              </ListItemDecorator>
            </MenuItem>
            <MenuItem
              component="a"
              href="https://github.com/mui/material-ui/tree/master/docs/data/joy/getting-started/templates/email"
            >
              Sourcecode
              <ListItemDecorator>
                <OpenInNewRoundedIcon />
              </ListItemDecorator>
            </MenuItem>
            <ListDivider />
            <MenuItem>
              <ListItemDecorator>
                <LogoutRoundedIcon />
              </ListItemDecorator>
              Log out
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>
    </Box>
  );
}
