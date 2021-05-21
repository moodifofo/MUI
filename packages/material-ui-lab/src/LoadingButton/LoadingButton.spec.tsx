import * as React from 'react';
import LoadingButton from '@material-ui/lab/LoadingButton';

function ClassesTest() {
  return (
    <LoadingButton
      classes={{
        outlined: 'extra-outlined',
        loadingIndicator: 'extra-loading-indicator',
        disabled: 'extra-disabled',
      }}
    >
      Button
    </LoadingButton>
  );
}
