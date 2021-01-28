import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Fab': Fab,
  '@material-ui/icons/Add': AddIcon,
  '@material-ui/icons/Edit': EditIcon,
  '@material-ui/icons/Favorite': FavoriteIcon,
  '@material-ui/icons/Navigation': NavigationIcon,
};
