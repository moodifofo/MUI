import React from 'react';
import { Container, Typography, Grid, Button, Box, BoxProps, Avatar } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import MuiFormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import cssScrollSnapPolyfill from 'css-scroll-snap-polyfill';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Link from 'docs/src/modules/components/Link';
import MaterialLink from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import InLabIcon from 'docs/src/modules/branding/icons/InLab';
import WorkInProgressIcon from 'docs/src/modules/branding/icons/WorkInProgress';
import PlanningBuildIcon from 'docs/src/modules/branding/icons/PlanningBuild';
import UnderlinedText from 'docs/src/modules/branding/UnderlinedText';
import BrandingRoot from 'docs/src/modules/branding/BrandingRoot';
import BrandingBeginToday from 'docs/src/modules/branding/BrandingBeginToday';
import BrandingDiscoverMore from 'docs/src/modules/branding/BrandingDiscoverMore';
import MaterialUixCard from 'docs/src/modules/branding/MaterialUixCard';
import CommunitySayCard from 'docs/src/modules/branding/CommunitySayCard';
import RoadMapDetailCard from 'docs/src/modules/branding/RoadMapDetailCard';
import ExclusiveFeaturesCard from 'docs/src/modules/branding/ExclusiveFeaturesCard';
import Image from 'docs/src/modules/branding/MaterialUixImage';
import CustomerIcons from 'docs/src/modules/branding/CustomerIcons';
import MuiSelect from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Head from 'next/head';

