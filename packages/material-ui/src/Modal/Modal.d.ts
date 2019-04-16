import * as React from 'react';
import { StandardProps, ModalManager } from '..';
import { BackdropProps } from '../Backdrop';
import { PortalProps } from '../Portal';

export interface ModalProps
  extends StandardProps<React.HtmlHTMLAttributes<HTMLDivElement>, ModalClassKey, 'children'> {
  BackdropComponent?: React.ElementType<BackdropProps>;
  BackdropProps?: Partial<BackdropProps>;
  children: React.ReactElement;
  closeAfterTransition?: boolean;
  container?: PortalProps['container'];
  disableAutoFocus?: boolean;
  disableBackdropClick?: boolean;
  disableEnforceFocus?: boolean;
  disableEscapeKeyDown?: boolean;
  disablePortal?: PortalProps['disablePortal'];
  disableRestoreFocus?: boolean;
  hideBackdrop?: boolean;
  keepMounted?: boolean;
  manager?: ModalManager;
  onBackdropClick?: React.ReactEventHandler<{}>;
  onClose?: (event: React.SyntheticEvent<any>, reason: string) => void;
  onEscapeKeyDown?: React.ReactEventHandler<{}>;
  onRendered?: PortalProps['onRendered'];
  open: boolean;
}

export type ModalClassKey = 'root' | 'hidden';

declare const Modal: React.ComponentType<ModalProps>;

export default Modal;
