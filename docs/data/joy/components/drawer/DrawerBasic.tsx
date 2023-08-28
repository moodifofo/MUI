import * as React from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/joy/styles';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function DrawerBasic(props: Props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(inOpen);
    };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar>
        <IconButton variant="solid" color="primary" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
      </AppBar>
      <Drawer container={container} open={open} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
              <ListItem key={text}>
                <ListItemButton>{text}</ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text) => (
              <ListItem key={text}>
                <ListItemButton>{text}</ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

const AppBar = styled('header')(({ theme }) => ({
  minHeight: 48,
  padding: theme.spacing(0.5),
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  boxSizing: 'border-box', // Prevent padding issue with the Modal and fixed positioned AppBar.
  flexShrink: 0,
  position: 'fixed',
  top: 0,
  left: 'auto',
  right: 0,
  zIndex: 10,
  ...theme.variants.solid.primary,
}));
