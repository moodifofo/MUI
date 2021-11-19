import * as React from 'react';
import Head from 'next/head';
import { GlobalStyles } from '@mui/styled-engine';
import MuiAppBar from '@mui/material/AppBar';
import MuiButton from '@mui/material/Button';
import MuiChip from '@mui/material/Chip';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled, CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

const Moon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M7.5 6.375C7.5 4.93969 7.71141 3.48703 8.25 2.25C4.66734 3.80953 2.25 7.46812 2.25 11.625C2.25 17.2167 6.78328 21.75 12.375 21.75C16.5319 21.75 20.1905 19.3327 21.75 15.75C20.513 16.2886 19.0603 16.5 17.625 16.5C12.0333 16.5 7.5 11.9667 7.5 6.375Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const System = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M12 21.75C6.615 21.75 2.25 17.385 2.25 12C2.25 6.615 6.615 2.25 12 2.25V21.75Z"
      fill="currentColor"
    />
  </svg>
);

const Sun = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M12 2.25V4.5M12 19.5V21.75M18.8944 5.10562L17.3034 6.69656M6.69656 17.3034L5.10562 18.8944M21.75 12H19.5M4.5 12H2.25M18.8944 18.8944L17.3034 17.3034M6.69656 6.69656L5.10562 5.10562"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
  </svg>
);

const Close = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M17.25 6.75L6.75 17.25M17.25 17.25L6.75 6.75L17.25 17.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PushButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ theme, selected }) => [
  {
    width: 36,
    height: 36,
    borderRadius: 18,
    cursor: selected ? 'initial' : 'pointer',
    border: 'none',
    background: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected ? theme.variant.filled?.brand : theme.variant.text?.neutral,
]);

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: '48px',
        border: '1px solid',
        borderRadius: '24px',
        ...theme.variant.outlined.brand,
        backgroundColor: 'var(--joy-palette-surface-default)',
      })}
    >
      <Box sx={{ display: 'flex', gap: '8px', p: '6px' }}>
        {['system', 'light', 'dark'].map((modeId) => {
          const icons = {
            system: System,
            light: Sun,
            dark: Moon,
          };
          const Icon = icons[modeId];
          return (
            <PushButton
              key={modeId}
              selected={mode === modeId}
              onClick={() => {
                setMode(modeId);
              }}
            >
              <Icon />
            </PushButton>
          );
        })}
      </Box>
    </Box>
  );
};

const Button = styled('button')(({ theme, variant = 'contained', color = 'brand' }) => [
  {
    minHeight: 48,
    border: 0,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5rem 2rem',
    borderRadius: '24px',
    cursor: 'pointer',
    background: 'transparent',
    '&:focus-visible': theme.focus.default,
  },
  theme.typography.button,
  theme.variant[variant]?.[color],
  theme.variant[`${variant}Hover`]?.[color],
  theme.variant[`${variant}Active`]?.[color],
  theme.variant[`${variant}Disabled`]?.[color],
]);

const Badge = styled('span')(({ theme, variant = 'contained', color = 'brand' }) => [
  {
    minHeight: 32,
    minWidth: 32,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    padding: '0.25rem 0.5rem',
  },
  theme.typography.caption,
  {
    fontWeight: 600,
    lineHeight: 1,
  },
  theme.variant[variant]?.[color],
]);

