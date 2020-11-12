import * as React from 'react';
import { Box, ThemeProvider } from 'theme-ui';

const theme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
};

export default function ThemeUISxPropBox() {
  return (
    <ThemeProvider theme={theme}>
      {new Array(1000).fill().map(() => (
        <Box
          sx={{
            width: 200,
            height: 200,
            color: 'primary',
            backgroundColor: ['primary', 'text', 'background'],
            borderWidth: '3px',
            borderColor: 'white',
            borderStyle: ['dashed', 'solid', 'dotted'],
            ':hover': {
              backgroundColor: (t) => t.colors.text,
            },
          }}
        >
          theme-ui
        </Box>
      ))}
    </ThemeProvider>
  );
}
