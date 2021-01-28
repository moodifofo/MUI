import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Alert': Alert,
  '@material-ui/core/AlertTitle': AlertTitle,
};