function AdvancedReactComponent() {
  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        position: 'relative',
      }}
    >
      <Container>
        <Image
          src="/static/branding/material-ui-x/material-ui-x-logo.svg"
          sx={{ display: { xs: 'none', lg: 'block' }, pt: 16, mb: 3.3, textAlign: 'center' }}
        />
        <Typography variant="h1" align="center" sx={{ display: { xs: 'none', lg: 'block' } }}>
          <UnderlinedText>Advanced</UnderlinedText> React <br />
          components
        </Typography>
        <Typography
          variant="h1"
          align="center"
          sx={{ pt: { xs: 6, sm: 9 }, display: { xs: 'block', lg: 'none' } }}
        >
          The most <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />
          ambitious <Box component="span" sx={{ display: { xs: 'block' } }} /> products
          <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} /> depend on{' '}
          <Box component="span" sx={{ display: { xs: 'block' } }} />
          <UnderlinedText>Material-UI X</UnderlinedText>
        </Typography>
        <Typography
          sx={{
            mt: 4,
            maxWidth: 670,
            mx: 'auto',
            textAlign: 'center',
            fontWeight: 'normal',
          }}
        >
          Material-UI X is the last React UI library you&apos;ll ever need.{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} />
          It contains the best React Data Grid on the market and a{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} /> growing list of
          advanced components.
        </Typography>
        <Box sx={{ textAlign: 'center', mt: { xs: 4, lg: 7.2 } }}>
          <Button
            component={Link}
            noLinkStyle
            href="/getting-started/usage/"
            size="large"
            variant="contained"
            endIcon={<NavigateNextIcon />}
          >
            See pricing
          </Button>
          <Button
            sx={{
              textDecoration: 'underline',
              color: 'white',
              ml: { xs: 1.3, sm: 4.4, lg: 5.3 },
              p: 0,
              background: 'transparent',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: '18px',
              lineHeight: '24px',
              '&:hover': {
                background: 'none',
                textDecoration: 'underline',
              },
            }}
            component={Link}
            noLinkStyle
            href="/getting-started/usage/"
            size="large"
            variant="contained"
            endIcon={<NavigateNextIcon />}
          >
            Explore Library
          </Button>

          <Image
            src={'/static/branding/material-ui-x/AdvancedReactCalender.png'}
            sx={{
              display: { xs: 'none', lg: 'block' },
              mt: 8,
              '& img': {
                verticalAlign: 'bottom',
                width: '100%',
              },
            }}
          />
          <Image
            src={'/static/branding/material-ui-x/AdvancedReactCalenderIpad.png'}
            sx={{
              display: { xs: 'none', sm: 'block', lg: 'none' },
              right: '-24px',
              position: 'relative',
              mt: 9.5,
              '& img': {
                verticalAlign: 'bottom',
                width: '100%',
              },
            }}
          />
          <Image
            src={'/static/branding/material-ui-x/AdvancedReactCalenderMobile.png'}
            sx={{
              display: { xs: 'block', sm: 'none' },
              mt: 8,
              position: 'relative',
              right: '-16px',
              '& img': {
                verticalAlign: 'bottom',
                width: '100%',
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

// Started WhyMaterialUix secion
const CustomGrid = styled(Grid)(({ theme }) => ({
  '&:nth-child(even)': {
    position: 'relative',
    top: '60px',
    [theme.breakpoints.down('lg')]: {
      top: 0,
    },
  },
}));
const materialUixData = [
  {
    src: '/static/branding/material-ui-x/7_ReactX.svg',
    title: 'Built exclusively for React',
    description: (
      <React.Fragment>
        The team behind Material-UI has been developing for React, and only React, since 2014. We
        went all-in on React before most developers.
        <br />
        <br />
        As a result the components benefit from the expertise we have built, and leverage the power
        of React without compromises.
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/material-ui-x/8_TypescriptX.svg',
    title: 'TypeScript support',
    description: (
      <React.Fragment>
        Material-UI X components are written in TypeScript, this helps keep the type definitions
        always up to date.
        <br />
        <br />
        Over half of all React web applications are built with TypeScript. If yours is, Material-UI
        X is ready for you. (And if it isn&apos;t – we&apos;ve still got you covered! 👍)
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/material-ui-x/10_LibraryX.svg',
    title: 'The most popular library',
    description: (
      <React.Fragment>
        The team behind Material-UI X also developed the most popular UI library for React:
        Material-UI. With Material-UI X you will benefit from the same expertise gained over many
        years.
        <br />
        <br /> The components are built to the same quality standards: end-to-end tests, polished
        API, type safe, accessible, fast, small. 👌
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/material-ui-x/6_CompletenessX.svg',
    title: 'The only suite you need',
    description: (
      <React.Fragment>
        Because of the sustainability challenge of developing open source components, no open source
        UI library can provide enough high quality components. Sometimes for advanced components
        such as a data grid, there isn&apos;t even an open source alternative to turn to.
        <br />
        <br />
        Material-UI X will support all the most needed UI components, without sacrificing quality.
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/material-ui-x/2_DocumentationX.svg',
    title: 'Outstanding documentation',
    description: (
      <React.Fragment>
        The documentation is built on the experience we have gained developing open source
        components, and acting on the feedback for improving the documentation from our growing
        community of 2 million developers.
      </React.Fragment>
    ),
  },
  {
    src: '/static/branding/material-ui-x/3_CustomizabilityX.svg',
    title: 'Simple customizability',
    description: (
      <React.Fragment>
        You want your components to be powerful, but without sacrificing how they look! After all,
        what good is that nice design system if you can&apos;t use it?
        <br />
        <br />
        Material-UI X is simple to customize by design, which means that you are in complete and
        full control of how your components render down to the very last component, class or style.
      </React.Fragment>
    ),
  },
];

function WhyMaterialUix() {
  return (
    <Container sx={{ pb: 7.2, mt: { xs: 14, sm: 15, lg: 20 }, mb: { xs: 12, sm: 15 } }}>
      <Typography variant="h2" align="center">
        Why <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />
        <UnderlinedText>Material UI X?</UnderlinedText>
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mt: 2.5,
          maxWidth: 670,
          mx: 'auto',
          textAlign: 'center',
          p: { xs: '0 15px', sm: 0 },
          mb: { xs: 7, sm: 10.4, lg: 10 },
        }}
      >
        Looking to get ahead? We have timely resources. Switch to{' '}
        <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} /> Material-UI X to get
        more components.
      </Typography>
      <Grid container spacing={3}>
        {materialUixData.map((material) => (
          <CustomGrid item xs={12} md={6} key={material.title}>
            <MaterialUixCard image={material.src} title={material.title}>
              <Box sx={{ mt: 2 }}>{material.description}</Box>
            </MaterialUixCard>
          </CustomGrid>
        ))}
      </Grid>
    </Container>
  );
}
// End WhyMaterialUix secion

// Start React Data Grid Market
const ExclusiveFeaturesGrid = styled(Grid)(({ theme }) => ({
  '&:nth-child(odd)': {
    position: 'relative',
    top: '40px',
    [theme.breakpoints.down('sm')]: {
      top: 0,
    },
  },
}));

function ReactDataGridMarket() {
  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        position: 'relative',
        pt: { xs: 15, sm: 12.5, lg: 15 },
        pb: { xs: 8, sm: 20, lg: 15 },
      }}
    >
      <Box
        component="img"
        src="/static/branding/block9.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          left: { xs: '16px', sm: '60px', lg: '83px' },
          top: '-122px',
        }}
      />
      <Container>
        <Typography variant="h2" align="center" sx={{ mb: 2.2 }}>
          The best <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />
          <UnderlinedText>React Data Grid</UnderlinedText>{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} />
          on <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }} />
          the market
        </Typography>
        <Typography sx={{ textAlign: 'center', mb: { xs: 8, sm: 10, fontSize: { xs: '16px' } } }}>
          The performance, feature set and quality has not been seen before in a
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} />
          dedicated React Data Grid.
        </Typography>

        <Box
          component="img"
          src="/static/branding/material-ui-x/ReactDataGrid.jpg"
          loading="lazy"
          alt=""
          sx={{ width: '100%', display: { xs: 'none', lg: 'block' } }}
        />
        <Box
          component="img"
          src="/static/branding/material-ui-x/ReactDataGridIpad.jpg"
          loading="lazy"
          alt=""
          sx={{ width: '100%', display: { xs: 'none', sm: 'block', lg: 'none' }, ml: -3 }}
        />
        <Box
          component="img"
          src="/static/branding/material-ui-x/ReactDataGridMobile.jpg"
          loading="lazy"
          alt=""
          sx={{ width: '100%', display: { xs: 'block', sm: 'none' }, position: 'relative', mr: -2 }}
        />
        <Typography variant="h3" align="center" sx={{ mt: 11.5, mb: 2.2 }}>
          Packed with exclusive features
        </Typography>
        <Typography align="center" sx={{ mb: 10, fontSize: { xs: '16px' } }}>
          The Material-UI X React Data Grid is packed with exclusive features that will
          <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }} />
          enrich the experience of your data tables.
        </Typography>
        <Grid container spacing={3} sx={{ px: { xs: 0, sm: 3.3, lg: 0 } }}>
          <ExclusiveFeaturesGrid item lg={3} sm={6} xs={12}>
            <ExclusiveFeaturesCard
              src={'/static/branding/material-ui-x/Resizing.svg'}
              label={'Column Resizing'}
            />
            <ExclusiveFeaturesCard
              src={'/static/branding/material-ui-x/Pagination.svg'}
              label={'Pagination'}
              id={1}
            />
          </ExclusiveFeaturesGrid>

          <ExclusiveFeaturesGrid item lg={3} sm={6} xs={12}>
            <ExclusiveFeaturesCard
              src={'/static/branding/material-ui-x/ReorderRows.svg'}
              label={'Reorder Rows'}
              topImagesrc={'/static/branding/material-ui-x/WorkInProgress.svg'}
            />
            <ExclusiveFeaturesCard
              src={'/static/branding/material-ui-x/Clipboard.svg'}
              label={'Clipboard'}
              id={1}
              topImagesrc={'/static/branding/material-ui-x/WorkInProgress.svg'}
            />
          </ExclusiveFeaturesGrid>
          <ExclusiveFeaturesGrid item lg={3} sm={6} xs={12}>
            <ExclusiveFeaturesCard
              src={'/static/branding/material-ui-x/MultiRow.svg'}
              label={'Multi Row Selection'}
            />
            <ExclusiveFeaturesCard
              src={'/static/branding/material-ui-x/RowVirtualization.svg'}
              label={'Row virtualization'}
              id={1}
            />
          </ExclusiveFeaturesGrid>
          <ExclusiveFeaturesGrid item lg={3} sm={6} xs={12}>
            <ExclusiveFeaturesCard
              src={'/static/branding/material-ui-x/ExcelExport.svg'}
              label={'Excel Export'}
              topImagesrc={'/static/branding/material-ui-x/WorkInProgress.svg'}
            />
            <ExclusiveFeaturesCard
              src={'/static/branding/material-ui-x/TreeData.svg'}
              label={'Tree Data'}
              id={1}
              topImagesrc={'/static/branding/material-ui-x/WorkInProgress.svg'}
            />
          </ExclusiveFeaturesGrid>
        </Grid>
        <Button
          href="/getting-started/usage/"
          component={MaterialLink}
          size="large"
          variant="contained"
          sx={{
            mt: 18.7,
            ml: 'auto',
            width: '234px',
            mr: 'auto',
            display: { xs: 'none', lg: 'flex' },
          }}
          endIcon={<NavigateNextIcon />}
        >
          And more features
        </Button>
      </Container>
    </Box>
  );
}
// End React Data Grid Market
// Start WhatCommunitySay section

