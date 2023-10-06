import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Snackbar from '@mui/joy/Snackbar';

export default function SnackbarColors() {
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState('neutral');
  return (
    <Stack spacing={2} direction="row">
      {['primary', 'neutral', 'danger', 'success', 'warning'].map((color) => (
        <Button
          key={color}
          variant="outlined"
          color={color}
          onClick={() => {
            setOpen(true);
            setColor(color);
          }}
        >
          {color}
        </Button>
      ))}
      {['plain', 'outlined', 'soft', 'solid'].map((variant, index) => (
        <Snackbar
          key={variant}
          autoHideDuration={8000}
          open={open}
          variant={variant}
          color={color}
          anchorOrigin={
            [
              { vertical: 'top', horizontal: 'center' },
              { vertical: 'top', horizontal: 'right' },
              { vertical: 'bottom', horizontal: 'center' },
              { vertical: 'bottom', horizontal: 'right' },
            ][index]
          }
          onClose={(event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            return setOpen(false);
          }}
        >
          {variant} snackbar with {color} color.
        </Snackbar>
      ))}
    </Stack>
  );
}
