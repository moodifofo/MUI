import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { createTheme, Theme, ThemeProvider, alpha } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles<Theme>((theme) => ({
  slider: {
    width: 300,
  },
  sliderSuccess: {
    color: theme.palette.success.main,
    '& .MuiSlider-thumb': {
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
      },
      '&.Mui-active': {
        boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
      },
    },
  },
}));

const theme = createTheme();

export default function DynamicClassName() {
  const classes = useStyles();
  const [success, setSuccess] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSuccess(event.target.checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        control={
          <Switch
            checked={success}
            onChange={handleChange}
            color="primary"
            value="dynamic-class-name"
          />
        }
        label="Success"
      />
      <Slider
        className={clsx(classes.slider, {
          [classes.sliderSuccess]: success,
        })}
        defaultValue={30}
        sx={{ mt: 1 }}
      />
    </ThemeProvider>
  );
}
