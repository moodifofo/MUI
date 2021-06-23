import * as React from 'react';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import SwitchUnstyled, {
  SwitchState,
  switchUnstyledClasses,
} from '@material-ui/unstyled/SwitchUnstyled';
import { expect } from 'chai';

interface WithClassName {
  className: string;
}

interface WithCustomProp {
  fooBar: string;
}

describe('<SwitchUnstyled />', () => {
  const mount = createMount();
  const render = createClientRender();
  const classes = switchUnstyledClasses as unknown as Record<string, string>;

  describeConformanceV5(<SwitchUnstyled />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'span',
    muiName: 'MuiSwitch',
    skip: ['rootClass', 'themeDefaultProps', 'themeStyleOverrides', 'themeVariants'],
  }));

  describe('prop forwarding', () => {
    it('forwards custom props to the root element if a component is provided', () => {
      const CustomRoot = ({ fooBar }: WithCustomProp) => {
        return <div data-foobar={fooBar} />;
      };

      const otherProps = {
        fooBar: 'baz',
      };

      const { container } = render(
        <SwitchUnstyled components={{ Root: CustomRoot }} {...otherProps} />,
      );

      expect(container.firstChild).to.have.attribute('data-foobar', 'baz');
    });

    it('does not forward custom props to the root element if an intrinsic element is provided', () => {
      const otherProps = {
        fooBar: 'baz',
      };

      const { container } = render(<SwitchUnstyled components={{ Root: 'div' }} {...otherProps} />);

      expect(container.firstChild).not.to.have.attribute('fooBar');
    });

    it('forwards standard props to the root element if an intrinsic element is provided', () => {
      const otherProps = {
        tabIndex: 0,
        'aria-label': 'Foo',
      };

      const { container } = render(<SwitchUnstyled components={{ Root: 'div' }} {...otherProps} />);

      expect(container.firstChild).to.have.attribute('tabindex', '0');
      expect(container.firstChild).to.have.attribute('aria-label', 'Foo');
    });
  });

  describe('prop: components', () => {
    it('allows overriding the Thumb slot with a component', () => {
      const CustomThumb = ({ className }: WithClassName) => (
        <i className={className} data-testid="customThumb" />
      );

      const { getByTestId } = render(<SwitchUnstyled components={{ Thumb: CustomThumb }} />);
      const thumb = getByTestId('customThumb');
      expect(thumb).to.have.class(switchUnstyledClasses.thumb);
    });

    it('allows overriding the Thumb slot with an element', () => {
      const { container } = render(<SwitchUnstyled components={{ Thumb: 'i' }} />);
      const thumb = container.querySelector('i');
      expect(thumb).to.have.class(switchUnstyledClasses.thumb);
    });

    it('allows overriding the Input slot with a component', () => {
      const CustomInput = React.forwardRef(({ className }: WithClassName, ref: React.Ref<any>) => (
        <input type="checkbox" ref={ref} className={className} data-testid="customInput" />
      ));

      const { getByTestId } = render(<SwitchUnstyled components={{ Input: CustomInput }} />);
      const input = getByTestId('customInput');
      expect(input).to.have.class(switchUnstyledClasses.input);
    });
  });

  describe('prop: componentsProps', () => {
    it("sets custom properties on slots' elements", () => {
      const componentsProps = {
        root: {
          'data-testid': 'root',
        },
        input: {
          'data-testid': 'input',
        },
        thumb: {
          'data-testid': 'thumb',
        },
      };

      const { getByTestId } = render(<SwitchUnstyled componentsProps={componentsProps} />);

      expect(getByTestId('root')).to.have.class(switchUnstyledClasses.root);
      expect(getByTestId('input')).to.have.class(switchUnstyledClasses.input);
      expect(getByTestId('thumb')).to.have.class(switchUnstyledClasses.thumb);
    });

    it('merges the provided class names with the built-in ones', () => {
      const componentsProps = {
        root: {
          'data-testid': 'root',
          className: 'my-root',
        },
        input: {
          'data-testid': 'input',
          className: 'my-input',
        },
        thumb: {
          'data-testid': 'thumb',
          className: 'my-thumb',
        },
      };

      const { getByTestId } = render(<SwitchUnstyled componentsProps={componentsProps} />);

      expect(getByTestId('root')).to.have.class(switchUnstyledClasses.root);
      expect(getByTestId('root')).to.have.class('my-root');
      expect(getByTestId('input')).to.have.class(switchUnstyledClasses.input);
      expect(getByTestId('input')).to.have.class('my-input');
      expect(getByTestId('thumb')).to.have.class(switchUnstyledClasses.thumb);
      expect(getByTestId('thumb')).to.have.class('my-thumb');
    });
  });

  describe('componentState', () => {
    it('passes the componentState prop to all the slots', () => {
      interface CustomSlotProps {
        componentState: SwitchState;
        children?: React.ReactNode;
      }

      const CustomSlot = React.forwardRef(
        ({ componentState: cs, children }: CustomSlotProps, ref: React.Ref<any>) => {
          return (
            <div
              ref={ref}
              data-checked={cs.checked}
              data-disabled={cs.disabled}
              data-readonly={cs.readOnly}
              data-focusvisible={cs.focusVisible}
              data-testid="custom"
            >
              {children}
            </div>
          );
        },
      );

      const components = {
        Root: CustomSlot,
        Input: CustomSlot,
        Thumb: CustomSlot,
      };

      const { getAllByTestId } = render(
        <SwitchUnstyled defaultChecked disabled components={components} />,
      );
      const renderedComponents = getAllByTestId('custom');

      expect(renderedComponents.length).to.equal(3);
      for (let i = 0; i < renderedComponents.length; i += 1) {
        expect(renderedComponents[i]).to.have.attribute('data-checked', 'true');
        expect(renderedComponents[i]).to.have.attribute('data-disabled', 'true');
        expect(renderedComponents[i]).to.have.attribute('data-readonly', 'false');
        expect(renderedComponents[i]).to.have.attribute('data-focusvisible', 'false');
      }
    });
  });
});
