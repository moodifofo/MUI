import { Theme, useDefaultProps } from '@mui/material/styles';
import { SliderProps } from '@mui/material/Slider';

function ThemedComponent() {
  const props = useDefaultProps<Theme, SliderProps, 'MuiSlider'>({
    props: { color: 'primary' },
    name: 'MuiSlider',
  });

  // component's props are valid
  // Only existence of props is relevant here not type.
  props.track;
  props.valueLabelDisplay;
}
