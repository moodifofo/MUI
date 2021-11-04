import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createClientRender } from 'test/utils';
import Button, { buttonClasses as classes } from '@mui/joy/Button';
import { ThemeProvider } from '@mui/joy/styles';

describe('Joy <Button />', () => {
  const render = createClientRender();

  describeConformance(<Button>Conformance?</Button>, () => ({
    render,
    classes,
    ThemeProvider,
    refInstanceof: window.HTMLButtonElement,
    muiName: 'JoyButton',
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    skip: ['propsSpread', 'componentsProp'],
  }));

  it('by default, should render with the root, variantText, sizeMedium and colorBrand classes', () => {
    const { getByRole } = render(<Button>Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.variantText);
    expect(button).to.have.class(classes.colorBrand);
  });

  it('should render an outlined button', () => {
    const { getByRole } = render(<Button variant="outlined">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.variantOutlined);
  });

  it('should render a contained button', () => {
    const { getByRole } = render(<Button variant="contained">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.variantContained);
  });

  it('should render a small button', () => {
    const { getByRole } = render(<Button size="small">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.sizeSmall);
  });

  it('should render a large button', () => {
    const { getByRole } = render(<Button size="large">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.sizeLarge);
  });

  it('should render a fullWidth button', () => {
    const { getByRole } = render(<Button fullWidth>Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.fullWidth);
  });
});
