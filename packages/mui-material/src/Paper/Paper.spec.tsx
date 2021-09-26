import * as React from 'react';
import Paper from '@mui/material/Paper';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

const PaperTest = () => (
  <div>
    <Paper elevation={4} />
    <Paper component="a" href="test" />

    <Paper component={CustomComponent} stringProp="test" numberProp={0} />
    <Paper component={CustomComponent} />
  </div>
);
