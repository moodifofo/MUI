import * as React from "react";
import { makeStyles } from 'tss-react/mui';
import { Theme } from "@material-ui/core/styles";

/*
Sandboxes for verifying correct behavior:
JSS - https://codesandbox.io/s/typescript-case-bt065c?file=/demo.tsx
TSS - https://codesandbox.io/s/typescript-case-7jwpms?file=/demo.tsx
 */

const useStyles = makeStyles<void, "test2">()(
  (theme: Theme, _params, classes) => ({
    test: {
      backgroundColor: "purple",
      color: "white",
      [`& .${classes.test2}`]: {
        backgroundColor: "lime",
        color: "blue"
      }
    },
    test2: {
      backgroundColor: "blue",
      color: "lime"
    }
  })
);

function InnerComponent({ classes }) {
  return <div className={classes.test2}>Inner Test2</div>;
}
export default function ComponentUsingStyles() {
  const { classes } = useStyles();
  return (
    <>
      <div className={classes.test}>
        Test
        <InnerComponent classes={classes} />
      </div>
      <div className={classes.test2}>Outer Test2</div>
    </>
  );
}