const communityData = [
  [
    {
      name: 'Spike Brehm',
      id: '@spikebrehm',
      avatar: '/static/branding/material-ui-x/community1.png',
      description: (
        <React.Fragment>
          Sometimes a library is so incredibly awesome. You don’t want to use anything else. I
          absolutely love that I can have the Material look or completely customize @MaterialUI to
          any look I desire.
        </React.Fragment>
      ),
    },
    {
      name: 'Spike Brehm',
      id: '@spikebrehm',
      avatar: '/static/branding/material-ui-x/community2.png',
      description: (
        <React.Fragment>
          Becoming more obsessed with @MaterialUI for #React. Along with #TypeScript support, they
          have phenomenal documentation, and an impressive design section with customizable themes
          and case studies. This is the best front-end library I&apos;ve ever worked with!
        </React.Fragment>
      ),
    },
  ],
  [
    {
      name: 'Spike Brehm',
      id: '@spikebrehm',
      avatar: '/static/branding/material-ui-x/community1.png',
      description: (
        <React.Fragment>
          The DX on Material-UI is absolutely insane and that package has shaped my approach to
          Component API Design / Composition Design & Style System Design. I think those guys got it
          idiomatically right, wonderful product.
        </React.Fragment>
      ),
    },
    {
      name: 'Spike Brehm',
      id: '@spikebrehm',
      avatar: '/static/branding/material-ui-x/community1.png',
      description: (
        <React.Fragment>
          Working with Material-UI is like working with an entire UI development team, minus the
          overhead.
          <br />
          <br />
          The theming tooling is simple and well-done. The components are common, customizable, and
          practical. Trophy
        </React.Fragment>
      ),
    },
  ],
  [
    {
      name: 'Spike Brehm',
      id: '@spikebrehm',
      avatar: '/static/branding/material-ui-x/community1.png',
      description: (
        <React.Fragment>
          Working with @MaterialUI feels like cheat codes! It's not supposed to be *this* easy to
          build stuff!
        </React.Fragment>
      ),
    },
    {
      name: 'Spike Brehm',
      id: '@spikebrehm',
      avatar: '/static/branding/material-ui-x/community1.png',
      description: (
        <React.Fragment>
          Spent the morning going through the docs for Material-UI. Such an amazing framework with
          amazing documentation! I tried using it several months ago, but struggled to grasp how a
          lot of it worked. Apparently, my understanding of React has been upgraded since then.
          Smiling face with smiling eyes
        </React.Fragment>
      ),
    },
  ],
];

