import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ButtonBase from '../ButtonBase';
import withStyles from '../styles/withStyles';
import AccordionContext from '../Accordion/AccordionContext';

export const styles = (theme) => {
  const transition = {
    duration: theme.transitions.duration.shortest,
  };

  return {
    /* Styles applied to the root element. */
    root: {
      display: 'flex',
      minHeight: 8 * 6,
      transition: theme.transitions.create(['min-height', 'background-color'], transition),
      padding: theme.spacing(0, 2),
      '&:hover:not($disabled)': {
        cursor: 'pointer',
      },
      '&$expanded': {
        minHeight: 64,
      },
      '&$focusVisible': {
        backgroundColor: theme.palette.action.focus,
      },
      '&$disabled': {
        opacity: theme.palette.action.disabledOpacity,
      },
    },
    /* Pseudo-class applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`. */
    expanded: {},
    /* Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
    focusVisible: {},
    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the children wrapper element. */
    content: {
      display: 'flex',
      flexGrow: 1,
      transition: theme.transitions.create(['margin'], transition),
      margin: '12px 0',
      '&$expanded': {
        margin: '20px 0',
      },
    },
    /* Styles applied to the `expandIcon`'s wrapper element. */
    expandIconWrapper: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', transition),
      '&$expanded': {
        transform: 'rotate(180deg)',
      },
    },
  };
};

const AccordionSummary = React.forwardRef(function AccordionSummary(props, ref) {
  const {
    children,
    classes,
    className,
    expandIcon,
    focusVisibleClassName,
    onClick,
    ...other
  } = props;

  const { disabled = false, expanded, toggle } = React.useContext(AccordionContext);
  const handleChange = (event) => {
    if (toggle) {
      toggle(event);
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <ButtonBase
      focusRipple={false}
      disableRipple
      disabled={disabled}
      component="div"
      aria-expanded={expanded}
      className={clsx(
        classes.root,
        {
          [classes.disabled]: disabled,
          [classes.expanded]: expanded,
        },
        className,
      )}
      focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
      onClick={handleChange}
      ref={ref}
      {...other}
    >
      <div className={clsx(classes.content, { [classes.expanded]: expanded })}>{children}</div>
      {expandIcon && (
        <div
          edge="end"
          className={clsx(classes.expandIconWrapper, {
            [classes.expanded]: expanded,
          })}
        >
          {expandIcon}
        </div>
      )}
    </ButtonBase>
  );
});

AccordionSummary.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the accordion summary.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The icon to display as the expand indicator.
   */
  expandIcon: PropTypes.node,
  /**
   * This prop can help a person know which element has the keyboard focus.
   * The class name will be applied when the element gain the focus through a keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
};

export default withStyles(styles, { name: 'MuiAccordionSummary' })(AccordionSummary);
