import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  createRenderer,
  describeConformance,
  describeJoyColorInversion,
  fireEvent,
} from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Avatar, { avatarClasses as classes } from '@mui/joy/Avatar';
import { unstable_capitalize as capitalize } from '@mui/utils';
import PersonIcon from '../internal/svg-icons/Person';

describe('<Avatar />', () => {
  const { render } = createRenderer();

  describeConformance(<Avatar />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyAvatar',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    testDeepOverrides: { slotName: 'fallback', slotClassName: classes.fallback },
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    slots: {
      root: { expectedClassName: classes.root },
      fallback: { expectedClassName: classes.fallback },
    },
    skip: ['classesRoot', 'componentsProp'],
  }));

  describeJoyColorInversion(<Avatar />, { muiName: 'JoyAvatar', classes });

  describe('prop: variant', () => {
    it('soft by default', () => {
      const { getByTestId } = render(<Avatar data-testid="root" />);

      expect(getByTestId('root')).to.have.class(classes.variantSoft);
    });

    ['outlined', 'soft', 'solid'].forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByTestId } = render(<Avatar data-testid="root" variant={variant} />);

        expect(getByTestId('root')).to.have.class(classes[`variant${capitalize(variant)}`]);
      });
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      const { getByTestId } = render(<Avatar data-testid="root" />);

      expect(getByTestId('root')).to.have.class(classes.colorNeutral);
    });

    ['primary', 'success', 'info', 'danger', 'neutral', 'warning'].forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByTestId } = render(<Avatar data-testid="root" color={color} />);

        expect(getByTestId('root')).to.have.class(classes[`color${capitalize(color)}`]);
      });
    });
  });

  describe('prop: size', () => {
    it('md by default', () => {
      const { getByTestId } = render(<Avatar data-testid="root" />);

      expect(getByTestId('root')).to.have.class(classes.sizeMd);
    });
    ['sm', 'md', 'lg'].forEach((size) => {
      it(`should render ${size}`, () => {
        const { getByTestId } = render(<Avatar data-testid="root" size={size} />);

        expect(getByTestId('root')).to.have.class(classes[`size${capitalize(size)}`]);
      });
    });
  });

  describe('image avatar', () => {
    it('should render a div containing an img', () => {
      const { container } = render(
        <Avatar
          className="my-avatar"
          src="/fake.png"
          alt="Hello World!"
          data-my-prop="woofAvatar"
        />,
      );
      const avatar = container.firstChild;
      const img = avatar.firstChild;
      expect(avatar).to.have.tagName('div');
      expect(img).to.have.tagName('img');
      expect(avatar).to.have.class(classes.root);
      expect(avatar).to.have.class('my-avatar');
      expect(avatar).to.have.attribute('data-my-prop', 'woofAvatar');
      expect(avatar).not.to.have.class(classes.colorDefault);
      expect(img).to.have.class(classes.img);
      expect(img).to.have.attribute('alt', 'Hello World!');
      expect(img).to.have.attribute('src', '/fake.png');
    });

    it('should be able to add more props to the image', () => {
      const onError = spy();
      const { container } = render(<Avatar src="/fake.png" slotProps={{ img: { onError } }} />);
      const img = container.querySelector('img');
      fireEvent.error(img);
      expect(onError.callCount).to.equal(1);
    });
  });

  describe('image avatar with unrendered children', () => {
    it('should render a div containing an img, not children', () => {
      const { container } = render(<Avatar src="/fake.png">MB</Avatar>);
      const avatar = container.firstChild;
      const imgs = container.querySelectorAll('img');
      expect(imgs.length).to.equal(1);
      expect(avatar).to.have.text('');
    });
  });

  describe('font icon avatar', () => {
    it('should render a div containing an font icon', () => {
      const { container } = render(
        <Avatar>
          <span className="my-icon-font" data-testid="icon">
            icon
          </span>
        </Avatar>,
      );
      const avatar = container.firstChild;
      const icon = avatar.firstChild;

      expect(avatar).to.have.tagName('div');
      expect(icon).to.have.tagName('span');
      expect(icon).to.have.class('my-icon-font');
      expect(icon).to.have.text('icon');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      const { container } = render(
        <Avatar className="my-avatar" data-my-prop="woofAvatar">
          <span>icon</span>
        </Avatar>,
      );
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.root);
      expect(avatar).to.have.class('my-avatar');
      expect(avatar).to.have.attribute('data-my-prop', 'woofAvatar');
    });

    it('should apply the colorNeutral class', () => {
      const { container } = render(
        <Avatar data-testid="avatar">
          <span>icon</span>
        </Avatar>,
      );
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.colorNeutral);
    });
  });

  describe('svg icon avatar', () => {
    it('should render a div containing an svg icon', () => {
      const container = render(
        <Avatar>
          <PersonIcon />
        </Avatar>,
      ).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.tagName('div');
      const personIcon = avatar.firstChild;
      expect(personIcon).to.have.attribute('data-testid', 'PersonIcon');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      const container = render(
        <Avatar className="my-avatar" data-my-prop="woofAvatar">
          <PersonIcon />
        </Avatar>,
      ).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.root);
      expect(avatar).to.have.class('my-avatar');
      expect(avatar).to.have.attribute('data-my-prop', 'woofAvatar');
    });

    it('should apply the colorNeutral class', () => {
      const container = render(
        <Avatar>
          <PersonIcon />
        </Avatar>,
      ).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.colorNeutral);
    });
  });

  describe('text avatar', () => {
    it('should render a div containing a string', () => {
      const container = render(<Avatar>OT</Avatar>).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.tagName('div');
      expect(avatar.firstChild).to.text('OT');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      const container = render(
        <Avatar className="my-avatar" data-my-prop="woofAvatar">
          OT
        </Avatar>,
      ).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.root);
      expect(avatar).to.have.class('my-avatar');
      expect(avatar).to.have.attribute('data-my-prop', 'woofAvatar');
    });

    it('should apply the colorNeutral class', () => {
      const container = render(<Avatar>OT</Avatar>).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.colorNeutral);
    });
  });

  describe('falsey avatar', () => {
    it('should render with defaultColor class when supplied with a child with falsey value', () => {
      const container = render(<Avatar>{0}</Avatar>).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.tagName('div');
      expect(avatar.firstChild).to.text('0');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      const container = render(
        <Avatar className="my-avatar" data-my-prop="woofAvatar">
          {0}
        </Avatar>,
      ).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.root);
      expect(avatar).to.have.class('my-avatar');
      expect(avatar).to.have.attribute('data-my-prop', 'woofAvatar');
    });

    it('should apply the colorNeutral class', () => {
      const container = render(<Avatar>{0}</Avatar>).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.colorNeutral);
    });
  });
});
