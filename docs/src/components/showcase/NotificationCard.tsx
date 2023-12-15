import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

export default function NotificationCard() {
  return (
    <Fade in timeout={700}>
      <Card
        variant="outlined"
        sx={(theme) => ({
          display: 'flex',
          p: 2,
          gap: 2,
          maxWidth: 283,
          boxShadow: `0px 4px 8px ${alpha(theme.palette.grey[200], 0.6)}`,
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.900',
            borderColor: 'primaryDark.700',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
          }),
        })}
      >
        <Box
          sx={(theme) => ({
            height: 'fit-content',
            p: 0.5,
            bgcolor: 'primary.50',
            border: '1px solid',
            borderColor: 'primary.200',
            borderRadius: 99,
            ...theme.applyDarkStyles({
              borderColor: 'primary.800',
              bgcolor: alpha(theme.palette.primary[900], 0.5),
            }),
          })}
        >
          <Avatar
            imgProps={{ 'aria-labelledby': 'demo-notification-card-messenger-name' }}
            src="/static/images/avatar/3-sm.jpeg"
            sx={{ width: 40, height: 40 }}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              id="demo-notification-card-messenger-name"
              color="primary.main"
              fontWeight="semiBold"
              fontSize={12}
              gutterBottom
            >
              Angela Erickson
            </Typography>
            <Typography color="text.secondary" variant="caption">
              09:41
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <div>
              <Typography fontWeight="semiBold" fontSize={14}>
                Incredible discoveries
              </Typography>
              <Typography fontSize={14} color="text.secondary">
                It&apos;s about Material UI & Base UI...
              </Typography>
            </div>
            <Chip
              label="3"
              color="success"
              size="small"
              sx={{ ml: 'auto', color: '#fff', fontSize: '0.75rem', height: 18 }}
            />
          </Box>
        </Box>
      </Card>
    </Fade>
  );
}
