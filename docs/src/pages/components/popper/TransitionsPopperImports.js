import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Popper': Popper,
  '@material-ui/core/Fade': Fade,
};
