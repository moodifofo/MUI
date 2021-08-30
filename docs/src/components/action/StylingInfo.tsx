import * as React from 'react';
import { ThemeProvider, alpha } from '@material-ui/core/styles';
import Box, { BoxProps } from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardArrowUpRounded from '@material-ui/icons/KeyboardArrowUpRounded';
import KeyboardArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import Link from 'docs/src/modules/components/Link';
import { brandingDarkTheme } from 'docs/src/modules/brandingTheme';
import ROUTES from 'docs/src/route';

export default function StylingInfo({ appeared, ...props }: { appeared: boolean } & BoxProps) {
  const [hidden, setHidden] = React.useState(false);
  return (
    <ThemeProvider theme={brandingDarkTheme}>
      <Box
        {...props}
        sx={{
          position: 'absolute',
          bottom: 0,
          transform: hidden || !appeared ? 'translateY(100%)' : 'translateY(0)',
          transition: '0.3s',
          left: 0,
          right: 0,
          px: 2,
          pt: 1,
          pb: 2,
          bgcolor: ({ palette }) => alpha(palette.primaryDark[700], 0.5),
          backdropFilter: 'blur(8px)',
          zIndex: 1,
          borderTop: '1px solid',
          borderColor: 'divider',
          borderRadius: '0 0 10px 10px',
          ...props.sx,
        }}
      >
        <Tooltip title={hidden ? 'Show' : 'Hide'} placement="left">
          <IconButton
            disabled={!appeared}
            onClick={() => setHidden((bool) => !bool)}
            sx={{
              position: 'absolute',
              zIndex: 2,
              transition: '0.3s',
              right: 10,
              bottom: '100%',
              transform: hidden || !appeared ? 'translateY(-10px)' : 'translateY(50%)',
              opacity: appeared ? 1 : 0,
              bgcolor: 'primaryDark.500',
              '&:hover, &.Mui-focused': {
                bgcolor: 'primaryDark.600',
              },
            }}
          >
            {hidden ? (
              <KeyboardArrowUpRounded fontSize="small" />
            ) : (
              <KeyboardArrowDownRounded fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
        <Typography fontWeight="bold" color="#fff" variant="body2">
          Own the styling!
        </Typography>
        <Typography color="grey.400" variant="body2">
          Build your own design system using the{' '}
          <Link href={ROUTES.theming}>sophisticated theming features</Link>. You can also start by
          using Google&apos;s Material Design.
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
