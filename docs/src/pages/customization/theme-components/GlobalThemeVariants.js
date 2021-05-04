import * as React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const defaultTheme = createTheme();

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            border: `2px dashed ${defaultTheme.palette.primary.main}`,
            color: defaultTheme.palette.primary.main,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: `2px dashed ${defaultTheme.palette.secondary.main}`,
            color: defaultTheme.palette.secondary.main,
          },
        },
        {
          props: { variant: 'dashed', size: 'large' },
          style: {
            borderWidth: 4,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary', size: 'large' },
          style: {
            fontSize: 18,
          },
        },
      ],
    },
  },
});

export default function GlobalThemeVariants() {
  return (
    <Box sx={{ '& > *': { m: 1 } }}>
      <ThemeProvider theme={theme}>
        <Button variant="dashed">Dashed</Button>
        <Button variant="dashed" color="secondary">
          Secondary
        </Button>
        <Button variant="dashed" size="large">
          Large
        </Button>
        <Button variant="dashed" color="secondary" size="large">
          Secondary large
        </Button>
      </ThemeProvider>
    </Box>
  );
}
