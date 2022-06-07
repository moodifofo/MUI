import * as React from 'react';
import Box from '@mui/joy/Box';
import Slider, { sliderClasses } from '@mui/joy/Slider';

function valueText(value) {
  return `$${value}`;
}

export default function EdgeLabelSlider() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        max={10}
        aria-label="Always visible"
        defaultValue={80}
        getAriaValueText={valueText}
        marks
        valueLabelDisplay="on"
        sx={{
          [`& .${sliderClasses.thumbStart} .${sliderClasses.valueLabel}`]: {
            left: 'calc(var(--Slider-thumb-size) / 2 - 2px)', // 2px is the thumb border width
            borderBottomLeftRadius: 0,
            '&::before': {
              left: 0,
              transform: 'translateY(100%)',
              borderLeftColor: 'currentColor',
            },
          },
          [`& .${sliderClasses.thumbEnd} .${sliderClasses.valueLabel}`]: {
            right: 'calc(var(--Slider-thumb-size) / 2 - 2px)', // 2px is the thumb border width
            borderBottomRightRadius: 0,
            '&::before': {
              left: 'initial',
              right: 0,
              transform: 'translateY(100%)',
              borderRightColor: 'currentColor',
            },
          },
        }}
      />
    </Box>
  );
}
