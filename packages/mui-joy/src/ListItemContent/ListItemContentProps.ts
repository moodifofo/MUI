import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';

export type ListItemContentSlot = 'root';

export interface ListItemContentTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type ListItemContentProps<
  D extends React.ElementType = ListItemContentTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<ListItemContentTypeMap<P, D>, D>;

export interface ListItemContentOwnerState extends ListItemContentProps {}
