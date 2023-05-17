import { expect } from 'chai';
import { spy } from 'sinon';
import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { createRenderer, screen } from 'test/utils';
import useNumberInput, { UseNumberInputParameters } from './index';

describe('useNumberInput', () => {
  const { render } = createRenderer();
  const invokeUseNumberInput = (props: UseNumberInputParameters) => {
    const ref = React.createRef<ReturnType<typeof useNumberInput>>();
    function TestComponent() {
      const numberInputDefinition = useNumberInput(props);
      React.useImperativeHandle(ref, () => numberInputDefinition, [numberInputDefinition]);
      return null;
    }

    render(<TestComponent />);

    return ref.current!;
  };

  describe('getInputProps', () => {
    it('should return correct ARIA attributes', () => {
      const props: UseNumberInputParameters = {
        value: 50,
        min: 10,
        max: 100,
        disabled: true,
      };

      const { getInputProps } = invokeUseNumberInput(props);
      const inputProps = getInputProps();

      expect(inputProps.role).to.equal('spinbutton');
      expect(inputProps['aria-valuenow']).to.equal(50);
      expect(inputProps['aria-valuemin']).to.equal(10);
      expect(inputProps['aria-valuemax']).to.equal(100);
      expect(inputProps['aria-disabled']).to.equal(true);
      expect(inputProps.tabIndex).to.equal(0);
    });

    it('should accept defaultValue in uncontrolled mode', () => {
      const props: UseNumberInputParameters = {
        defaultValue: 100,
        disabled: true,
        required: true,
      };

      const { getInputProps } = invokeUseNumberInput(props);
      const inputProps = getInputProps();

      expect(inputProps.value).to.equal(100);
      expect(inputProps.required).to.equal(true);
    });
  });

  describe('prop: onChange', () => {
    it('should call onChange accordingly when inputting valid characters', async () => {
      const user = userEvent.setup();
      const handleChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({ onChange: handleChange });

        return <input {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByRole('spinbutton') as HTMLInputElement;

      await user.click(input);

      await user.keyboard('-12');

      expect(handleChange.callCount).to.equal(3);
      expect(handleChange.args[2][0].target.value).to.equal('-12');
      expect(input.value).to.equal('-12');
    });

    it('should not change the input value when inputting invalid characters', async () => {
      const user = userEvent.setup();
      const handleChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({ onChange: handleChange });

        return <input {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByRole('spinbutton') as HTMLInputElement;

      await user.click(input);

      await user.keyboard('-5a');

      expect(handleChange.callCount).to.equal(3);
      expect(input.value).to.equal('-5');
    });
  });

  describe('prop: onValueChange', () => {
    it('should call onValueChange when the input is blurred', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({ onValueChange: handleValueChange });

        return <input {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByRole('spinbutton');

      await user.click(input);

      await user.keyboard('34');

      expect(handleValueChange.callCount).to.equal(0);

      await user.keyboard('[Tab]');
      expect(document.activeElement).to.equal(document.body);

      expect(handleValueChange.callCount).to.equal(1);
    });

    it('should call onValueChange with a value within max', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({
          onValueChange: handleValueChange,
          max: 5,
        });

        return <input {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByRole('spinbutton');

      await user.click(input);

      await user.keyboard('9');

      await user.keyboard('[Tab]');
      expect(document.activeElement).to.equal(document.body);

      expect(handleValueChange.args[0][1]).to.equal(5);
    });

    it('should call onValueChange with a value within min', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({
          onValueChange: handleValueChange,
          min: 5,
        });

        return <input {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByRole('spinbutton');

      await user.click(input);

      await user.keyboard('-9');

      await user.keyboard('[Tab]');
      expect(document.activeElement).to.equal(document.body);

      expect(handleValueChange.args[0][1]).to.equal(5);
    });

    it('should call onValueChange with a value based on a custom step', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({
          onValueChange: handleValueChange,
          min: 0,
          step: 5,
        });

        return <input {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByRole('spinbutton');

      await user.click(input);

      await user.keyboard('4');

      await user.keyboard('[Tab]');
      expect(document.activeElement).to.equal(document.body);

      expect(handleValueChange.args[0][1]).to.equal(5);
    });

    it('should call onValueChange with undefined when the value is cleared', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({
          onValueChange: handleValueChange,
        });

        return <input {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByRole('spinbutton') as HTMLInputElement;

      await user.click(input);

      await user.keyboard('9');

      expect(input.value).to.equal('9');

      await user.keyboard('[Backspace]');

      expect(input.value).to.equal('');

      await user.keyboard('[Tab]');
      expect(document.activeElement).to.equal(document.body);

      expect(handleValueChange.callCount).to.equal(1);
      expect(handleValueChange.args[0][1]).to.equal(undefined);
    });

    it('should call onValueChange with undefined when input value is -', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({
          onValueChange: handleValueChange,
        });

        return <input {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByRole('spinbutton') as HTMLInputElement;

      await user.click(input);

      await user.keyboard('-5');

      expect(input.value).to.equal('-5');

      await user.keyboard('[Backspace]');

      expect(input.value).to.equal('-');

      await user.keyboard('[Tab]');
      expect(document.activeElement).to.equal(document.body);

      expect(handleValueChange.callCount).to.equal(1);
      expect(handleValueChange.args[0][1]).to.equal(undefined);
    });
  });
});
