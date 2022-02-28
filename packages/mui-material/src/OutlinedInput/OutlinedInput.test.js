import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import OutlinedInput, { outlinedInputClasses as classes } from '@mui/material/OutlinedInput';
import InputBase from '@mui/material/InputBase';

describe('<OutlinedInput />', () => {
  const { render } = createRenderer();

  describeConformance(<OutlinedInput />, () => ({
    classes,
    inheritComponent: InputBase,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiOutlinedInput',
    testDeepOverrides: { slotName: 'input', slotClassName: classes.input },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render a NotchedOutline', () => {
    const { container } = render(
      <OutlinedInput classes={{ notchedOutline: 'notched-outlined' }} />,
    );

    expect(container.querySelector('.notched-outlined')).not.to.equal(null);
  });

  it('should set correct label prop on outline', () => {
    const { container } = render(
      <OutlinedInput
        classes={{ notchedOutline: 'notched-outlined' }}
        label={<div data-testid="label">label</div>}
        required
      />,
    );
    const notchOutlined = container.querySelector('.notched-outlined legend');
    expect(notchOutlined).to.have.text('label\xa0*');
  });

  it('should forward classes to InputBase', () => {
    render(<OutlinedInput error classes={{ error: 'error' }} />);
    expect(document.querySelector('.error')).not.to.equal(null);
  });

  it('should respects the componentsProps if passed', () => {
    render(<OutlinedInput componentsProps={{ root: { 'data-test': 'test' } }} />);
    expect(document.querySelector('[data-test=test]')).not.to.equal(null);
  });

  it('should respect the classes coming from InputBase', () => {
    render(
      <OutlinedInput
        data-test="test"
        multiline
        sx={{ [`&.${classes.multiline}`]: { mt: '10px' } }}
      />,
    );
    expect(document.querySelector('[data-test=test]')).toHaveComputedStyle({ marginTop: '10px' });
  });
});
