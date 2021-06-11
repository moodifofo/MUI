import * as React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

declare module '@material-ui/core/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

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
    <ThemeProvider theme={theme}>
      <Button variant="dashed" sx={{ m: 1 }}>
        Dashed
      </Button>
      <Button variant="dashed" color="secondary" sx={{ m: 1 }}>
        Secondary
      </Button>
      <Button variant="dashed" size="large" sx={{ m: 1 }}>
        Large
      </Button>
      <Button variant="dashed" color="secondary" size="large" sx={{ m: 1 }}>
        Secondary large
      </Button>
    </ThemeProvider>
  );
}
