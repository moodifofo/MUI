import GridA from '@mui/material/Unstable_Grid2';
import GridB from '@mui/system/Unstable_Grid';
import GridC from '@mui/joy/Grid';
import { Unstable_Grid2 as GridD, Grid as GridV1 } from '@mui/material';
import { Unstable_Grid as GridE } from '@mui/system';
import { Grid as GridF } from '@mui/joy';

// Transforms on all the possible imports
<GridA xs={2} />;
<GridB xs={2} />;
<GridC xs={2} />;
<GridD xs={2} />;
<GridE xs={2} />;
<GridF xs={2} />;

// Transforms responsive sizes
<GridA xs={2} sm={4} md={6} lg={8} xl={10} />;

// Transforms all the possible size values
<GridA xs sm="auto" md={2} lg={true} xl={false} />;

// Doesn't add jsx object expression for single string values
<GridA xs="auto" />;

// Transforms offset
<GridA xsOffset={2} />;

// Transforms responsive offset
<GridA xsOffset={2} smOffset={4} mdOffset={6} lgOffset={8} xlOffset={10} />;

// Transforms all the possible offset values
<GridA xsOffset={2} smOffset="auto" />;

// Transforms spread props
<GridA {...{ xs: 2, sm: 4, xsOffset: 0, smOffset: 2 }} />;

// Doesn't transform Grid v1
<GridV1 xs={2} />;
