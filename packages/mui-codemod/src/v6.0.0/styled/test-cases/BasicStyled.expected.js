const FormHelperTextRoot = styled('p')(({
  theme
}) => (({
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.typography.caption,
  textAlign: 'left',

  [`&.${formHelperTextClasses.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled,
  },

  variants: [{
    props: {
      size: 'small'
    },

    style: {
      marginTop: 4,
    }
  }, {
    props: {
      variant: 'contained',
      size: 'small'
    },

    style: {
        marginTop: 6,
      }
  }, {
    props: (
      {
        disabled,
        ownerState
      }
    ) => ownerState.size === 'small' &&
      ownerState.variant === 'contained' &&
      disabled,

    style: {
        marginTop: 6,
      }
  }, {
    props: (
      {
        ownerState
      }
    ) => ownerState.size !== 'small',

    style: {
      marginBottom: 4,
    }
  }, {
    props: (
      {
        disabled,
        ownerState
      }
    ) => ownerState.size !== 'small' &&
      ownerState.variant !== 'contained' &&
      !disabled,

    style: {
        marginBottom: 6,
      }
  }, {
    props: (
      {
        ownerState
      }
    ) => ownerState.contained,

    style: {
      marginLeft: 14,
      marginRight: 14,
    }
  }, {
    props: (
      {
        ownerState
      }
    ) => !ownerState.contained,

    style: {
      marginTop: 14,
      marginBottom: 14,
    }
  }]
})));
