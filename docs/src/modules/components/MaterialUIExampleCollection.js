import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';

// #default-branch-switch
const examples = [
  {
    name: 'Next.js App Router',
    label: 'View JavaScript',
    tsLabel: 'View TypeScript',
    link: 'https://github.com/mui/material-ui/tree/next/examples/material-ui-nextjs',
    tsLink: 'https://github.com/mui/material-ui/tree/next/examples/material-ui-nextjs-ts',
    src: '/static/images/examples/next.svg',
  },
  {
    name: 'Next.js Pages Router',
    label: 'View JavaScript',
    tsLabel: 'View TypeScript',
    link: 'https://github.com/mui/material-ui/tree/next/examples/material-ui-nextjs-pages-router',
    tsLink:
      'https://github.com/mui/material-ui/tree/next/examples/material-ui-nextjs-pages-router-ts',
    src: '/static/images/examples/next.svg',
  },
  {
    name: 'Vite.js',
    label: 'View JavaScript',
    tsLabel: 'View TypeScript',
    link: 'https://github.com/mui/material-ui/tree/next/examples/material-ui-vite',
    tsLink: 'https://github.com/mui/material-ui/tree/next/examples/material-ui-vite-ts',
    src: '/static/images/examples/vite.svg',
  },
  {
    name: 'Remix',
    label: 'View TypeScript',
    link: 'https://github.com/mui/material-ui/tree/next/examples/material-ui-remix-ts',
    src: '/static/images/examples/remix.svg',
  },
  {
    name: 'Create React App',
    label: 'View JavaScript',
    tsLabel: 'View TypeScript',
    link: 'https://github.com/mui/material-ui/tree/next/examples/material-ui-cra',
    tsLink: 'https://github.com/mui/material-ui/tree/next/examples/material-ui-cra-ts',
    src: '/static/images/examples/cra.svg',
  },
  {
    name: 'Tailwind CSS + Create React App',
    label: 'View TypeScript',
    link: 'https://github.com/mui/material-ui/tree/next/examples/material-ui-cra-tailwind-ts',
    src: '/static/images/examples/tailwindcss.svg',
  },
  {
    name: 'styled-components',
    label: 'View JavaScript',
    tsLabel: 'View TypeScript',
    link: 'https://github.com/mui/material-ui/tree/next/examples/material-ui-cra-styled-components',
    tsLink:
      'https://github.com/mui/material-ui/tree/next/examples/material-ui-cra-styled-components-ts',
    src: '/static/images/examples/styled.png',
  },
  {
    name: 'Preact',
    label: 'View JavaScript',
    link: 'https://github.com/mui/material-ui/tree/next/examples/material-ui-preact',
    src: '/static/images/examples/preact.svg',
  },
  {
    name: 'CDN',
    label: 'View JavaScript',
    link: 'https://github.com/mui/material-ui/tree/next/examples/material-ui-via-cdn',
    src: <CloudRoundedIcon />,
  },
  {
    name: 'Express.js (server-rendered)',
    label: 'View JavaScript',
    link: 'https://github.com/mui/material-ui/tree/next/examples/material-ui-express-ssr',
    src: '/static/images/examples/express.png',
  },
  {
    name: 'Gatsby',
    label: 'View JavaScript',
    link: 'https://github.com/mui/material-ui/tree/next/examples/material-ui-gatsby',
    src: '/static/images/examples/gatsby.svg',
  },
  {
    name: 'React-admin',
    label: 'View TypeScript',
    link: 'https://github.com/marmelab/material-ui-react-admin',
    src: '/static/images/examples/reactadmin.svg',
  },
];

export default function MaterialUIExampleCollection() {
  return (
    <Grid container spacing={2}>
      {examples.map((example) => (
        <Grid key={example.name} xs={12} sm={6}>
          <Paper
            variant="outlined"
            sx={(theme) => ({
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              background: `${(theme.vars || theme).palette.gradients.radioSubtle}`,
            })}
          >
            <Avatar
              alt={example.name}
              imgProps={{
                width: '38',
                height: '38',
                loading: 'lazy',
              }}
              {...(typeof example.src === 'string'
                ? { src: example.src }
                : { children: example.src })}
            />
            <div>
              <Typography fontWeight="medium" className="algolia-lvl3">
                {example.name}
              </Typography>
              <Box
                data-ga-event-category="material-ui-example"
                data-ga-event-label={example.name}
                data-ga-event-action="click"
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  mt: 0.5,
                  gap: 0.2,
                }}
              >
                <Link
                  href={example.link}
                  variant="body2"
                  sx={{
                    '& > svg': { transition: '0.2s' },
                    '&:hover > svg': { transform: 'translateX(2px)' },
                  }}
                >
                  {example.label}
                  <ChevronRightRoundedIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                </Link>
                {!!example.tsLink && (
                  <React.Fragment>
                    <Typography
                      variant="caption"
                      sx={{
                        display: { xs: 'none', sm: 'block' },
                        opacity: 0.1,
                        mr: 1,
                      }}
                    >
                      /
                    </Typography>
                    <Link
                      href={example.tsLink}
                      variant="body2"
                      sx={{
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' },
                      }}
                    >
                      {example.tsLabel}
                      <ChevronRightRoundedIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                    </Link>
                  </React.Fragment>
                )}
              </Box>
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
