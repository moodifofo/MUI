import * as React from 'react';
import { styled as materialStyled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TableChartRounded from '@mui/icons-material/TableChartRounded';
import DateRangeRounded from '@mui/icons-material/DateRangeRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import ShowChartRounded from '@mui/icons-material/ShowChartRounded';
import BarChartRounded from '@mui/icons-material/BarChartRounded';
import More from 'docs/src/components/action/More';
import Frame from 'docs/src/components/action/Frame';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import BaseButtonDemo from './components/BaseButtonDemo';
import BaseMenuDemo from './components/BaseMenuDemo';
import BaseInputDemo from './components/BaseInputDemo';
import BaseTabsDemo from './components/BaseTabsDemo';
import BaseSliderDemo from './components/BaseSliderDemo';

const StyledButton = materialStyled(Button)(({ theme }) => ({
  borderRadius: 40,
  padding: theme.spacing('2px', 1),
  fontSize: theme.typography.pxToRem(12),
  lineHeight: 18 / 12,
  '&.MuiButton-text': {
    color: theme.palette.grey[400],
  },
  '&.MuiButton-outlined': {
    color: '#fff',
    backgroundColor: theme.palette.primary[700],
    borderColor: theme.palette.primary[500],
    '&:hover': {
      backgroundColor: theme.palette.primary[700],
    },
  },
}));

const DEMOS = ['Button', 'Menu', 'Input', 'Tabs', 'Slider'] as const;

const CODES: Record<(typeof DEMOS)[number], string | ((styling?: 'system') => string)> = {
  Button: BaseButtonDemo.getCode,
  Menu: BaseMenuDemo.getCode,
  Input: BaseInputDemo.getCode,
  Tabs: BaseTabsDemo.getCode,
  Slider: BaseSliderDemo.getCode,
};

export default function BaseUIComponents() {
  const [styling, setStyling] = React.useState<undefined | 'system'>('system');
  const [demo, setDemo] = React.useState<(typeof DEMOS)[number]>(DEMOS[0]);
  const icons = {
    [DEMOS[0]]: <TableChartRounded fontSize="small" />,
    [DEMOS[1]]: <DateRangeRounded fontSize="small" />,
    [DEMOS[2]]: <AccountTreeRounded fontSize="small" />,
    [DEMOS[3]]: <ShowChartRounded fontSize="small" />,
    [DEMOS[4]]: <BarChartRounded fontSize="small" />,
  };
  return (
    <Section bg="gradient">
      <Grid container spacing={2}>
        <Grid md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Unstyled components"
              title={
                <Typography variant="h2">
                  Choose your own
                  <br /> <GradientText>CSS adventure</GradientText>
                </Typography>
              }
              description="Base UI’s skeletal components give you a sturdy foundation to apply custom styles with ease. With no defaults to override, you’re free to start from scratch using vanilla CSS, Tailwind CSS, MUI System, or any other framework you prefer."
            />
          </Box>
          <Group desktopColumns={2} sx={{ mt: 4 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item icon={React.cloneElement(icons[name])} title={name} />
              </Highlighter>
            ))}
            <More />
          </Group>
        </Grid>
        <Grid xs={12} md={6}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo
              className="mui-default-theme"
              sx={(theme) => ({
                flexGrow: 1,
                bgcolor: 'background.paper',
                backgroundSize: '100%, 72px',
                backgroundImage: `${(theme.vars || theme).palette.gradients.lightGrayRadio}, ${
                  (theme.vars || theme).palette.patterns.triangle
                }`,
                ...theme.applyDarkStyles({
                  backgroundSize: '72px, 100%',
                  backgroundImage: `${(theme.vars || theme).palette.gradients.stylizedRadio}, ${
                    (theme.vars || theme).palette.patterns.triangle
                  }`,
                }),
              })}
            >
              {demo === 'Button' && <BaseButtonDemo styling={styling} />}
              {demo === 'Menu' && <BaseMenuDemo styling={styling} />}
              {demo === 'Input' && <BaseInputDemo styling={styling} />}
              {demo === 'Tabs' && <BaseTabsDemo styling={styling} />}
              {demo === 'Slider' && <BaseSliderDemo styling={styling} />}
            </Frame.Demo>
            <Frame.Info
              sx={{
                height: 256,
                position: 'relative',
                overflow: 'hidden',
                pt: 5,
              }}
            >
              <Box sx={{ height: 'calc(100% + 40px)', overflow: 'auto', m: -2, p: 2, pt: 3 }}>
                <HighlightedCode
                  copyButtonHidden
                  component={MarkdownElement}
                  code={(() => {
                    const result = CODES[demo];
                    if (typeof result === 'function') {
                      return result(styling);
                    }
                    return result;
                  })()}
                  language="jsx"
                />
              </Box>
              <Box
                sx={(theme) => ({
                  pb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 12,
                  left: 16,
                  right: 0,
                  zIndex: 10,
                  background: `linear-gradient(to bottom, ${
                    (theme.vars || theme).palette.primaryDark[800]
                  } 30%, transparent)`,
                })}
              >
                <StyledButton
                  size="small"
                  variant={styling === 'system' ? 'outlined' : 'text'}
                  onClick={() => {
                    setStyling('system');
                  }}
                >
                  MUI System
                </StyledButton>
                <StyledButton
                  size="small"
                  variant={!styling ? 'outlined' : 'text'}
                  onClick={() => {
                    setStyling(undefined);
                  }}
                  sx={{ ml: 1 }}
                >
                  Unstyled
                </StyledButton>
              </Box>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
