import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import { alpha } from '@mui/system';

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Dashboard',
    description:
      'This item could provide a snapshot of the most important metrics or data points related to the product.',
    imageLight:
      'url("/static/images/templates/templates-images/dashboard-placeholder-dashboard-light.png")',
    imageDark:
      'url("/static/images/templates/templates-images/dashboard-placeholder-dashboard-dark.png")',
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: 'Mobile integration',
    description:
      'This item could provide information about the mobile app version of the product.',
    imageLight:
      'url("/static/images/templates/templates-images/dashboard-placeholder-mobile-light.png")',
    imageDark:
      'url("/static/images/templates/templates-images/dashboard-placeholder-mobile-dark.png")',
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Available in all platforms',
    description:
      'This item could let users know that the product is available on all platforms, such as web, mobile, and desktop.',
    imageLight:
      'url("/static/images/templates/templates-images/dashboard-placeholder-platforms-light.png")',
    imageDark:
      'url("/static/images/templates/templates-images/dashboard-placeholder-platforms-dark.png")',
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Box id="features" sx={{ mt: { xs: 0, sm: 4 } }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography component="h2" variant="h4" color="text.primary">
                Product features
              </Typography>
              <Typography variant="body1" color="text.secondary" component="p">
                Here you can provide a brief overview of the key features of the
                product. For example, you could list the number of features, the
                types of features (e.g., core features, add-ons), or the benefits of
                the features.
              </Typography>
            </Box>
            <Grid
              container
              item
              gap={1}
              sx={{ display: { xs: 'auto', sm: 'none' } }}
            >
              {items.map(({ title }, index) => (
                <Chip
                  key={index}
                  label={title}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    borderColor: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index ? 'primary.light' : '';
                      }
                      return selectedItemIndex === index ? 'primary.light' : '';
                    },
                    background: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index ? 'none' : '';
                      }
                      return selectedItemIndex === index ? 'none' : '';
                    },
                    backgroundColor:
                      selectedItemIndex === index ? 'primary.main' : '',
                    '& .MuiChip-label': {
                      color: selectedItemIndex === index ? '#fff' : '',
                    },
                  }}
                />
              ))}
            </Grid>
            <Box
              component={Card}
              variant="outlined"
              sx={{
                display: { xs: 'auto', sm: 'none' },
                p: 2,
                mt: 4,
              }}
            >
              <Box
                sx={{
                  backgroundImage: (theme) =>
                    theme.palette.mode === 'light'
                      ? items[selectedItemIndex].imageLight
                      : items[selectedItemIndex].imageDark,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '4px',
                  minHeight: '300px',
                  marginBottom: '16px',
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  component="span"
                  color="text.primary"
                  variant="body2"
                  fontWeight="bold"
                >
                  {selectedFeature.title}
                </Typography>
                <Typography
                  component="span"
                  color="text.secondary"
                  variant="body2"
                  fontWeight="regular"
                  sx={{ my: 0.5 }}
                >
                  {selectedFeature.description}
                </Typography>
                <Link
                  color="primary"
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    '& > svg': { transition: '0.2s' },
                    '&:hover > svg': { transform: 'translateX(2px)' },
                  }}
                >
                  <span>Learn more</span>
                  <ChevronRightRoundedIcon
                    fontSize="small"
                    sx={{ mt: '1px', ml: '2px' }}
                  />
                </Link>
              </Box>
            </Box>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
              sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
            >
              {items.map(({ icon, title, description }, index) => (
                <Card
                  key={index}
                  component={Button}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    height: '33%',
                    width: '100%',
                    background: 'none',
                    backgroundColor:
                      selectedItemIndex === index ? 'action.selected' : '',
                    borderColor: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index
                          ? 'primary.light'
                          : 'grey.200';
                      }
                      return selectedItemIndex === index
                        ? 'primary.dark'
                        : 'grey.800';
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      p: 2,
                      width: '100%',
                      display: 'flex',
                      textAlign: 'left',
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: { md: 'center' },
                      gap: 3,
                    }}
                  >
                    <Box
                      sx={{
                        color: (theme) => {
                          if (theme.palette.mode === 'light') {
                            return selectedItemIndex === index
                              ? 'primary.main'
                              : 'grey.400';
                          }
                          return selectedItemIndex === index
                            ? 'primary.main'
                            : 'grey.700';
                        },
                      }}
                    >
                      {icon}
                    </Box>
                    <span>
                      <Typography
                        component="span"
                        color="text.primary"
                        variant="body2"
                        fontWeight="bold"
                        display="block"
                      >
                        {title}
                      </Typography>
                      <Typography
                        component="span"
                        color="text.secondary"
                        variant="body2"
                        fontWeight="regular"
                        display="block"
                        sx={{ my: 0.5 }}
                      >
                        {description}
                      </Typography>
                      <Link
                        color="primary"
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          '& > svg': { transition: '0.2s' },
                          '&:hover > svg': { transform: 'translateX(2px)' },
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <span>Learn more</span>
                        <ChevronRightRoundedIcon
                          fontSize="small"
                          sx={{ mt: '1px', ml: '2px' }}
                        />
                      </Link>
                    </span>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component={Card}
              variant="outlined"
              sx={{
                height: '100%',
                display: { xs: 'none', sm: 'flex' },
                pointerEvents: 'none',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  display: { xs: 'none', sm: 'flex' },
                  pointerEvents: 'none',
                  backgroundImage: (theme) =>
                    theme.palette.mode === 'light'
                      ? `radial-gradient(${alpha('#D6E2EB', 0.4)} 1.3px, ${alpha(
                          '#FBFCFE',
                          0.2,
                        )} 1.3px)`
                      : `radial-gradient(${alpha('#131B20', 0.9)} 1.3px, ${alpha(
                          '#090E10',
                          0.2,
                        )} 1.3px)`,
                  backgroundSize: '24px 24px',
                }}
              >
                <Box
                  sx={{
                    m: 'auto',
                    width: '420px',
                    height: '420px',
                    backgroundSize: 'contain',
                    backgroundImage: (theme) =>
                      theme.palette.mode === 'light'
                        ? items[selectedItemIndex].imageLight
                        : items[selectedItemIndex].imageDark,
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
