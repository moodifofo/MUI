/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Card, { CardProps } from '@mui/joy/Card';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';

import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';

export default function DropZone({
  icon,
  sx,
  ...props
}: CardProps & {
  icon?: React.ReactElement;
}) {
  return (
    <Card
      variant="soft"
      {...props}
      sx={[
        {
          borderRadius: 'sm',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'center',
          px: 3,
          flexGrow: 1,
          boxShadow: 'none',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <AspectRatio
        ratio="1"
        variant="solid"
        color="primary"
        sx={{
          minWidth: 32,
          borderRadius: '50%',
          '--Icon-fontSize': '16px',
        }}
      >
        <div>{icon ?? <FileUploadRoundedIcon />}</div>
      </AspectRatio>

      <Typography level="body-sm" textAlign="center">
        <Link component="button" overlay>
          Click to upload
        </Link>{' '}
        or drag and drop
        <br /> SVG, PNG, JPG or GIF (max. 800x400px)
      </Typography>
    </Card>
  );
}
