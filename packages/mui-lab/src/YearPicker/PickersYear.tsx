import * as React from 'react';
import clsx from 'clsx';
import { useForkRef, capitalize } from '@mui/material/utils';
import { alpha, styled } from '@mui/material/styles';
import {
  unstable_composeClasses as composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
} from '@mui/base';
import {
  WrapperVariant,
  WrapperVariantContext,
} from '../internal/pickers/wrappers/WrapperVariantContext';

export interface YearProps {
  autoFocus?: boolean;
  children: React.ReactNode;
  // The below line triggers a false-positive ESLint error - `classes` are used below.
  // eslint-disable-next-line react/no-unused-prop-types
  classes?: {
    root?: string;
    modeDesktop?: string;
    modeMobile?: string;
    yearButton?: string;
    disabled?: string;
    selected?: string;
  };
  className?: string;
  disabled?: boolean;
  onClick: (event: React.MouseEvent, value: number) => void;
  onKeyDown: (event: React.KeyboardEvent, value: number) => void;
  selected: boolean;
  value: number;
}

export function getPickersYearUtilityClass(slot: string) {
  return generateUtilityClass('PrivatePickersYear', slot);
}

export type PickersYearClassKey = keyof NonNullable<YearProps['classes']>;

export const pickersYearClasses = generateUtilityClasses<PickersYearClassKey>(
  'PrivatePickersYear',
  ['root', 'modeMobile', 'modeDesktop', 'yearButton', 'disabled', 'selected'],
);

const useUtilityClasses = (ownerState: YearProps & { wrapperVariant: WrapperVariant }) => {
  const { wrapperVariant, disabled, selected, classes } = ownerState;

  const slots = {
    root: ['root', wrapperVariant && `mode${capitalize(wrapperVariant)}`],
    yearButton: ['yearButton', disabled && 'disabled', selected && 'selected'],
  };

  return composeClasses(slots, getPickersYearUtilityClass, classes);
};

const PickersYearRoot = styled('div')<{
  ownerState: YearProps & { wrapperVariant: WrapperVariant };
}>(({ ownerState }) => ({
  flexBasis: '33.3%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...(ownerState?.wrapperVariant === 'desktop' && {
    flexBasis: '25%',
  }),
}));

const PickersYearButton = styled('button')<{
  ownerState: YearProps & { wrapperVariant: WrapperVariant };
}>(({ theme }) => ({
  color: 'unset',
  backgroundColor: 'transparent',
  border: 0,
  outline: 0,
  ...theme.typography.subtitle1,
  margin: '8px 0',
  height: 36,
  width: 72,
  borderRadius: 18,
  cursor: 'pointer',
  '&:focus, &:hover': {
    backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
  },
  [`&.${pickersYearClasses.disabled}`]: {
    color: theme.palette.text.secondary,
  },
  [`&.${pickersYearClasses.selected}`]: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:focus, &:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

/**
 * @ignore - internal component.
 */
const PickersYear = React.forwardRef<HTMLButtonElement, YearProps>(function PickersYear(
  props,
  forwardedRef,
) {
  const { autoFocus, className, children, disabled, onClick, onKeyDown, selected, value } = props;
  const ref = React.useRef<HTMLButtonElement>(null);
  const refHandle = useForkRef(ref, forwardedRef as React.Ref<HTMLButtonElement>);
  const wrapperVariant = React.useContext(WrapperVariantContext);

  const ownerState = {
    ...props,
    wrapperVariant,
  };

  const classes = useUtilityClasses(ownerState);

  // TODO: Can we just forward this to the button?
  React.useEffect(() => {
    if (autoFocus) {
      // `ref.current` being `null` would be a bug in MUIu
      ref.current!.focus();
    }
  }, [autoFocus]);

  return (
    <PickersYearRoot
      data-mui-test="year"
      className={clsx(classes.root, className)}
      ownerState={ownerState}
    >
      <PickersYearButton
        ref={refHandle}
        disabled={disabled}
        type="button"
        data-mui-test={`year-${children}`}
        tabIndex={selected ? 0 : -1}
        onClick={(event) => onClick(event, value)}
        onKeyDown={(event) => onKeyDown(event, value)}
        className={classes.yearButton}
        ownerState={ownerState}
      >
        {children}
      </PickersYearButton>
    </PickersYearRoot>
  );
});

export default PickersYear;
