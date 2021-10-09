import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Switch from '@mui/joy/Switch';

const Typography = styled('div')(({ theme: { vars } }) => ({
  fontSize: vars.fontSize.md,
  color: vars.background.contrast,
}));

const Toggle = () => {
  const [mounted, setMounted] = React.useState(false);
  const { allColorSchemes, colorScheme, setColorScheme } = useColorScheme();

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {allColorSchemes.map((color) => (
        <Box
          component="button"
          key={color}
          onClick={() => setColorScheme(color)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            alignItems: 'center',
            minWidth: 80,
            border: 0,
            bgcolor: 'transparent',
            cursor: 'pointer',
          }}
        >
          <Box
            {...(color !== 'light' && { 'data-color-scheme': color })}
            sx={{
              borderRadius: 10,
              width: 40,
              height: 40,
              backgroundColor: color === 'light' ? '#007FFF' : 'var(--palette-brand)',
              ...(colorScheme === color && {
                outline: `2px solid var(--palette-brand)`,
                outlineOffset: 4,
              }),
            }}
          />
          <Typography>{color}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default function SwitchJoy() {
  const [length, setLength] = React.useState(10);

  return (
    <CssVarsProvider>
      <Box sx={{ bgcolor: 'var(--background-app)', minHeight: '100vh' }}>
        <Box sx={{ py: 2, display: 'flex' }}>
          <Toggle />
        </Box>
        <Box sx={{ py: 2, textAlign: 'center' }}>
          <select value={length} onChange={(event) => setLength(Number(event.target.value))}>
            <option value={10}>10</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
          </select>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            p: 2,
            justifyContent: 'center',
          }}
        >
          {[...Array(length)].map((_, index) => (
            <Box key={index}>
              <Switch checked={index % 2 === 0} />
            </Box>
          ))}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