function WhatCommunitySay() {
  return (
    <Container>
      <Typography variant="h2" align="center" sx={{ mt: 15, mb: 8 }}>
        What our community
        <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} />
        has to say
      </Typography>
      <Grid container spacing={3}>
        {communityData.map((community, i) => (
          <Grid item lg={4} key={i}>
            {community.map((data, j) => (
              <CommunitySayCard
                key={j}
                uniqueKey={j}
                name={data.name}
                id={data.id}
                description={data.description}
                avatar={data.avatar}
              />
            ))}
          </Grid>
        ))}
      </Grid>
      {/* <Testing /> */}
    </Container>
  );
}

// End WhatCommunitySay section
// Start 65+ React UI components section fro Ipad and Mobile view
const Select = styled(MuiSelect)(({ theme }) => ({
  // '&.MuiButton-containedPrimary': {},
}));
const FormControl = styled(MuiFormControl)(({ theme }) => ({
  '&.MuiSelect-root': {
    //  margin: theme.spacing(1),
    // minWidth: 120,
  },
  // '& .MuiSelect-select': {
  //   marginTop: theme.spacing(2),
  // },
}));
interface ReactUiComponentCardProps {
  inputType?: string;
  // isInnerBox?: boolean;
  sx?: BoxProps['sx'];
  children: React.ReactNode;
}

