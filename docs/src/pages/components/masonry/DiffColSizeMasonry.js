/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import Box from '@material-ui/core/Box';
import Masonry from '@material-ui/lab/Masonry';
import MasonryItem from '@material-ui/lab/MasonryItem';

export default function DiffColSizeMasonry() {
  return (
    <Masonry columns={4} spacing={1}>
      {itemData.map((item, index) => (
        <MasonryItem key={index} columnSpan={item.span}>
          <Box
            sx={{
              textAlign: 'center',
              height: item.height,
              border: 1,
              bgcolor: 'background.paper',
            }}
          >
            {index + 1}
          </Box>
        </MasonryItem>
      ))}
    </Masonry>
  );
}

const itemData = [
  { height: 150, span: 1 },
  { height: 30, span: 1 },
  { height: 90, span: 2 },
  { height: 110, span: 1 },
  { height: 150, span: 1 },
  { height: 150, span: 1 },
  { height: 130, span: 2 },
  { height: 80, span: 2 },
  { height: 50, span: 1 },
  { height: 90, span: 1 },
  { height: 100, span: 2 },
  { height: 150, span: 1 },
  { height: 50, span: 1 },
  { height: 50, span: 2 },
  { height: 50, span: 1 },
];
