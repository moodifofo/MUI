import * as React from 'react';
import BadgeUnstyled, {
  BadgeUnstyledBadgeSlotProps,
  BadgeUnstyledRootSlotProps,
} from '@mui/base/BadgeUnstyled';
import { expectType } from '@mui/types';

const Root = React.forwardRef(function Root(
  props: BadgeUnstyledRootSlotProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  const { ownerState, ...other } = props;
  return <span data-showzero={ownerState.showZero} {...other} ref={ref} />;
});

const Badge = React.forwardRef(function Badge(
  props: BadgeUnstyledBadgeSlotProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  const { ownerState, ...other } = props;
  return <span data-showzero={ownerState.showZero} {...other} ref={ref} />;
});

const styledBadge = <BadgeUnstyled slots={{ root: Root, badge: Badge }} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <BadgeUnstyled invalidProp={0} />

      <BadgeUnstyled
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <BadgeUnstyled<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <BadgeUnstyled<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
      />

      <BadgeUnstyled
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <BadgeUnstyled<'button'>
        slots={{
          root: 'button',
        }}
        ref={(elem) => {
          expectType<HTMLButtonElement | null, typeof elem>(elem);
        }}
        onClick={(e) => {
          expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof e>(e);
          e.currentTarget.checkValidity();
        }}
      />
    </div>
  );
};
