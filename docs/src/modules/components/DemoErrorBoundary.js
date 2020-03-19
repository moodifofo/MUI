import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default class DemoErrorBoundary extends React.Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { children, errorActions } = this.props;
    const { error } = this.state;

    if (error) {
      /* eslint-disable material-ui/no-hardcoded-labels */
      return (
        <div>
          <Typography color="error" component="p" variant="h5" gutterBottom>
            This demo had a runtime error!
          </Typography>
          <Typography>
            We would appreciate it if you report this error directly to our{' '}
            <Link
              href="https://github.com/mui-org/material-ui/issues/new?template=1.bug.md"
              target="_blank"
            >
              issue tracker
            </Link>
            .
          </Typography>
          <pre>{error.toString()}</pre>
          {errorActions}
        </div>
      );
      /* eslint-enable material-ui/no-hardcoded-labels */
    }

    return children;
  }
}

DemoErrorBoundary.propTypes = {
  children: PropTypes.node,
  /**
   * actions that should be displayed when the error fallback is displayed
   */
  errorActions: PropTypes.node,
};
