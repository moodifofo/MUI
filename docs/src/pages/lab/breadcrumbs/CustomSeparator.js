/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Breadcrumb from '@material-ui/lab/Breadcrumb';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const styles = theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paper: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
});

function handleClick() {
  alert('You clicked a Breadcrumb.'); // eslint-disable-line no-alert
}

function CustomSeparator(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Breadcrumbs separator="›" arial-label="Breadcrumb navigation">
          <Breadcrumb>
            <Link color="inherit" href="#" onClick={handleClick}>
              Material-UI
            </Link>
          </Breadcrumb>
          <Breadcrumb>
            <Link color="inherit" href="#" onClick={handleClick}>
              Lab
            </Link>
          </Breadcrumb>
          <Breadcrumb color="textPrimary">Breadcrumb</Breadcrumb>
        </Breadcrumbs>
      </Paper>
      <br />
      <Paper className={classes.paper}>
        <Breadcrumbs separator="-" arial-label="Breadcrumb navigation">
          <Breadcrumb>
            <Link color="inherit" href="#" onClick={handleClick}>
              Material-UI
            </Link>
          </Breadcrumb>
          <Breadcrumb>
            <Link color="inherit" href="#" onClick={handleClick}>
              Lab
            </Link>
          </Breadcrumb>
          <Breadcrumb color="textPrimary">Breadcrumb</Breadcrumb>
        </Breadcrumbs>
      </Paper>
      <br />
      <Paper className={classes.paper}>
        <Breadcrumbs separator={<NavigateNextIcon />} arial-label="Breadcrumb navigation">
          <Breadcrumb>
            <Link color="inherit" href="#" onClick={handleClick}>
              Material-UI
            </Link>
          </Breadcrumb>
          <Breadcrumb>
            <Link color="inherit" href="#" onClick={handleClick}>
              Lab
            </Link>
          </Breadcrumb>
          <Breadcrumb color="textPrimary">Breadcrumb</Breadcrumb>
        </Breadcrumbs>
      </Paper>
    </div>
  );
}

CustomSeparator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomSeparator);
