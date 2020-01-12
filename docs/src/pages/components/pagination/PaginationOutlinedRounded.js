import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function BasicPagination() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={10} variant="outlined" shape="rounded" />
      <Pagination count={10} variant="outlined" shape="rounded" color="primary" />
      <Pagination count={10} variant="outlined" shape="rounded" color="secondary" />
      <Pagination count={10} variant="outlined" shape="rounded" disabled />
    </div>
  );
}
