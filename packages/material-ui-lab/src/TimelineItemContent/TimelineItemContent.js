import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {
    padding: '6px 16px',
  },
});

const TimelineItemContent = React.forwardRef(function TimelineItemContent(props, ref) {
  const {
    children,
    classes,
    className,
    component: Component = 'div',
    variant = 'standard',
    ...other
  } = props;

  return (
    <Component className={clsx(classes.root, classes[variant], className)} ref={ref} {...other}>
      {children}
    </Component>
  );
});

TimelineItemContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['outlined', 'standard']),
};

export default withStyles(styles, { name: 'MuiTimelineItemContent' })(TimelineItemContent);
