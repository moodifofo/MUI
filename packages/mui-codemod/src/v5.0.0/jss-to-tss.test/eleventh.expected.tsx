import React from 'react';
import { makeStyles } from 'tss-react/mui';
import SomeNamespace from 'SomeNamespace';

const useStyles = makeStyles()((theme) => ({
  header: {
    marginLeft: theme.spacing(5),
    paddingRight: theme.spacing(3),
    marginRight: 'auto',
    minWidth: 400,
  },
  img: {
    marginTop: theme.spacing(4),
  },
}));

export default function Page() {
  const { classes } = useStyles();

  return (
    <SomeNamespace.SomeComponent>
      <h1 className={classes.header}></h1>
      <img className={classes.img}></img>
    </SomeNamespace.SomeComponent>
  );
}