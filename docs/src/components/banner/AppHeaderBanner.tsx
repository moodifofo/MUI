import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import FEATURE_TOGGLE from 'docs/src/featureToggle';

const getSurveyMessage = () => (
  <React.Fragment>
    Help shape the future of MUI!&nbsp;&nbsp;📫&nbsp;Please take a few minutes to complete the&nbsp;
    <Link
      href="https://www.surveymonkey.com/r/mui-developer-survey-2022?source=website"
      target="_blank"
      color="inherit"
      underline="always"
      sx={{
        '&:hover': {
          opacity: 0.9,
        },
      }}
    >
      MUI developer survey 2022 →
    </Link>
  </React.Fragment>
);

const getDefaultHiringMessage = () => (
  <React.Fragment>
    🚀&#160;&#160;We&apos;re hiring a Designer, Full-stack Engineer, React Support Engineer, and
    more!&nbsp;&#160;
    <Link
      href={ROUTES.careers} // Fix me!
      target="_blank"
      color="inherit"
      underline="always"
      sx={{
        '&:hover': {
          opacity: 0.9,
        },
      }}
    >
      Check the careers page →
    </Link>
  </React.Fragment>
);

export default function AppHeaderBanner() {
  const showSurveyMessage = true;
  const bannerMessage = showSurveyMessage ? getSurveyMessage() : getDefaultHiringMessage();

  return FEATURE_TOGGLE.enable_website_banner ? (
    <Typography
      fontWeight="medium"
      sx={(theme) => ({
        color: '#fff',
        p: '12px',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'start', sm: 'center' },
        justifyContent: 'center',
        fontSize: theme.typography.pxToRem(13),
        background: `linear-gradient(-90deg, ${(theme.vars || theme).palette.primary[700]}, ${
          (theme.vars || theme).palette.primary[500]
        } 120%)`,
        ...theme.applyDarkStyles({
          background: `linear-gradient(90deg, ${(theme.vars || theme).palette.primary[900]}, ${
            (theme.vars || theme).palette.primary[600]
          } 120%)`,
        }),
      })}
    >
      {bannerMessage}
    </Typography>
  ) : null;
}
