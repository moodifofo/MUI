import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: {
    ...theme.mixins.toolbar,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  gutters: theme.mixins.gutters(),
  dense: {
    minHeight: 48,
    height: 48,
  },
});

function Toolbar(props) {
  const { children, classes, className: classNameProp, dense, disableGutters, ...other } = props;

  const className = classNames(
    classes.root,
    {
      [classes.gutters]: !disableGutters,
    },
    {
      [classes.dense]: dense,
    },
    classNameProp,
  );

  return (
    <div className={className} {...other}>
      {children}
    </div>
  );
}

Toolbar.propTypes = {
  /**
   * Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, condenses toolbar. Useful for desktop or denser layouts.
   */
  dense: PropTypes.bool,
  /**
   * If `true`, disables gutter padding.
   */
  disableGutters: PropTypes.bool,
};

Toolbar.defaultProps = {
  dense: false,
  disableGutters: false,
};

export default withStyles(styles, { name: 'MuiToolbar' })(Toolbar);
