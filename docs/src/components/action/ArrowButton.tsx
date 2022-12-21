import * as React from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import KeyboardArrowLeftRounded from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';

export default function ArrowButton({
  direction,
  ...props
}: { direction: 'left' | 'right' } & IconButtonProps) {
  const label = {
    left: 'Previous',
    right: 'Next',
  };
  return (
    <IconButton
      size="small"
      aria-label={label[direction]}
      {...props}
      sx={[
        {
          border: '1px solid',
          color: 'primary.main',
          borderColor: 'grey.200',
          '&:hover': {
            borderColor: 'grey.300',
          },
          '&.Mui-disabled': {
            opacity: 0.5,
            color: 'grey.700',
            borderColor: 'grey.300',
          },
          '& + .MuiIconButton-root': {
            ml: 2,
          },
        },
        (theme) =>
          theme.applyDarkStyles({
            color: '#fff',
            borderColor: 'primaryDark.300',
            '&:hover': {
              borderColor: 'primaryDark.200',
            },
            '&.Mui-disabled': {
              color: '#fff',
              borderColor: 'primary.700',
            },
          }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {direction === 'left' && <KeyboardArrowLeftRounded fontSize="small" />}
      {direction === 'right' && <KeyboardArrowRightRounded fontSize="small" />}
    </IconButton>
  );
}
