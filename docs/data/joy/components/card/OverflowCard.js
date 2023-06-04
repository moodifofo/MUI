import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';

export default function OverflowCard() {
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
            srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="h2" fontSize="md">
          Yosemite National Park
        </Typography>
        <Typography level="body2" sx={{ mt: 0.5 }}>
          California
        </Typography>
      </CardContent>
      <CardOverflow
        variant="soft"
        sx={{
          display: 'flex',
          gap: 1.5,
          py: 1.5,
          px: 'var(--Card-padding)',
          bgcolor: 'background.level1',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography level="body3" fontWeight="md" textColor="text.secondary">
          6.3k views
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body3" fontWeight="md" textColor="text.secondary">
          1 hour ago
        </Typography>
      </CardOverflow>
    </Card>
  );
}
