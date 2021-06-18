import * as React from 'react';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';

export default function ColorRadioButtons() {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div>
      <Radio {...controlProps('a')} />
      <Radio {...controlProps('b')} color="secondary" />
      <Radio {...controlProps('c')} color="error" />
      <Radio {...controlProps('d')} color="info" />
      <Radio {...controlProps('e')} color="success" />
      <Radio {...controlProps('f')} color="warning" />
      <Radio {...controlProps('g')} color="default" />
      <Radio
        {...controlProps('h')}
        sx={{
          color: green[800],
          '&.Mui-checked': {
            color: green[600],
          },
        }}
      />
    </div>
  );
}