function ReactUiComponentCard(props: ReactUiComponentCardProps) {
  const { children, inputType, sx } = props;
  return (
    <Box sx={{ bgcolor: 'greyE5', ...sx }}>
      {children}
      <Box sx={{ bgcolor: 'white', py: 3 }}>
        <Typography variant="h4">{inputType}</Typography>
      </Box>
    </Box>
  );
}
function ReactUiComponent() {
  const [selector, setSelector] = React.useState('');
  const [value, setValue] = React.useState<number>(30);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelector(event.target.value as string);
  };

  const handleValues = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Container sx={{ display: { xs: 'block', lg: 'none' }, bgcolor: 'greyF3' }}>
      <Box
        component="img"
        src="/static/branding/block1-white.svg"
        loading="lazy"
        alt=""
        sx={{
          right: '20px',
          top: '-78px',
        }}
      />
      <Typography variant="h2" align="center">
        65+ React UI components
      </Typography>
      <Typography align="center">Material-UI Pro Components</Typography>
      <ReactUiComponentCard inputType={'Dropdowns'}>
        <Typography>Dropdown Label</Typography>
        <FormControl variant="filled">
          <InputLabel id="demo-simple-select-helper-label">Selector</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={selector}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Selector #1</MenuItem>
            <MenuItem value={20}>Selector #2</MenuItem>
            <MenuItem value={30}>Selector #3</MenuItem>
            <MenuItem value={30}>Selector #4</MenuItem>
          </Select>
        </FormControl>
      </ReactUiComponentCard>
      <ReactUiComponentCard inputType={'Dialogues'}>
        <Box sx={{ bgcolor: 'white', my: 7, mx: 2.2 }}>
          {/* <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Dialog Header'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary">
                Agree
              </Button>
              <Button variant="contained" color="primary">
                Decline
              </Button>
            </DialogActions>
          </Dialog> */}
          <Typography>Dialog Header</Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci.{' '}
          </Typography>
          <Button
            component={Link}
            noLinkStyle
            href="/getting-started/usage/"
            size="large"
            variant="contained"
          >
            Agree
          </Button>
          <Button
            component={Link}
            noLinkStyle
            href="/getting-started/usage/"
            size="large"
            variant="contained"
          >
            Decline
          </Button>
        </Box>
      </ReactUiComponentCard>
      <ReactUiComponentCard inputType={'Date Inputs'}>
        <Box>calendar</Box>
      </ReactUiComponentCard>
      <ReactUiComponentCard inputType={'Inputs'}>
        <Typography>Phone Number</Typography>
        <Typography>Volume</Typography>
        <Grid container spacing={2}>
          <Grid item>
            <VolumeUp />
          </Grid>
          <Grid item xs>
            <Slider value={value} onChange={handleValues} aria-labelledby="continuous-slider" />
          </Grid>
          <Grid item>
            <VolumeUp />
          </Grid>
        </Grid>

        <Button
          component={Link}
          noLinkStyle
          href="/getting-started/usage/"
          size="large"
          variant="contained"
        >
          Sign Up
        </Button>
      </ReactUiComponentCard>
    </Container>
  );
}
// End 65+ React UI components section for Ipad and Mobile view
// Start RoadMap section
const roadMapData = [
  {
    image: '/static/branding/material-ui-x/InLab.svg',
    color: 'primary.main',
    label: 'In the lab',
    description: (
      <React.Fragment>
        In the lab, in progress to <Box component="span" sx={{ display: { xs: 'block' } }} />
        move into the core
      </React.Fragment>
    ),
  },
  {
    image: '/static/branding/material-ui-x/WorkInProgress.svg',
    color: 'vividBlue',
    label: 'Work in progress',
    description: (
      <React.Fragment>
        {' '}
        Work in progress, will <Box component="span" sx={{ display: { xs: 'block' } }} /> likely
        land in the lab.
      </React.Fragment>
    ),
  },
  {
    image: '/static/branding/material-ui-x/PlanningBuild.svg',
    color: 'grey87',
    label: 'Planning to build',
    description: (
      <React.Fragment>
        Building the feature is <Box component="span" sx={{ display: { xs: 'block' } }} /> planned
        but did not <Box component="span" sx={{ display: { xs: 'block' } }} />
        started yet.
      </React.Fragment>
    ),
  },
];

