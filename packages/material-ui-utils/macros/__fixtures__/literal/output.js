import { formatMuiErrorMessage as _formatMuiErrorMessage } from '@mui/utils';
throw new Error(
  process.env.NODE_ENV !== 'production'
    ? `Material-UI: Expected valid input target.
Did you use \`inputComponent\``
    : _formatMuiErrorMessage(1),
);
