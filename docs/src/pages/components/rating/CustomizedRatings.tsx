import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

export default function CustomizedRatings() {
  return (
    <div>
      <Typography gutterBottom>Custom empty icon</Typography>
      <Rating
        name="customized-empty"
        value={2}
        precision={0.5}
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
      />
      <Box mt={3} />
      <Typography gutterBottom>Custom icon and color</Typography>
      <StyledRating
        name="customized-color"
        value={2}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
      />
      <Box mt={3} />
      <Typography gutterBottom>10 stars</Typography>
      <Rating name="customized-10" value={2} max={10} />
    </div>
  );
}
