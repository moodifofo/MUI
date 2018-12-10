import * as React from 'react';
import { PropTypes, StandardProps } from '@material-ui/core';
import { ButtonBaseClassKey, ButtonBaseTypeMap } from '@material-ui/core/ButtonBase';
import { OverridableComponent, SimplifiedPropsOf } from '@material-ui/core/OverridableComponent';

declare const ToggleButton: OverridableComponent<{
  outerProps: ButtonBaseTypeMap['outerProps'] & {
    disabled?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    selected?: boolean;
    type?: string;
    value?: any;
  };
  defaultComponent: 'button',
  classKey: ToggleButtonClassKey
}>;

export type ToggleButtonProps = SimplifiedPropsOf<typeof ToggleButton>;

export type ToggleButtonClassKey = ButtonBaseClassKey | 'label' | 'selected';

export default ToggleButton;
