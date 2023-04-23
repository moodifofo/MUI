import * as React from 'react';
import PopperUnstyled, { PopperUnstyledRootSlotProps } from '@mui/base/PopperUnstyled';
import { expectType } from '@mui/types';

function Root(props: PopperUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-open={ownerState.open} {...other} />;
}

const styledPopper = <PopperUnstyled slots={{ root: Root }} open />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      <PopperUnstyled open>
        {(props) => {
          return <div>{props.placement}</div>;
        }}
      </PopperUnstyled>

      {/* @ts-expect-error */}
      <PopperUnstyled invalidProp={0} open />

      <PopperUnstyled
        open
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <PopperUnstyled<typeof CustomComponent>
        open
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <PopperUnstyled<typeof CustomComponent>
        open
        slots={{
          root: CustomComponent,
        }}
      />

      <PopperUnstyled
        open
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <PopperUnstyled<'button'>
        open
        slots={{
          root: 'button',
        }}
        ref={(elem) => {
          expectType<HTMLButtonElement | null, typeof elem>(elem);
        }}
        onMouseDown={(e) => {
          expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof e>(e);
          e.currentTarget.checkValidity();
        }}
      />
    </div>
  );
};
