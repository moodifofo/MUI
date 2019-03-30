import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions/transition';

function TransitionSlide(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionsSnackbar() {
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  const handleClick = (Transition: React.ComponentType<TransitionProps>) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  function handleClose() {
    setState({
      ...state,
      open: false,
    });
  }

  return (
    <div>
      <Button onClick={handleClick(Fade)}>Fade Transition</Button>
      <Button onClick={handleClick(TransitionSlide)}>Slide Transition</Button>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">I love snacks</span>}
      />
    </div>
  );
}

export default TransitionsSnackbar;
