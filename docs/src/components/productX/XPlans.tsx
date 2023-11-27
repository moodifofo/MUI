import * as React from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import ROUTES from 'docs/src/route';
import InfoCard from 'docs/src/components/action/InfoCard';
import IconImage from 'docs/src/components/icon/IconImage';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';

const content = [
  {
    icon: <IconImage name="pricing/x-plan-community" mode="" loading="eager" />,
    title: 'Community version',
    description:
      'Free forever. This version contains features that we believe are maintainable by contributions from the open-source community.',
  },
  {
    icon: <IconImage name="pricing/x-plan-pro" mode="" loading="eager" />,
    title: 'Pro plan',
    description:
      'More advanced capabilities such as multi-filtering, multi-sorting, and more for the Data Grid; as well as the other components.',
  },
  {
    icon: <IconImage name="pricing/x-plan-premium" mode="" loading="eager" />,
    title: 'Premium plan',
    description:
      'Every advanced feature of every component, such as row grouping and Excel export, for the Data Grid, plus what is included in the Pro plan.',
  },
];

export default function XPlans2() {
  return (
    <Section cozy>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <SectionHeadline
            overline="Plans"
            title={
              <Typography variant="h2">
                Available with <GradientText>MIT and commercial</GradientText> licenses
              </Typography>
            }
            description="MUI X components are available under two licenses: MIT for the free community version, and commercial for Pro and Premium plans."
          />
          <GetStartedButtons
            primaryLabel="Compare plans"
            primaryUrl={ROUTES.pricing}
            secondaryLabel="Learn about licensing"
            secondaryUrl={ROUTES.xLicensing}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} useFlexGap>
            {content.map(({ icon, title, description }) => (
              <InfoCard title={title} icon={icon} description={description} dense />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Section>
  );
}
