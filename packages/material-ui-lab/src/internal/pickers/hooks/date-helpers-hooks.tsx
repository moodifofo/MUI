import * as React from 'react';
import { useUtils } from './useUtils';
import { ParsableDate } from '../constants/prop-types';
import { PickerOnChangeFn } from './useViews';
import { getMeridiem, convertToMeridiem } from '../time-utils';

export type OverrideParsableDateProps<TDate, TProps, TKey extends keyof TProps> = Omit<
  TProps,
  TKey
> &
  Partial<Record<TKey, ParsableDate<TDate>>>;

export function useParsedDate<TDate>(
  possiblyUnparsedValue: ParsableDate<TDate>,
): TDate | undefined {
  const utils = useUtils<TDate>();
  return React.useMemo(
    () =>
      typeof possiblyUnparsedValue === 'undefined' ? undefined : utils.date(possiblyUnparsedValue)!,
    [possiblyUnparsedValue, utils],
  );
}

interface MonthValidationOptions {
  disablePast?: boolean;
  disableFuture?: boolean;
  minDate: unknown;
  maxDate: unknown;
}

export function useNextMonthDisabled(
  month: unknown,
  { disableFuture, maxDate }: Pick<MonthValidationOptions, 'disableFuture' | 'maxDate'>,
) {
  const utils = useUtils();
  return React.useMemo(() => {
    const now = utils.date();
    const lastEnabledMonth = utils.startOfMonth(
      disableFuture && utils.isBefore(now, maxDate) ? now : maxDate,
    );
    return !utils.isAfter(lastEnabledMonth, month);
  }, [disableFuture, maxDate, month, utils]);
}

export function usePreviousMonthDisabled(
  month: unknown,
  { disablePast, minDate }: Pick<MonthValidationOptions, 'disablePast' | 'minDate'>,
) {
  const utils = useUtils();

  return React.useMemo(() => {
    const now = utils.date();
    const firstEnabledMonth = utils.startOfMonth(
      disablePast && utils.isAfter(now, minDate) ? now : minDate,
    );
    return !utils.isBefore(firstEnabledMonth, month);
  }, [disablePast, minDate, month, utils]);
}

export function useMeridiemMode<TDate>(
  date: TDate | any,
  ampm: boolean | undefined,
  onChange: PickerOnChangeFn<TDate>,
) {
  const utils = useUtils<TDate>();
  const meridiemMode = getMeridiem(date, utils);

  const handleMeridiemChange = React.useCallback(
    (mode: 'am' | 'pm') => {
      const timeWithMeridiem = convertToMeridiem<TDate>(date, mode, Boolean(ampm), utils);
      onChange(timeWithMeridiem, 'shallow');
    },
    [ampm, date, onChange, utils],
  );

  return { meridiemMode, handleMeridiemChange };
}
