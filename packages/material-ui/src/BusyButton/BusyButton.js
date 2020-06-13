import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import withStyles from '../styles/withStyles';
import capitalize from '../utils/capitalize';
import Button from '../Button';
import CircularProgress from '../CircularProgress';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `pending={true}`. */
  pending: {},
  /* Styles applied to the pendingIndicator element. */
  pendingIndicator: {
    position: 'absolute',
    visibility: 'visible',
    display: 'flex',
  },
  /* Styles applied to the pendingIndicator element if `pendingPosition="center"`. */
  pendingIndicatorCenter: {
    left: '50%',
    transform: 'translate(-50%)',
  },
  /* Styles applied to the pendingIndicator element if `pendingPosition="start"`. */
  pendingIndicatorStart: {
    left: 14,
  },
  /* Styles applied to the pendingIndicator element if `pendingPosition="end"`. */
  pendingIndicatorEnd: {
    right: 14,
  },
  /* Styles applied to the endIcon element if `pending={true}` and `pendingPosition="end"`. */
  endIconLoadingEnd: {
    visibility: 'hidden',
  },
  /* Styles applied to the startIcon element if `pending={true}` and `pendingPosition="start"`. */
  startIconLoadingStart: {
    visibility: 'hidden',
  },
  /* Styles applied to the label element if `pending={true}` and `pendingPosition="center"`. */
  labelLoadingCenter: {
    visibility: 'hidden',
  },
});

const PendingIndicator = <CircularProgress color="inherit" size={16} />;

const BusyButton = React.forwardRef(function BusyButton(props, ref) {
  const {
    children,
    classes,
    className,
    disabled = false,
    pending = false,
    pendingIndicator = PendingIndicator,
    pendingPosition = 'center',
    ...other
  } = props;

  return (
    <Button
      className={clsx(
        classes.root,
        {
          [classes.pending]: pending,
        },
        className,
      )}
      disabled={disabled || pending}
      ref={ref}
      classes={{
        startIcon: classes[`startIcon${pending ? 'Loading' : ''}${capitalize(pendingPosition)}`],
        endIcon: classes[`endIcon${pending ? 'Loading' : ''}${capitalize(pendingPosition)}`],
        label: classes[`label${pending ? 'Loading' : ''}${capitalize(pendingPosition)}`],
      }}
      {...other}
    >
      {pending && (
        <div
          className={clsx(
            classes.pendingIndicator,
            classes[`pendingIndicator${capitalize(pendingPosition)}`],
          )}
        >
          {pendingIndicator}
        </div>
      )}

      {children}
    </Button>
  );
});

BusyButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the button.
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
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The content of the button.
   */
  pending: PropTypes.bool,
  /**
   * Element placed before the children if the button is in pending state.
   */
  pendingIndicator: PropTypes.node,
  /**
   * The pending indicator can be positioned on the start, end, or the center of the button.
   */
  pendingPosition: chainPropTypes(PropTypes.oneOf(['start', 'end', 'center']), (props) => {
    if (props.pendingPosition === 'start' && !props.startIcon) {
      return new Error(
        `Material-UI: The pendingPosition="start" should be used in combination with startIcon.`,
      );
    }
    if (props.pendingPosition === 'end' && !props.endIcon) {
      return new Error(
        `Material-UI: The pendingPosition="end" should be used in combination with endIcon.`,
      );
    }
    return null;
  }),
};

export default withStyles(styles, { name: 'MuiBusyButton' })(BusyButton);
