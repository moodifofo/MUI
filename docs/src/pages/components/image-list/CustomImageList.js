import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import itemData from './itemData';

const useStyles = makeStyles({
  root: {
    width: 500,
    height: 450,
    // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: 'image-path',
 *     title: 'Image',
 *     author: 'author',
 *     featured: true,
 *   },
 *   { etc... },
 * ];
 */
export default function AdvancedImageList() {
  const classes = useStyles();

  return (
    <ImageList rowHeight={200} spacing={1} className={classes.root}>
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.featured ? 2 : 1}
          rows={item.featured ? 2 : 1}
        >
          <img src={item.img} alt={item.title} />
          <ImageListItemBar
            title={item.title}
            titlePosition="top"
            actionIcon={
              <IconButton
                aria-label={`star ${item.title}`}
                className={classes.icon}
              >
                <StarBorderIcon />
              </IconButton>
            }
            actionPosition="left"
            className={classes.titleBar}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
