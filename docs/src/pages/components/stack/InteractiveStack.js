import * as React from 'react';
import Stack from '@material-ui/core/Stack';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 240,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function InteractiveGrid() {
  const classes = useStyles();
  const [direction, setDirection] = React.useState('row');
  const [justifyContent, setJustifyContent] = React.useState('center');
  const [alignItems, setAlignItems] = React.useState('center');
  const [spacing, setSpacing] = React.useState(1);

  const jsx = `
<Stack
  direction="${direction}"
  justifyContent="${justifyContent}"
  alignItems="${alignItems}"
  spacing="${spacing}"
>
`;

  return (
    <Stack className={classes.root}>
      <Stack
        direction={direction}
        justifyContent={justifyContent}
        alignItems={alignItems}
        spacing={spacing}
        className={classes.demo}
      >
        {[0, 1, 2].map((value) => (
          <Paper
            key={value}
            className={classes.paper}
            style={{
              paddingTop: (value + 1) * 10,
              paddingBottom: (value + 1) * 10,
            }}
          >
            {`Cell ${value + 1}`}
          </Paper>
        ))}
      </Stack>
      <Paper className={classes.control}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel>direction</FormLabel>
              <RadioGroup
                row
                name="direction"
                aria-label="direction"
                value={direction}
                onChange={(event) => {
                  setDirection(event.target.value);
                }}
              >
                <FormControlLabel value="row" control={<Radio />} label="row" />
                <FormControlLabel
                  value="row-reverse"
                  control={<Radio />}
                  label="row-reverse"
                />
                <FormControlLabel
                  value="column"
                  control={<Radio />}
                  label="column"
                />
                <FormControlLabel
                  value="column-reverse"
                  control={<Radio />}
                  label="column-reverse"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel>alignItems</FormLabel>
              <RadioGroup
                row
                name="alignItems"
                aria-label="align items"
                value={alignItems}
                onChange={(event) => {
                  setAlignItems(event.target.value);
                }}
              >
                <FormControlLabel
                  value="flex-start"
                  control={<Radio />}
                  label="flex-start"
                />
                <FormControlLabel
                  value="center"
                  control={<Radio />}
                  label="center"
                />
                <FormControlLabel
                  value="flex-end"
                  control={<Radio />}
                  label="flex-end"
                />
                <FormControlLabel
                  value="stretch"
                  control={<Radio />}
                  label="stretch"
                />
                <FormControlLabel
                  value="baseline"
                  control={<Radio />}
                  label="baseline"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel>justifyContent</FormLabel>
              <RadioGroup
                row
                name="justifyContent"
                aria-label="justifyContent"
                value={justifyContent}
                onChange={(event) => {
                  setJustifyContent(event.target.value);
                }}
              >
                <FormControlLabel
                  value="flex-start"
                  control={<Radio />}
                  label="flex-start"
                />
                <FormControlLabel
                  value="center"
                  control={<Radio />}
                  label="center"
                />
                <FormControlLabel
                  value="flex-end"
                  control={<Radio />}
                  label="flex-end"
                />
                <FormControlLabel
                  value="space-between"
                  control={<Radio />}
                  label="space-between"
                />
                <FormControlLabel
                  value="space-around"
                  control={<Radio />}
                  label="space-around"
                />
                <FormControlLabel
                  value="space-evenly"
                  control={<Radio />}
                  label="space-evenly"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel>spacing</FormLabel>
              <RadioGroup
                row
                name="spacing"
                aria-label="spacing"
                value={spacing}
                onChange={(event) => {
                  setSpacing(parseInt(event.target.value));
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <HighlightedCode code={jsx} language="jsx" />
    </Stack>
  );
}
