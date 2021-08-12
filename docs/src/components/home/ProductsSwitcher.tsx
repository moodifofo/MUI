import * as React from 'react';
import NextLink from 'next/link';
import SwipeableViews from 'react-swipeable-views';
import Box, { BoxProps } from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Stack from '@material-ui/core/Stack';
import IconImage from 'docs/src/components/icon/IconImage';
import SvgMuiX from 'docs/src/icons/SvgMuiX';

import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import ROUTES from 'docs/src/route';

function ProductItem({
  icon,
  name,
  description,
  href,
}: {
  icon: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
  href: string;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box sx={{ mr: 2 }}>{icon}</Box>
      <Box>
        <Typography color="text.primary" variant="body2" fontWeight="bold">
          {name}
        </Typography>
        <Typography color="text.secondary" variant="body2" fontWeight="regular" sx={{ my: 0.5 }}>
          {description}
        </Typography>
        <NextLink href={href} passHref>
          <Link
            href={href}
            color="primary"
            variant="body2"
            fontWeight="bold"
            aria-label={`Goto ${name} product`}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: 24,
              '& > svg': { transition: '0.2s' },
              '&:hover > svg': { transform: 'translateX(4px)' },
            }}
            onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
              event.stopPropagation();
            }}
          >
            <span>Learn more</span>{' '}
            <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px', ml: '2px' }} />
          </Link>
        </NextLink>
      </Box>
    </Box>
  );
}

function Highlight({
  children,
  selected = false,
  onClick,
  sx,
}: {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: BoxProps['onClick'];
  sx?: BoxProps['sx'];
}) {
  return (
    <Box
      role="button"
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        borderRadius: 1,
        height: '100%',
        border: '1px solid',
        ...(selected && {
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'primaryDark.700' : 'background.paper',
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.200'),
        }),
        ...(!selected && {
          '&:hover': {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : 'grey.100'),
            '@media (hover: none)': {
              bgcolor: 'transparent',
            },
          },
          borderColor: 'transparent',
        }),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

const ProductsSwitcher = ({
  productIndex,
  setProductIndex,
}: {
  productIndex: number;
  setProductIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const productElements = [
    <ProductItem
      icon={<IconImage name="product-core" />}
      name="Core"
      description="Ready to use, forever free, foundational components."
      href={ROUTES.productCore}
    />,
    <ProductItem
      icon={<IconImage name="product-advanced" />}
      name={
        <Box component="span" display="inline-flex" alignItems="center">
          Advanced&nbsp; <SvgMuiX />
        </Box>
      }
      description="Powerful and robust components for your complex apps."
      href={ROUTES.productAdvanced}
    />,
    <ProductItem
      icon={<IconImage name="product-templates" />}
      name="Templates"
      description="Fully built, out-of-the-box, templates for your application."
      href={ROUTES.productTemplates}
    />,
    <ProductItem
      icon={<IconImage name="product-designkits" />}
      name="Design Kits"
      description="Our components available in your favorite design tool."
      href={ROUTES.productDesignKits}
    />,
  ];
  return (
    <React.Fragment>
      <Box sx={{ mt: 2 }} />
      <Box
        sx={{
          display: { md: 'none' },
          maxWidth: 'calc(100vw - 40px)',
          minHeight: { xs: 192, sm: 150 },
          '& > div': { pr: '32%' },
        }}
      >
        <SwipeableViews
          index={productIndex}
          resistance
          enableMouseEvents
          onChangeIndex={(index) => setProductIndex(index)}
        >
          {productElements.map((elm, index) => (
            <Highlight
              key={index}
              onClick={() => setProductIndex(index)}
              selected={productIndex === index}
              sx={{
                transition: '0.3s',
                transform: productIndex !== index ? 'scale(0.9)' : 'scale(1)',
              }}
            >
              {elm}
            </Highlight>
          ))}
        </SwipeableViews>
      </Box>
      <Stack spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
        {productElements.map((elm, index) => (
          <Highlight
            key={index}
            onClick={() => setProductIndex(index)}
            selected={productIndex === index}
          >
            {elm}
          </Highlight>
        ))}
      </Stack>
    </React.Fragment>
  );
};

export default ProductsSwitcher;
