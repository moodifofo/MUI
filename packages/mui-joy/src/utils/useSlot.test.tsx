import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '../styles';
import useSlot from './useSlot';
import { SlotComponentProps } from './types';

describe('useSlot', () => {
  const { render } = createRenderer();

  describe('single slot', () => {
    const ItemRoot = styled('button')({});
    const Item = React.forwardRef<
      HTMLButtonElement,
      { component?: React.ElementType; href?: string }
    >((props, ref) => {
      const [SlotRoot, rootProps] = useSlot('root', {
        ref,
        className: 'root',
        elementType: ItemRoot,
        externalForwardedProps: props,
        ownerState: {},
      });
      return <SlotRoot {...rootProps} />;
    });

    it('should render correct tag', () => {
      const { getByRole } = render(<Item />);
      expect(getByRole('button')).toBeVisible();
    });

    it('should change leaf component and spread props', () => {
      const { getByRole } = render(<Item component="a" href="/" />);
      expect(getByRole('link')).toBeVisible();
    });
  });

  describe('multiple slots', () => {
    const ItemRoot = styled('button')({});
    const ItemDecorator = styled('span')({});
    const Item = React.forwardRef<
      HTMLButtonElement,
      {
        className?: string;
        component?: React.ElementType;
        href?: string;
        slots?: { root?: React.ElementType; decorator?: React.ElementType };
        slotProps?: {
          root?: SlotComponentProps<'button', Record<string, any>, {}>;
          decorator?: SlotComponentProps<'span', { size?: 'sm' | 'md' } & Record<string, any>, {}>;
        };
      }
    >((props, ref) => {
      const [SlotRoot, rootProps] = useSlot('root', {
        ref,
        className: 'root',
        elementType: ItemRoot,
        externalForwardedProps: props,
        ownerState: {},
      });
      const [SlotDecorator, decoratorProps] = useSlot('decorator', {
        className: 'decorator',
        elementType: ItemDecorator,
        externalForwardedProps: props,
        ownerState: {},
        getSlotOwnerState: (mergedProps) => ({
          size: mergedProps.size ?? 'md',
        }),
      });
      return (
        <SlotRoot {...rootProps}>
          <SlotDecorator
            {...decoratorProps}
            className={`${decoratorProps.className} size-${decoratorProps.ownerState.size}`}
          />
        </SlotRoot>
      );
    });

    it('should render both tags', () => {
      const { getByRole } = render(<Item />);
      expect(getByRole('button')).toBeVisible();
      expect(getByRole('button').firstChild).to.have.tagName('span');
    });

    it('should have classes', () => {
      const { getByRole } = render(<Item />);
      expect(getByRole('button')).to.have.class('root');
      expect(getByRole('button').firstChild).to.have.class('decorator');
    });

    it('should append classes', () => {
      const { getByRole } = render(
        <Item className="foo-bar" slotProps={{ decorator: { className: 'foo-bar' } }} />,
      );
      expect(getByRole('button')).to.have.class('root');
      expect(getByRole('button')).to.have.class('foo-bar');
      expect(getByRole('button').firstChild).to.have.class('decorator');
      expect(getByRole('button').firstChild).to.have.class('foo-bar');
    });

    it('slot has default size `md`', () => {
      const { getByRole } = render(<Item />);
      expect(getByRole('button').firstChild).to.have.class('size-md');
    });

    it('slot ownerstate should be overriable', () => {
      const { getByRole } = render(<Item slotProps={{ decorator: { size: 'sm' } }} />);
      expect(getByRole('button').firstChild).to.have.class('size-sm');
    });

    it('slotProps has higher priority', () => {
      const { getByRole } = render(
        <Item data-item="foo" slotProps={{ root: { 'data-item': 'bar' } }} />,
      );
      expect(getByRole('button')).to.have.attribute('data-item', 'bar');
    });

    it('can change root leaf component with `component` prop', () => {
      const { getByRole } = render(<Item component="a" href="/" />);
      expect(getByRole('link')).toBeVisible();
    });

    it('use slotProps `component` over `component` prop', () => {
      const { getByRole } = render(
        <Item component="div" slotProps={{ root: { component: 'a', href: '/' } }} />,
      );
      expect(getByRole('link')).toBeVisible();
    });

    it('can change decorator leaf component', () => {
      const { getByRole } = render(<Item slotProps={{ decorator: { component: 'div' } }} />);
      expect(getByRole('button').firstChild).to.have.tagName('div');
    });
  });

  describe('multiple slots with unstyled popper', () => {
    const ItemRoot = styled('div')({});
    const ItemListbox = styled('ul')({
      margin: 'initial', // prevent Popper error.
    });
    const ItemOption = styled('div')({});

    function Item(props: {
      component?: React.ElementType;
      slots?: {
        root?: React.ElementType;
        listbox?: React.ElementType;
        option?: React.ElementType;
      };
      slotProps?: {
        root?: SlotComponentProps<'button', Record<string, any>, {}>;
        listbox?: SlotComponentProps<'span', Record<string, any>, {}>;
        option?: SlotComponentProps<'div', Record<string, any>, {}>;
      };
    }) {
      const ref = React.useRef(null);
      const [SlotRoot, rootProps] = useSlot('root', {
        ref,
        className: 'root',
        elementType: ItemRoot,
        externalForwardedProps: props,
        ownerState: {},
      });
      const [SlotListbox, listboxProps] = useSlot('listbox', {
        className: 'listbox',
        elementType: PopperUnstyled,
        externalForwardedProps: props,
        ownerState: {},
        additionalProps: {
          open: true,
          role: 'menu',
          anchorEl: () => document.createElement('div'),
        },
        internalForwardedProps: {
          component: ItemListbox,
        },
      });
      const [SlotOption, optionProps] = useSlot('option', {
        className: 'option',
        elementType: ItemOption,
        externalForwardedProps: props,
        ownerState: {},
        additionalProps: {
          role: 'menuitem',
        },
      });
      return (
        <React.Fragment>
          <SlotRoot {...rootProps} />
          <SlotListbox {...listboxProps}>
            <SlotOption as="li" {...optionProps} />
          </SlotListbox>
        </React.Fragment>
      );
    }

    it('should render popper with styled-component', () => {
      const { getByRole } = render(<Item />);
      expect(getByRole('menu')).toBeVisible();
      expect(getByRole('menu')).to.have.tagName('ul');
      expect(getByRole('menu')).to.have.class('listbox');
      expect(getByRole('menuitem')).to.have.tagName('li');
    });

    it('the listbox slot should be replaceable', () => {
      function Listbox({ component }: { component?: React.ElementType }) {
        return <ul data-component={component} />;
      }

      const { getByRole } = render(<Item slots={{ listbox: Listbox }} />);
      expect(getByRole('list')).toBeVisible();
      expect(getByRole('list')).not.to.have.attribute('class');
      expect(getByRole('list')).not.to.have.attribute('data-component');
    });

    it('the listbox leaf component can be changed', () => {
      const { getByRole } = render(<Item slotProps={{ listbox: { component: 'div' } }} />);
      expect(getByRole('menu')).to.have.tagName('div');
    });

    it('the option leaf component can be changed', () => {
      const { getByRole } = render(<Item slotProps={{ option: { component: 'div' } }} />);
      expect(getByRole('menuitem')).to.have.tagName('div');
    });
  });
});
