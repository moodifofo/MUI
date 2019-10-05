import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 300,
  },
  margin: {
    width: theme.spacing(3),
  },
}));

function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

export default function VerticalSlider() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Slider orientation="vertical" getAriaValueText={valuetext} defaultValue={30} />
        <div className={classes.margin} />
        <Slider disabled orientation="vertical" getAriaValueText={valuetext} defaultValue={30} />
        <div className={classes.margin} />
        <Slider
          orientation="vertical"
          defaultValue={[20, 37]}
          getAriaValueText={valuetext}
          marks={marks}
        />
      </div>
    </React.Fragment>
  );
}
