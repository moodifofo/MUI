import * as React from 'react';
import PropTypes from 'prop-types';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import {
  IndiaFlag,
  UsaFlag,
  BrazilFlag,
  GlobeFlag,
} from '../internals/components/CustomIcons';

const data = [
  { label: 'India', value: 50000 },
  { label: 'USA', value: 35000 },
  { label: 'Brazil', value: 10000 },
  { label: 'Other', value: 5000 },
];

const countries = [
  {
    name: 'India',
    value: 50,
    flag: <IndiaFlag />,
    color: 'hsl(220, 25%, 65%)',
  },
  {
    name: 'USA',
    value: 35,
    flag: <UsaFlag />,
    color: 'hsl(220, 25%, 45%)',
  },
  {
    name: 'Brazil',
    value: 10,
    flag: <BrazilFlag />,
    color: 'hsl(220, 25%, 30%)',
  },
  {
    name: 'Other',
    value: 5,
    flag: <GlobeFlag />,
    color: 'hsl(220, 25%, 20%)',
  },
];

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme, variant }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: theme.palette.text.secondary,
  fontSize:
    variant === 'primary'
      ? theme.typography.h5.fontSize
      : theme.typography.body2.fontSize,
  fontWeight:
    variant === 'primary'
      ? theme.typography.h5.fontWeight
      : theme.typography.body2.fontWeight,
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};

const colors = [
  'hsl(220, 25%, 65%)',
  'hsl(220, 25%, 45%)',
  'hsl(220, 25%, 30%)',
  'hsl(220, 25%, 20%)',
];

export default function ChartUserByCountry() {
  return (
    <Card variant="outlined" sx={{ pb: '8px' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Users by country
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={colors}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
            }}
            series={[
              {
                data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: 'global', highlighted: 'item' },
              },
            ]}
            height={260}
            width={260}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <PieCenterLabel primaryText="98.5K" secondaryText="Total" />
          </PieChart>
        </Box>
        {countries.map((country, index) => (
          <Stack
            key={index}
            direction="row"
            sx={{
              alignItems: 'center',
              gap: 2,
              pb: 2,
            }}
          >
            {country.flag}
            <Stack
              sx={{
                gap: 1,
                flexGrow: 1,
              }}
            >
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: '500',
                  }}
                >
                  {country.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {country.value}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={country.value}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: country.color,
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
