import React from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputLabel from '@material-ui/core/InputLabel';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import green from '@material-ui/core/colors/green';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';

const CssTextField = withStyles({
  root: {
    '& label.focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }),
)(InputBase);

const useStylesReddit = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
    focused: {},
  }),
);

function RedditTextField(props: TextFieldProps) {
  const classes = useStylesReddit();

  return (
    <TextField
      InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

function CustomizedInputs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssTextField className={classes.margin} id="custom-css-standard-input" label="Custom CSS" />
      <CssTextField
        className={classes.margin}
        label="Custom CSS"
        variant="outlined"
        id="custom-css-outlined-input"
      />
      <ThemeProvider theme={theme}>
        <TextField
          className={classes.margin}
          label="ThemeProvider"
          id="mui-theme-provider-standard-input"
        />
        <TextField
          className={classes.margin}
          label="ThemeProvider"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
        />
      </ThemeProvider>
      <FormControl className={classes.margin}>
        <InputLabel shrink htmlFor="bootstrap-input">
          Bootstrap
        </InputLabel>
        <BootstrapInput defaultValue="react-bootstrap" id="bootstrap-input" />
      </FormControl>
      <RedditTextField
        label="Reddit"
        className={classes.margin}
        defaultValue="react-reddit"
        variant="filled"
        id="reddit-input"
      />
      <InputBase className={classes.margin} defaultValue="Naked input" />
    </div>
  );
}

export default CustomizedInputs;
