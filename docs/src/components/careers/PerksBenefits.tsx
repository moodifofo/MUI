import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import { Link } from '@mui/docs/Link';
import IconImage from 'docs/src/components/icon/IconImage';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import ROUTES from 'docs/src/route';

const companyInfo = [
  {
    title: 'About us',
    description: 'Meet the team and a little bit of our history.',
    routeUrl: ROUTES.about,
  },
  {
    title: 'Handbook',
    description: 'Learn everything about how MUI as a company is run.',
    routeUrl: ROUTES.handbook,
  },
  {
    title: 'Blog',
    description: 'Check behind-the-scenes and news about the company.',
    routeUrl: ROUTES.blog,
  },
];

function RemoteAwardCard() {
  return (
    <Paper
      component={Link}
      href="/blog/remote-award-win-2024/"
      noLinkStyle
      variant="outlined"
      sx={{ p: 2 }}
    >
      <Box
        sx={{
          mb: 2,
          maxWidth: { xs: 315, sm: 325 },
          maxHeight: 315,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '6px',
          overflow: 'clip',
        }}
      >
        <Box
          component="img"
          src="/static/branding/careers/remote-award-light.png"
          alt="MUI is the winner of the Remote Excellence Awards in the Small and Mighty for SMEs category."
          sx={[
            {
              height: '1200px',
              width: '1200px',
            },
            (theme) => ({
              width: '100%',
              height: '100%',
              ...theme.applyDarkStyles({
                content: `url(/static/branding/careers/remote-award-dark.png)`,
              }),
            }),
          ]}
        />
      </Box>
      <div>
        <Typography component="h2" variant="body2" sx={{ fontWeight: 'semiBold' }}>
          Remote Excellence Awards
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          Winners in the first-ever Remote Excellence Awards, in the Small & Mighty category! 🎉
        </Typography>
        <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
          Learn more <KeyboardArrowRightRounded fontSize="small" sx={{ verticalAlign: 'middle' }} />
        </Typography>
      </div>
    </Paper>
  );
}

export default function PerksBenefits() {
  return (
    <Section bg="gradient" cozy>
      <Grid container spacing={5} alignItems="center">
        <Grid md={6}>
          <SectionHeadline
            overline="Working at MUI"
            title={
              <Typography variant="h2" id="perks-and-benefits">
                Perks & benefits
              </Typography>
            }
            description="To help you go above and beyond with us, we provide:"
          />
          <Box sx={{ maxWidth: 500 }}>
            {[
              ['100% remote work', 'Our entire company is globally distributed.'],
              [
                'Retreats',
                'We meet up every 8 months for a week of working & having fun together!',
              ],
              [
                'Equipment',
                'We provide the hardware of your choice (initial grant of $2,500 USD).',
              ],
              ['Time off', 'We provide 33 days of paid time off globally.'],
            ].map((textArray) => (
              <Box
                key={textArray[0]}
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, py: 0.5 }}
              >
                <IconImage name="pricing/yes" />
                <div>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.primary', fontWeight: 'semiBold' }}
                  >
                    {textArray[0]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {textArray[1]}
                  </Typography>
                </div>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            p: { xs: 2, sm: 0 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <RemoteAwardCard />
          <Stack spacing={2} useFlexGap>
            {companyInfo.map(({ title, description, routeUrl }) => (
              <Paper
                key={title}
                component={Link}
                href={routeUrl}
                noLinkStyle
                variant="outlined"
                sx={{ p: 2, width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  {description}
                </Typography>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', mt: 'auto' }}>
                  Learn more{' '}
                  <KeyboardArrowRightRounded fontSize="small" sx={{ verticalAlign: 'middle' }} />
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Section>
  );
}
