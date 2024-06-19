import { styled, alpha } from '@mui/material/styles';

const DemoToolbarRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'demoOptions' && prop !== 'openDemoSource',
})(({
  theme
}) => [
  {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      top: 0,
      maxHeight: 50,
      display: 'block',
      padding: theme.spacing(0.5, 1),
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      backgroundColor: alpha(theme.palette.grey[50], 0.2),
      transition: theme.transitions.create('border-radius'),
      ...theme.applyStyles("rtl", {
        left: theme.spacing(1),
      }),
      ...theme.applyStyles("rtl", {
        right: theme.spacing(1),
      })
    },
    variants: [{
      props: {
        bg: 'inline'
      },
      style: {
        [theme.breakpoints.up('sm')]: {
          marginTop: theme.spacing(1)
        }
      }
    }, {
      props: (
        {
          demoOptions
        }
      ) => demoOptions.bg !== 'inline',
      style: {
        [theme.breakpoints.up('sm')]: {
          marginTop: -1
        }
      }
    }, {
      props: {
        bg: 'inline'
      },
      style: {
        [theme.breakpoints.up('sm')]: {
          borderTopWidth: 1
        }
      }
    }, {
      props: (
        {
          demoOptions
        }
      ) => demoOptions.bg !== 'inline',
      style: {
        [theme.breakpoints.up('sm')]: {
          borderTopWidth: 0
        }
      }
    }, {
      props: (
        {
          openDemoSource
        }
      ) => openDemoSource,
      style: {
        [theme.breakpoints.up('sm')]: {
          borderRadius: 0
        }
      }
    }, {
      props: (
        {
          openDemoSource
        }
      ) => !openDemoSource,
      style: {
        [theme.breakpoints.up('sm')]: {
          borderRadius: '0 0 12px 12px'
        }
      }
    }]
  },
  theme.applyDarkStyles({
    [theme.breakpoints.up('sm')]: {
      backgroundColor: alpha(theme.palette.primaryDark[800], 0.2),
    },
  }),
]);
export default DemoToolbarRoot;