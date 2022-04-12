import * as React from 'react';
import SnackbarsProvider, { CloseSnackbarRef } from '@mui/lab/SnackbarsProvider';
import Button from '@mui/material/Button';
import useSnackbars from '@mui/lab/useSnackbars';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MyApp() {
  const snackbars = useSnackbars();

  return (
    <React.Fragment>
      <Button onClick={() => snackbars.showSnackbar()}>
        Show Snackbar 1 with same content
      </Button>
      <Button onClick={() => snackbars.showSnackbar()}>
        Show Snackbar 2 with same content
      </Button>
    </React.Fragment>
  );
}

export default function GlobalContentSnackbars() {
  const snackbarRef = React.useRef<CloseSnackbarRef>(null);

  return (
    <SnackbarsProvider
      ref={snackbarRef}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      content={(key) => (
        <Alert
          onClose={snackbarRef.current!.closeSnackbar(key)}
          severity="warning"
          sx={{ width: '100%' }}
        >
          This is a warning message!
        </Alert>
      )}
    >
      <MyApp />
    </SnackbarsProvider>
  );
}
