import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function ConstrainedTextField() {
  return (
    <div
      style={{
        width: 100,
        border: '1px solid red',
      }}
    >
      <TextField label="Outlined" variant="outlined" />
    </div>
  );
}
