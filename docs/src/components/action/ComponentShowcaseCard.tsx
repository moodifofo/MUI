import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Link from 'docs/src/modules/components/Link';

interface Props {
  name: string;
  link: string;
  srcLight: string;
  srcDark: string;
  md1?: React.ReactNode;
  md2?: React.ReactNode;
  md3?: React.ReactNode;
  noGuidelines?: React.ReactNode;
}

export default function ComponentShowcaseCard({
  link,
  srcLight,
  srcDark,
  name,
  md1,
  md2,
  md3,
  noGuidelines,
}: Props) {
  return (
    <Card
      component={Link}
      noLinkStyle
      variant="outlined"
      href={link}
      sx={(theme) => ({
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        borderColor: 'divider',
        ...theme.applyDarkStyles({
          backgroundColor: `${alpha(theme.palette.primaryDark[700], 0.1)}`,
          borderColor: 'primaryDark.700',
        }),
      })}
    >
      <CardMedia
        component="img"
        alt=""
        loading="lazy"
        image={srcLight}
        sx={(theme) => ({
          aspectRatio: '16 / 9',
          background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
          borderBottom: '1px solid',
          borderColor: 'divider',
          ...theme.applyDarkStyles({
            content: `url(${srcDark})`,
            background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
            borderColor: 'primaryDark.700',
          }),
        })}
      />
      <Stack direction="row" justifyContent="space-between" sx={{ px: 2, py: 1.5 }}>
        <Typography component="h2" variant="body2" fontWeight="semiBold">
          {name}
        </Typography>
        <Stack direction="row" spacing={0.5} useFlexGap>
          {md1 && <Chip label="MD1" size="small" variant="outlined" color="primary" />}
          {md2 && <Chip label="MD2" size="small" variant="outlined" color="primary" />}
          {md3 && <Chip label="MD3" size="small" variant="outlined" color="success" />}
          {noGuidelines && (
            <Chip label="No guidelines" size="small" variant="outlined" color="info" />
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
