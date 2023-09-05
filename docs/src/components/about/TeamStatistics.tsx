import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const data = [
  { title: '2014', metadata: 'The starting year' },
  { title: '100%', metadata: 'Remote global team' },
  { title: '+20', metadata: 'Countries represented' },
];

export default function TeamStatistics() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
      {data.map((item) => (
        <Box key={item.title} sx={{ height: '100%', minWidth: { xs: 'auto', sm: 200 } }}>
          <Typography
            component="p"
            variant="h4"
            fontWeight="bold"
            sx={(theme) => ({
              textAlign: { xs: 'left', sm: 'center' },
              color: 'primary.main',
              ...theme.applyDarkStyles({
                color: 'primary.200',
              }),
            })}
          >
            {item.title}
          </Typography>
          <Typography color="text.secondary" sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
            {item.metadata}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