const Avatar = styled('div')(({ theme, variant = 'filled', color = 'brand' }) => [
  theme.typography.h5,
  {
    width: 64,
    height: 64,
    borderRadius: '50%',
    fontWeight: 700,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  theme.variant[variant]?.[color],
]);

const Paper = styled('div')(({ theme, variant = 'text', color = 'neutral', elevation }) => [
  {
    minWidth: 100,
    minHeight: 120,
    padding: '1rem',
    borderRadius: 4,
    backgroundColor: `var(--joy-variant-${variant}Bg, var(--joy-palette-bgNeutral-plain))`,
    boxShadow: theme.elevation?.[elevation],
  },
  theme.variant[variant]?.[color],
  variant === 'contained' && theme.variant.containedContext?.[color],
]);

const List = styled('ul')(({ theme, variant = 'text', color = 'neutral' }) => [
  {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: 4,
    listStyle: 'none',
    padding: '0.5rem 0.25rem',
    borderRadius: 4,
    margin: 0,
    backgroundColor: `var(--joy-variant-${variant}Bg, var(--joy-palette-bgNeutral-plain))`,
  },
  theme.variant[variant]?.[color],
]);

const ListItem = styled('li')(({ theme, variant = 'text', color = 'neutral' }) => [
  theme.typography.body,
  {
    padding: '0.25rem 0.5rem',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 160,
  },
  theme.variant[variant]?.[color],
  theme.variant[`${variant}Hover`]?.[color],
  theme.variant[`${variant}Disabled`]?.[color],
]);

const IconButton = styled('button')(({ theme, variant = 'filled', color = 'brand' }) => [
  {
    border: 0,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.25rem',
    borderRadius: '50%',
    cursor: 'pointer',
    background: 'transparent',
    '&:focus-visible': theme.focus.default,
  },
  theme.typography.button,
  theme.variant[variant]?.[color],
  theme.variant[`${variant}Hover`]?.[color],
  theme.variant[`${variant}Disabled`]?.[color],
]);

const Input = styled('input')(({ theme, variant = 'outlined', color = 'neutral' }) => [
  {
    minHeight: 48,
    maxWidth: '100%',
    border: '2px solid transparent',
    backgroundColor: `var(--joy-variant-${variant}Bg, var(--joy-palette-bgNeutral-plain))`,
    borderRadius: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    '&::placeholder': {
      opacity: 0.72,
      color: `var(--joy-variant-${variant}Color, ${theme.vars.palette.text.detail})`,
    },
    '&:focus-visible': theme.focus.default,
  },
  theme.typography.body,
  theme.variant[variant]?.[color],
  theme.variant[`${variant}Hover`]?.[color],
  theme.variant[`${variant}Disabled`]?.[color],
]);

const AppBar = styled(Paper)({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  width: '100%',
  minHeight: '64px',
});

const Chip = styled('div')(({ theme, variant = 'outlined', color = 'neutral' }) => [
  {
    borderRadius: '24px',
    minHeight: '40px',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
  },
  theme.variant[variant]?.[color],
]);

const Tabs = styled('div')(({ theme, variant = 'text', color = 'neutral' }) => [
  {
    display: 'flex',
    gap: '0.5rem',
    padding: '0.25rem',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: 'var(--joy-palette-bgNeutral-plain)',
  },
  theme.variant[variant]?.[color],
  variant === 'contained' && theme.variant.containedContext?.[color],
]);

export default function JoyVariants() {
  return (
    <React.Fragment>
      <Container>
        <h2>Contextual override does NOT work in `@mui/material`</h2>
        <p>
          When you render components inside `AppBar` or `Snackbar`, you will have to customize the
          styles of each children.
        </p>
        <Box
          sx={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(2, 1fr)',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          <MuiAppBar color="primary" position="relative">
            <MuiToolbar>
              <MuiTextField variant="outlined" placeholder="Search..." />
              <MuiButton color="inherit">Search</MuiButton>
              <MuiChip variant="outlined" label="Chip" onDelete={() => {}} />
            </MuiToolbar>
          </MuiAppBar>
          <Box sx={{ bgcolor: 'text.primary', p: 2, width: '100%', borderRadius: '4px' }}>
            <HighlightedCode
              code={`
<AppBar color="primary" position="relative">
  <Toolbar>
    <TextField variant="outlined" placeholder="Search..." />
    <Button color="inherit">Search</Button>
    <Chip variant="outlined" label="Chip" onDelete={() => {}} />
  </Toolbar>
</AppBar>`}
              component="div"
              language="jsx"
            />
          </Box>
        </Box>
      </Container>
      <br />
      <br />
      <CssVarsProvider defaultMode="system">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>

        <GlobalStyles
          styles={(theme) => ({
            body: {
              margin: 0,
              backgroundColor: 'var(--joy-palette-surface-default)',
              color: 'var(--joy-palette-letter-major)',
              ...theme.typography.body,
              '*': {
                boxSizing: 'border-box',
              },
            },
            pre: {
              fontSize: '13px',
            },
          })}
        />
        <Box
          component="header"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            minHeight: 64,
          }}
        >
          <ColorSchemePicker />
        </Box>
        <Container>
          <h2>Joy provides built-in contextual override</h2>
          <p>
            This page demonstrates built-in contextual override feature. Parent component that has
            `contained` variant will automatically adjust children to match its color. (Developers
            will be able to customize the contextual override from the theming API.)
          </p>
          <Box
            sx={{
              display: 'grid',
              gap: '16px',
              gridTemplateColumns: 'repeat(2, 1fr)',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', gap: '16px' }}>
              <Tabs variant="contained" color="brand">
                <Button variant="text">Tab 1</Button>
                <Button variant="text">Tab 2</Button>
                <Button variant="filled">Tab 3</Button>
              </Tabs>
            </Box>
            <Paper variant="contained" sx={{ width: '100%' }}>
              <HighlightedCode
                code={`
<Tabs variant="contained" color="brand">
  <Button variant="text">Tab 1</Button>
  <Button variant="text">Tab 2</Button>
  <Button variant="filled">Tab 3</Button>
</Tabs>`}
                component="div"
                language="jsx"
              />
            </Paper>

            <Box sx={{ display: 'flex', gap: '16px' }}>
              <AppBar variant="contained" color="brand">
                <IconButton variant="text">
                  <Close />
                </IconButton>
                <Chip color="brand" sx={{ ml: 'auto' }}>
                  <IconButton sx={{ mr: '6px', ml: '-6px' }}>
                    <Close width="20" height="20" />
                  </IconButton>
                  Design
                </Chip>
                <Input variant="filled" color="brand" placeholder="Search" />
              </AppBar>
            </Box>
            <Paper variant="contained" sx={{ width: '100%' }}>
              <HighlightedCode
                code={`
<AppBar variant="contained" color="brand">
  <IconButton variant="text">
    <Close />
  </IconButton>
  <Chip color="brand" sx={{ ml: 'auto' }}>
    <IconButton sx={{ mr: '6px', ml: '-6px' }}>
      <Close width="20" height="20" />
    </IconButton>
    Design
  </Chip>
  <Input variant="filled" color="brand" placeholder="Search" />
</AppBar>`}
                component="div"
                language="jsx"
              />
            </Paper>

            <Box sx={{ display: 'flex', gap: '16px' }}>
              <AppBar variant="contained" color="brand">
                <IconButton variant="text">
                  <Close />
                </IconButton>
                <Input variant="outlined" color="brand" placeholder="Search" sx={{ ml: 'auto' }} />
                <Avatar variant="filled" sx={{ width: 48, height: 48 }} />
              </AppBar>
            </Box>
            <Paper variant="contained" sx={{ width: '100%' }}>
              <HighlightedCode
                code={`
<AppBar variant="contained" color="brand">
  <IconButton variant="text">
    <Close />
  </IconButton>
  <Input variant="outlined" color="brand" placeholder="Search" sx={{ ml: 'auto' }} />
  <Avatar variant="filled" sx={{ width: 48, height: 48 }} />
</AppBar>`}
                component="div"
                language="jsx"
              />
            </Paper>

            <Box sx={{ display: 'flex', gap: '16px' }}>
              <AppBar variant="contained" color="neutral">
                Hello World
                <Button variant="outlined" color="brand">
                  Notify
                </Button>
              </AppBar>
            </Box>
            <Paper variant="contained" sx={{ width: '100%' }}>
              <HighlightedCode
                code={`
<AppBar
  variant="contained"
  color="neutral"
>
  Hello World
  <Button variant="outlined" color="brand">
    Notify
  </Button>
</AppBar>`}
                component="div"
                language="jsx"
              />
            </Paper>

            <Box>
              <Paper
                variant="contained"
                color="neutral"
                sx={{
                  minWidth: '256px',
                }}
              >
                <Input placeholder="Search..." sx={{ width: '100%' }} />
                <br />
                <br />
                <List
                  sx={{ '& > li': { justifyContent: 'flex-start', '& > svg': { mr: '0.5rem' } } }}
                >
                  <ListItem>
                    <Sun />
                    Getting Started
                  </ListItem>
                  <ListItem variant="outlined">
                    <Sun />
                    Components
                  </ListItem>
                  <ListItem>
                    <Sun />
                    Components
                  </ListItem>
                  <ListItem>
                    <Sun />
                    System
                  </ListItem>
                </List>
                <br />
                <Button variant="filled" sx={{ width: '100%', mb: '8px' }}>
                  Log out
                </Button>
                <Button variant="outlined" sx={{ width: '100%' }}>
                  What&apos;s new?
                </Button>
              </Paper>
            </Box>
            <Paper variant="contained" sx={{ width: '100%' }}>
              <HighlightedCode
                code={`
<Paper variant="contained" color="neutral">
  <Input placeholder="Search..." sx={{ width: '100%' }} />
  <br />
  <br />
  <List>
    <ListItem>
      <Sun />
      Getting Started
    </ListItem>
    <ListItem variant="outlined">
      <Sun />
      Components
    </ListItem>
    <ListItem>
      <Sun />
      Components
    </ListItem>
    <ListItem>
      <Sun />
      System
    </ListItem>
  </List>
  <br />
  <Button variant="filled" sx={{ width: '100%', mb: '8px' }}>
    Log out
  </Button>
  <Button variant="outlined" sx={{ width: '100%' }}>
    What&apos;s new?
  </Button>
</Paper>`}
                component="div"
                language="jsx"
              />
            </Paper>

            <Box>
              <Paper
                variant="contained"
                color="brand"
                sx={{
                  minWidth: '256px',
                  gridColumn: 'span 2',
                }}
              >
                <Input placeholder="Search..." sx={{ width: '100%' }} />
                <br />
                <br />
                <List
                  sx={{ '& > li': { justifyContent: 'flex-start', '& > svg': { mr: '0.5rem' } } }}
                >
                  <ListItem>
                    <Sun />
                    Getting Started{' '}
                    <Badge variant="contained" sx={{ ml: 'auto', mr: '-4px' }}>
                      2
                    </Badge>
                  </ListItem>
                  <ListItem variant="filled">
                    <Sun />
                    Components{' '}
                    <Badge variant="contained" sx={{ ml: 'auto', mr: '-4px' }}>
                      7
                    </Badge>
                  </ListItem>
                  <ListItem>
                    <Sun />
                    Components
                    <Badge variant="contained" sx={{ ml: 'auto', mr: '-4px' }}>
                      8
                    </Badge>
                  </ListItem>
                  <ListItem>
                    <Sun />
                    System
                  </ListItem>
                </List>
                <br />
                <Button variant="filled" sx={{ width: '100%', mb: '8px' }}>
                  Log out
                </Button>
                <Button variant="outlined" sx={{ width: '100%' }}>
                  What&apos;s new?
                </Button>
              </Paper>
            </Box>
            <Paper variant="contained" sx={{ width: '100%' }}>
              <HighlightedCode
                code={`
<Paper variant="contained" color="brand">
  <Input placeholder="Search..." sx={{ width: '100%' }} />
  <br />
  <br />
  <List>
    <ListItem>
      <Sun />
      Getting Started{' '}
      <Badge variant="contained" sx={{ ml: 'auto', mr: '-4px' }}>
        2
      </Badge>
    </ListItem>
    <ListItem variant="filled">
      <Sun />
      Components{' '}
      <Badge variant="contained" sx={{ ml: 'auto', mr: '-4px' }}>
        7
      </Badge>
    </ListItem>
    <ListItem>
      <Sun />
      Components
      <Badge variant="contained" sx={{ ml: 'auto', mr: '-4px' }}>
        8
      </Badge>
    </ListItem>
    <ListItem>
      <Sun />
      System
    </ListItem>
  </List>
  <br />
  <Button variant="filled" sx={{ width: '100%', mb: '8px' }}>
    Log out
  </Button>
  <Button variant="outlined" sx={{ width: '100%' }}>
    What&apos;s new?
  </Button>
</Paper>`}
                component="div"
                language="jsx"
              />
            </Paper>
          </Box>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Container>
      </CssVarsProvider>
    </React.Fragment>
  );
}
