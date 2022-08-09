import * as React from 'react';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';

export default function RadioButtons() {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="radio-buttons"
        componentsProps={{ input: { 'aria-label': 'A' } }}
      />
      <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        value="b"
        name="radio-buttons"
        componentsProps={{ input: { 'aria-label': 'B' } }}
      />
    </Box>
  );
}
