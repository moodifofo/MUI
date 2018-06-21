import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  extendedLabel: {
    marginRight: 12,
  },
});

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="fab" color="primary" aria-label="add" className={classes.button}>
        <AddIcon />
      </Button>
      <Button variant="fab" color="secondary" aria-label="edit" className={classes.button}>
        <Icon>edit_icon</Icon>
      </Button>
      <Button variant="extended-fab" aria-label="delete" className={classes.button}>
        <NavigationIcon className={classes.extendedIcon} />
        <span className={classes.extendedLabel}>Extended</span>
      </Button>
      <Button variant="fab" disabled aria-label="delete" className={classes.button}>
        <DeleteIcon />
      </Button>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);
