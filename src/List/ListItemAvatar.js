// @flow weak

import { PropTypes, cloneElement, Component } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiListItemAvatar', () => {
  return {
    dense: {
      height: 32,
      marginRight: 8,
      width: 32,
    },
  };
});

export default class ListItemAvatar extends Component {
  render() {
    if (!this.context.dense) return this.props.children;

    const {
      children,
      className: classNameProp,
      ...other
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);

    return cloneElement(children, {
      className: classNames(classes.dense, classNameProp),
      ...other,
    });
  }
}

ListItemAvatar.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

ListItemAvatar.contextTypes = {
  dense: PropTypes.bool,
  styleManager: customPropTypes.muiRequired,
};
