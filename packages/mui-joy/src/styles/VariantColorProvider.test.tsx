import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import { VariantColorProvider, useVariantColor } from './VariantColorProvider';

describe('VariantColorProvider', () => {
  const { render } = createRenderer();

  it('should provide default variant and color', () => {
    function Test() {
      const { variant, color } = useVariantColor();
      return <div data-testid="test">{`${variant}:${color}`}</div>;
    }
    const { getByTestId } = render(<Test />);
    expect(getByTestId('test')).to.have.text('undefined:undefined');
  });

  it('variant `solid` should inherit variant and color', () => {
    function Test() {
      const { variant, color } = useVariantColor();
      return <div data-testid="test">{`${variant}:${color}`}</div>;
    }
    const { getByTestId } = render(
      <VariantColorProvider variant="solid" color="primary">
        <Test />
      </VariantColorProvider>,
    );
    expect(getByTestId('test')).to.have.text('solid:primary');
  });

  it('variant `soft` should inherit variant and color', () => {
    function Test() {
      const { variant, color } = useVariantColor();
      return <div data-testid="test">{`${variant}:${color}`}</div>;
    }
    const { getByTestId } = render(
      <VariantColorProvider variant="soft" color="success">
        <Test />
      </VariantColorProvider>,
    );
    expect(getByTestId('test')).to.have.text('soft:success');
  });

  it('variant `outlined` should set variant to plain and color to neutral', () => {
    function Test() {
      const { variant, color } = useVariantColor();
      return <div data-testid="test">{`${variant}:${color}`}</div>;
    }
    const { getByTestId } = render(
      <VariantColorProvider variant="outlined" color="primary">
        <Test />
      </VariantColorProvider>,
    );
    expect(getByTestId('test')).to.have.text('plain:neutral');
  });

  it('variant `plain` should set color to neutral', () => {
    function Test() {
      const { variant, color } = useVariantColor();
      return <div data-testid="test">{`${variant}:${color}`}</div>;
    }
    const { getByTestId } = render(
      <VariantColorProvider variant="plain" color="primary">
        <Test />
      </VariantColorProvider>,
    );
    expect(getByTestId('test')).to.have.text('plain:neutral');
  });
});
