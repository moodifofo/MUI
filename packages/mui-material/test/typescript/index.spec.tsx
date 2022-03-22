import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function TestStandardPropsUsage() {
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  const setContentRef = React.useCallback((node: HTMLDivElement | null) => {
    contentRef.current = node;
    // ...
  }, []);

  return (
    <Dialog open={true}>
      <DialogTitle>Dialog Demo</DialogTitle>
      <DialogContent ref={setContentRef}>
        <DialogContentText>Dialog content</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
