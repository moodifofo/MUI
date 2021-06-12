import * as React from 'react';
import PropTypes from 'prop-types';
import MuiPaper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';

const PaperRoot = styled(MuiPaper, {
  shouldForwardProp: (prop) => prop !== 'background' && prop !== 'padding',
})(({ theme, background, padding }) => ({
  ...(background === 'light' && {
    backgroundColor: theme.palette.secondary.light,
  }),
  ...(background === 'main' && {
    backgroundColor: theme.palette.secondary.main,
  }),
  ...(background === 'dark' && {
    backgroundColor: theme.palette.secondary.dark,
  }),
  ...(!!padding && {
    padding: theme.spacing(1),
  }),
}));

function Paper(props) {
  const { background, classes, className, padding, ...other } = props;

  return (
    <PaperRoot
      square
      elevation={0}
      background={background}
      padding={padding}
      className={className}
      {...other}
    />
  );
}

Paper.propTypes = {
  background: PropTypes.oneOf(['dark', 'light', 'main']).isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  className: PropTypes.string,
  padding: PropTypes.bool,
};

export default Paper;
