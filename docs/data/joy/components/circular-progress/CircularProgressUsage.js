import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import CircularProgress from '@mui/joy/CircularProgress';

export default function CircularProgressUsage() {
  return (
    <JoyUsageDemo
      componentName="CircularProgress"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'soft',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'primary',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'determinate',
          knob: 'switch',
          defaultValue: false,
        },
        {
          propName: 'value',
          knob: 'number',
          defaultValue: 25,
        },
      ]}
      renderDemo={(props) => <CircularProgress {...props} />}
    />
  );
}
