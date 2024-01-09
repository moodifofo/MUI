import * as React from 'react';
import { useTheme } from '@mui/system';
import { Slider as BaseSlider, SliderProps } from '@mui/base/Slider';
import clsx from 'clsx';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledSliderIntroduction() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''} style={{ width: 320 }}>
      <Slider defaultValue={50} />
      <Slider defaultValue={10} disabled />
    </div>
  );
}

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

const Slider = React.forwardRef<HTMLSpanElement, SliderProps>((props, ref) => {
  return (
    <BaseSlider
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `h-1.5 w-full py-4 inline-block relative touch-none ${
                ownerState.disabled
                  ? 'opacity-50 cursor-default pointer-events-none text-slate-300 dark:text-slate-600'
                  : 'hover:opacity-100 cursor-pointer text-purple-500 dark:text-purple-400'
              }`,
              resolvedSlotProps?.className,
            ),
          };
        },
        rail: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.rail,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'block absolute w-full h-[6px] rounded-full bg-current opacity-40',
              resolvedSlotProps?.className,
            ),
          };
        },
        track: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.track,
            ownerState,
          );

          return {
            ...resolvedSlotProps,
            className: clsx(
              'block absolute h-[6px] rounded-full bg-current',
              resolvedSlotProps?.className,
            ),
          };
        },
        thumb: (ownerState, { active, focused }) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.thumb,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `absolute w-[20px] h-[20px] -ml-1.5 mt-[-7px] box-border rounded-full outline-0 border-4 border-solid border-current bg-white hover:shadow-outline-purple transition ${
                focused || active
                  ? 'shadow-[0_0_0_8px_rgba(192,132,252,0.5)] dark:shadow-[0_0_0_4px_rgba(192,132,252,0.5)] active:shadow-[0_0_0_4px_rgba(192,132,252,0.5)] dark:active:shadow-[0_0_0_4px_rgba(192,132,252,0.5)] scale-[1.2] outline-none'
                  : ''
              }`,
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});