function RoadMap() {
  return (
    <Box
      component="div"
      sx={{
        bgcolor: 'greyF3',
        position: 'relative',
        pt: 12.5,
        pb: 16,
        mt: { xs: 20 },
      }}
    >
      <Box
        component="img"
        src="/static/branding/block7.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          bottom: '-40px',
          left: '60px',
          zIndex: 1,
        }}
      />
      <Box
        component="img"
        src="/static/branding/block1-white.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          right: '20px',
          top: '-78px',
          display: { xs: 'none', sm: 'block' },
        }}
      />
      <Container>
        <Typography variant="h2" align="center">
          Roadmap
        </Typography>
        <Typography
          sx={{
            mt: 3,
            maxWidth: 670,
            mx: 'auto',
            textAlign: 'center',
            p: { xs: '0 15px', md: 0 },
            mb: { xs: 5, sm: 6, lg: 7.5 },
            fontSize: { xs: '16px', sm: '18px' },
          }}
        >
          We are commited to developing the most requested components{' '}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }} /> and features. You
          can find our <Link href="/getting-started/support/">quartly roadmap in GitHub.</Link>
        </Typography>

        <Grid container spacing={2} sx={{ maxWidth: '570px', margin: '0 auto' }}>
          {roadMapData.map((roadMap) => (
            <Grid
              item
              container
              direction="column"
              xs={6}
              sm={4}
              lg={4}
              sx={{ alignItems: 'center' }}
              key={roadMap.image}
            >
              <Avatar
                sx={{
                  mb: 2.5,
                  bgcolor: roadMap.color,
                  width: 40,
                  height: 40,
                  marginLeft: 0,
                  mr: 'auto',
                }}
              >
                <img loading="lazy" src={roadMap.image} alt="" />
              </Avatar>
              <Typography
                component="p"
                sx={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  borderBottom: { xs: '1px solid rgb(0,30,60)', lg: 'none' },
                  mb: 0.5,
                  display: { xs: 'inline-block', sm: 'block' },
                  width: { xs: 'auto', sm: '100%' },
                  ml: { xs: 0, sm: 'none' },
                  mr: { xs: 'auto', sm: 'none' },
                }}
              >
                {roadMap.label}
              </Typography>
              <Typography
                component="p"
                variant="body3"
                sx={{
                  textAlign: 'left',
                  fontSize: '14px',
                  width: '100%',
                  color: 'grey87',
                  mb: { xs: 6, sm: 0.5 },
                }}
              >
                {roadMap.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
// End RoadMap section
// Start RoadMapDetail section
function RoadMapDetail() {
  return (
    <Box sx={{ bgcolor: 'greyEA', mt: 0, pb: 15, pt: 7.5, position: 'relative' }}>
      <Box
        component="img"
        src="/static/branding/block8.svg"
        loading="lazy"
        alt=""
        sx={{
          position: 'absolute',
          bottom: '-28px',
          right: '60px',
        }}
      />
      <Container sx={{ maxWidth: '818px !important' }}>
        <Typography variant="h3" component="div" sx={{ textAlign: 'left', mt: 10, mb: 1.4 }}>
          In the Lab
        </Typography>
        <Typography component="p" sx={{ textAlign: 'left', mb: 5 }}>
          In progress to move into the core.
        </Typography>
        <RoadMapDetailCard
          label={'Data Grid'}
          buttonLabel={'In the lab'}
          src={'/static/branding/material-ui-x/DataGrid.svg'}
          startIcon={<InLabIcon />}
        />
        <RoadMapDetailCard
          label={'Date Picker'}
          buttonLabel={'In the lab'}
          src={'/static/branding/material-ui-x/Calendar.svg'}
          startIcon={<InLabIcon />}
        />
        <RoadMapDetailCard
          label={'Tree View'}
          buttonLabel={'In the lab'}
          src={'/static/branding/material-ui-x/TreeView.svg'}
          startIcon={<InLabIcon />}
        />
        <Typography variant="h3" component="div" sx={{ textAlign: 'left', mt: 8.8, mb: 1.4 }}>
          Work In progress
        </Typography>
        <Typography component="p" sx={{ textAlign: 'left', mb: 5 }}>
          Components we are actively working on.
        </Typography>
        <RoadMapDetailCard
          label={'Advanced Data Grid'}
          buttonLabel={'Work in Progress'}
          src={'/static/branding/material-ui-x/DataGrid.svg'}
          startIcon={<WorkInProgressIcon />}
          buttonSx={{ bgcolor: 'vividBlue' }}
        />
        <RoadMapDetailCard
          label={'Date Picker'}
          buttonLabel={'Work in Progress'}
          src={'/static/branding/material-ui-x/Calendar.svg'}
          startIcon={<WorkInProgressIcon />}
          buttonSx={{ bgcolor: 'vividBlue' }}
        />

        <Typography variant="h3" component="div" sx={{ textAlign: 'left', mt: 8.8, mb: 1.4 }}>
          Planning to build
        </Typography>
        <Typography component="p" sx={{ textAlign: 'left', mb: 5 }}>
          Building the feature is planned but did not started yet.
        </Typography>
        <RoadMapDetailCard
          label={'Avanced Tree View'}
          buttonLabel={'Planning to build'}
          src={'/static/branding/material-ui-x/Checked.svg'}
          startIcon={<PlanningBuildIcon />}
          buttonSx={{ bgcolor: 'grey87' }}
        />
        <RoadMapDetailCard
          label={'Scheduler'}
          buttonLabel={'Planning to build'}
          src={'/static/branding/material-ui-x/Calendar.svg'}
          startIcon={<PlanningBuildIcon />}
          buttonSx={{ bgcolor: 'grey87' }}
        />
        <RoadMapDetailCard
          label={'Charts'}
          buttonLabel={'Planning to build'}
          src={'/static/branding/material-ui-x/Chart.svg'}
          startIcon={<PlanningBuildIcon />}
          buttonSx={{ bgcolor: 'grey87' }}
        />
        <RoadMapDetailCard
          label={'Sparkline'}
          buttonLabel={'Planning to build'}
          src={'/static/branding/material-ui-x/Sparkline.svg'}
          startIcon={<PlanningBuildIcon />}
          buttonSx={{ bgcolor: 'grey87' }}
        />
        <RoadMapDetailCard
          label={'Gauge'}
          buttonLabel={'Planning to build'}
          src={'/static/branding/material-ui-x/Gauge.svg'}
          startIcon={<PlanningBuildIcon />}
          buttonSx={{ bgcolor: 'grey87' }}
        />
        <RoadMapDetailCard
          label={'Upload'}
          buttonLabel={'Planning to build'}
          src={'/static/branding/material-ui-x/Upload.svg'}
          startIcon={<PlanningBuildIcon />}
          buttonSx={{ bgcolor: 'grey87' }}
        />
      </Container>
    </Box>
  );
}
// End RoadMapDetail section

export default function Page() {
  return (
    <BrandingRoot>
      <AdvancedReactComponent />
      <CustomerIcons />
      <WhyMaterialUix />
      <ReactDataGridMarket />
      <WhatCommunitySay />
      {/* <ReactUiComponent /> */}
      <RoadMap />
      <RoadMapDetail />
      <BrandingDiscoverMore />
      <BrandingBeginToday />
    </BrandingRoot>
  );
}
