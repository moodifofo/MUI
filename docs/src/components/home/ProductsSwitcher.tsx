import * as React from 'react';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SvgProductCore from 'docs/src/icons/SvgProductCore';
import SvgProductAdvanced from 'docs/src/icons/SvgProductAdvanced';
import SvgProductTemplates from 'docs/src/icons/SvgProductTemplates';
import SvgProductDesign from 'docs/src/icons/SvgProductDesign';
import SvgMuiX from 'docs/src/icons/SvgMuiX';

import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';

function ProductItem({
  icon,
  name,
  description,
}: {
  icon: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <Box display="flex" alignItems="center" py={2}>
      <Box px={2}>{icon}</Box>
      <Box>
        <Typography color="grey.900" variant="body2" fontWeight="bold">
          {name}
        </Typography>
        <Typography color="text.secondary" variant="body2" fontWeight="regular">
          {description}
        </Typography>
        <Typography
          color="primary"
          variant="body2"
          fontWeight="bold"
          sx={{ display: 'flex', alignItems: 'center', minHeight: 24 }}
        >
          <span>Learn more</span> <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '2px' }} />
        </Typography>
      </Box>
    </Box>
  );
}

const ProductsSwitcher = () => {
  const [productIndex, setProductIndex] = React.useState(0);
  return (
    <Tabs
      orientation="vertical"
      value={productIndex}
      onChange={(event, value) => setProductIndex(value)}
      sx={{
        mt: 4,
        overflow: 'initial',
        '& .MuiTabs-scroller': { overflow: 'initial !important' },
        '& .MuiTabs-flexContainer': { position: 'relative', zIndex: 1 },
        '& .MuiTab-root': {
          maxWidth: 'initial',
          textAlign: 'left',
          padding: 0,
          alignItems: 'flex-start',
        },
        '& .MuiTabs-indicator': {
          boxShadow: 'rgb(170 180 190 / 10%) 0px 4px 20px',
          width: '100%',
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'grey.200',
        },
      }}
    >
      <Tab
        label={
          <ProductItem
            icon={<SvgProductCore />}
            name="Core"
            description="Ready to use, forever free, out-of-the-box, components."
          />
        }
      />
      <Tab
        label={
          <ProductItem
            icon={<SvgProductAdvanced />}
            name={
              <Box component="span" display="inline-flex" alignItems="center">
                Advanced&nbsp; <SvgMuiX />
              </Box>
            }
            description="Powerful components for your complex apps."
          />
        }
      />
      <Tab
        label={
          <ProductItem
            icon={<SvgProductTemplates />}
            name="Templates"
            description="Get a fully built template for you application."
          />
        }
      />
      <Tab
        label={
          <ProductItem
            icon={<SvgProductDesign />}
            name="Design Kits"
            description="Pick your favorite design tool to enjoy."
          />
        }
      />
    </Tabs>
  );
};

export default ProductsSwitcher;
