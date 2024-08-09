import * as React from 'react';
import PropTypes from 'prop-types';
import Menu, { menuClasses } from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Sheet from '@mui/joy/Sheet';
import Apps from '@mui/icons-material/Apps';
import Settings from '@mui/icons-material/Settings';
import Person from '@mui/icons-material/Person';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';

// The Menu is built on top of Popper v2, so it accepts `modifiers` prop that will be passed to the Popper.
// https://popper.js.org/docs/v2/modifiers/offset/

const modifiers = [
  {
    name: 'offset',
    options: {
      offset: ({ placement }) => {
        if (placement.includes('end')) {
          return [8, 20];
        }
        return [-8, 20];
      },
    },
  },
];

function NavMenuButton({ children, menu, open, onOpen, onClose, label, ...props }) {
  const isOnButton = React.useRef(false);
  const internalOpen = React.useRef(open);
  const menuRef = React.useRef(null);

  const handleButtonKeyDown = (event) => {
    internalOpen.current = open;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      onOpen(event);
    }
  };

  const createHandleCloseMenu = React.useCallback(
    (event) => {
      const isClickInsideMenu =
        event.target instanceof Node && menuRef.current?.contains(event.target);
      const isClickOnButton =
        event.target instanceof Node &&
        menuRef.current?.parentNode?.contains(event.target);
      if (!isClickInsideMenu && !isClickOnButton && open) {
        onClose();
      }
    },
    [onClose, open],
  );

  React.useEffect(() => {
    document.addEventListener('mousedown', createHandleCloseMenu);

    return () => {
      document.removeEventListener('mousedown', createHandleCloseMenu);
    };
  }, [createHandleCloseMenu]);

  return (
    <Dropdown
      open={open}
      onOpenChange={(_, isOpen) => {
        if (isOpen) {
          onOpen?.();
        }
      }}
    >
      <MenuButton
        {...props}
        ref={menuRef}
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
        onMouseDown={() => {
          internalOpen.current = open;
        }}
        onMouseEnter={() => {
          onOpen();
          isOnButton.current = true;
        }}
        onKeyDown={handleButtonKeyDown}
        sx={{
          bgcolor: open ? 'neutral.plainHoverBg' : undefined,
          '&:focus-visible': {
            bgcolor: 'neutral.plainHoverBg',
          },
        }}
      >
        {children}
      </MenuButton>
      {React.cloneElement(menu, {
        modifiers,
        slotProps: {
          listbox: {
            id: `nav-example-menu-${label}`,
            'aria-label': label,
          },
        },
        placement: 'right-start',
        sx: {
          width: 288,
          [`& .${menuClasses.listbox}`]: {
            '--List-padding': 'var(--ListDivider-gap)',
          },
        },
      })}
    </Dropdown>
  );
}

NavMenuButton.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  menu: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function MenuIconSideNavExample() {
  const [menuIndex, setMenuIndex] = React.useState(null);
  const itemProps = {
    onClick: () => setMenuIndex(null),
  };
  return (
    <Sheet sx={{ borderRadius: 'sm', py: 1, mr: 20 }}>
      <List>
        <ListItem>
          <NavMenuButton
            label="Apps"
            open={menuIndex === 0}
            onOpen={() => setMenuIndex(0)}
            onClose={() => setMenuIndex(null)}
            menu={
              <Menu onClose={() => setMenuIndex(null)}>
                <MenuItem {...itemProps}>Application 1</MenuItem>
                <MenuItem {...itemProps}>Application 2</MenuItem>
                <MenuItem {...itemProps}>Application 3</MenuItem>
              </Menu>
            }
          >
            <Apps />
          </NavMenuButton>
        </ListItem>
        <ListItem>
          <NavMenuButton
            label="Settings"
            open={menuIndex === 1}
            onOpen={() => setMenuIndex(1)}
            onClose={() => setMenuIndex(null)}
            menu={
              <Menu onClose={() => setMenuIndex(null)}>
                <MenuItem {...itemProps}>Setting 1</MenuItem>
                <MenuItem {...itemProps}>Setting 2</MenuItem>
                <MenuItem {...itemProps}>Setting 3</MenuItem>
              </Menu>
            }
          >
            <Settings />
          </NavMenuButton>
        </ListItem>
        <ListItem>
          <NavMenuButton
            label="Personal"
            open={menuIndex === 2}
            onOpen={() => setMenuIndex(2)}
            onClose={() => setMenuIndex(null)}
            menu={
              <Menu onClose={() => setMenuIndex(null)}>
                <MenuItem {...itemProps}>Personal 1</MenuItem>
                <MenuItem {...itemProps}>Personal 2</MenuItem>
                <MenuItem {...itemProps}>Personal 3</MenuItem>
              </Menu>
            }
          >
            <Person />
          </NavMenuButton>
        </ListItem>
      </List>
    </Sheet>
  );
}
