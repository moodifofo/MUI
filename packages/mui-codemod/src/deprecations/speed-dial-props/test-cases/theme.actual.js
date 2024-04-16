fn({
  MuiSpeedDial: {
    defaultProps: {
      TransitionComponent: CustomTransition,
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      slots: {
        root: 'div',
      },
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      TransitionComponent: ComponentTransition,
      slots: {
        root: 'div',
        transition: SlotTransition
      },
    },
  },
});
