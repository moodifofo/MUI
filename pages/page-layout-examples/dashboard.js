import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import Head from 'docs/src/modules/components/Head';
import Dashboard from 'docs/pages/page-layout-examples/dashboard/Dashboard';

function Page() {
  return (
    <React.Fragment>
      <Head
        title="Dashboard page layout example - Material-UI"
        description="An example layout for creating an albumn."
      />
      <Dashboard />
    </React.Fragment>
  );
}

export default withRoot(Page);
