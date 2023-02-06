import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator, {
  listItemDecoratorClasses,
} from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function SecondSidebar() {
  return (
    <Sheet
      variant="solid"
      color="success"
      invertedColors
      sx={{
        position: {
          xs: 'fixed',
          lg: 'sticky',
        },
        zIndex: 2,
        height: '100dvh',
        top: 0,
        p: 1.5,
        py: 3,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <List
        sx={{
          '--List-item-radius': '4px',
          '--List-item-minHeight': '32px',
          '--List-gap': '4px',
          [`& .${listItemDecoratorClasses.root}`]: {
            display: {
              md: 'none',
            },
          },
        }}
      >
        <ListSubheader role="presentation" sx={{ color: 'text.primary' }}>
          Dashboard
        </ListSubheader>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <i data-feather="activity" />
            </ListItemDecorator>
            <ListItemContent>Overview</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <i data-feather="bell" />
            </ListItemDecorator>
            <ListItemContent>Notification</ListItemContent>
            <Chip variant="soft" size="sm">
              10
            </Chip>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <i data-feather="bar-chart" />
            </ListItemDecorator>
            <ListItemContent>Analytics</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <i data-feather="star" />
            </ListItemDecorator>
            <ListItemContent>Saved reports</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton selected variant="soft">
            <ListItemDecorator>
              <i data-feather="shopping-cart" />
            </ListItemDecorator>
            <ListItemContent>Orders</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <i data-feather="user" />
            </ListItemDecorator>
            <ListItemContent>User reports</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <i data-feather="settings" />
            </ListItemDecorator>
            <ListItemContent>Manage notifications</ListItemContent>
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ pl: 1, mt: 'auto', display: 'flex', alignItems: 'center' }}>
        <div>
          <Typography>Olivia Ryhe</Typography>
          <Typography level="body2">olivia@email.com</Typography>
        </div>
        <IconButton variant="plain" sx={{ ml: 'auto' }}>
          <i data-feather="log-out" />
        </IconButton>
      </Box>
    </Sheet>
  );
}
