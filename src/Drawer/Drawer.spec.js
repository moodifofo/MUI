import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import ReactDOM from 'react-dom';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import Slide from '../transitions/Slide';
import createMuiTheme from '../styles/createMuiTheme';
import Paper from '../Paper';
import Modal from '../Modal';
import Drawer, { isHorizontal, getAnchor } from './Drawer';

describe('<Drawer />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(
      <Drawer>
        <div />
      </Drawer>,
    );
  });

  after(() => {
    mount.cleanUp();
  });

  describe('prop: variant=temporary', () => {
    it('should render a Modal', () => {
      const wrapper = shallow(
        <Drawer>
          <div />
        </Drawer>,
      );
      assert.strictEqual(wrapper.type(), Modal);

      // temporary drawers need to be unmounted in the tests to remove the touchstart event handler
      wrapper.unmount();
    });

    it('should render Slide > Paper inside the Modal', () => {
      const wrapper = shallow(
        <Drawer>
          <div />
        </Drawer>,
      );

      const slide = wrapper.childAt(0);
      assert.strictEqual(
        slide.length === 1 && slide.is(Slide),
        true,
        'immediate wrapper child should be Slide',
      );

      const paper = slide.childAt(0);
      assert.strictEqual(paper.length === 1 && paper.type(), Paper);
      assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the paper class');

      wrapper.unmount();
    });

    describe('transitionDuration property', () => {
      const transitionDuration = {
        enter: 854,
        exit: 2967,
      };

      it('should be passed to Slide', () => {
        const wrapper = shallow(
          <Drawer transitionDuration={transitionDuration}>
            <div />
          </Drawer>,
        );
        assert.strictEqual(wrapper.find(Slide).props().timeout, transitionDuration);
        wrapper.unmount();
      });

      it("should be passed to to Modal's BackdropTransitionDuration when open=true", () => {
        const wrapper = shallow(
          <Drawer open transitionDuration={transitionDuration}>
            <div />
          </Drawer>,
        );
        assert.strictEqual(
          wrapper.find(Modal).props().BackdropProps.transitionDuration,
          transitionDuration,
        );
        wrapper.unmount();
      });
    });

    it("should override Modal's BackdropTransitionDuration from property when specified", () => {
      const testDuration = 335;
      const wrapper = shallow(
        <Drawer BackdropTransitionDuration={testDuration}>
          <div />
        </Drawer>,
      );
      assert.strictEqual(wrapper.find(Modal).props().BackdropTransitionDuration, testDuration);
      wrapper.unmount();
    });

    it('should set the custom className for Modal when variant is temporary', () => {
      const wrapper = shallow(
        <Drawer className="woofDrawer" variant="temporary">
          <h1>Hello</h1>
        </Drawer>,
      );

      const modal = wrapper.find(Modal);

      assert.strictEqual(modal.hasClass('woofDrawer'), true, 'should have the woofDrawer class');
      wrapper.unmount();
    });

    it('should set the Paper className', () => {
      const wrapper = shallow(
        <Drawer classes={{ paper: 'woofDrawer' }}>
          <h1>Hello</h1>
        </Drawer>,
      );
      const paper = wrapper.find(Paper);
      assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the paper class');
      assert.strictEqual(paper.hasClass('woofDrawer'), true, 'should have the woofDrawer class');
      wrapper.unmount();
    });

    it('should be closed by default', () => {
      const wrapper = shallow(
        <Drawer>
          <h1>Hello</h1>
        </Drawer>,
      );

      const modal = wrapper;
      const slide = modal.find(Slide);

      assert.strictEqual(modal.props().open, false, 'should not show the modal');
      assert.strictEqual(slide.props().in, false, 'should not transition in');
      wrapper.unmount();
    });

    describe('opening and closing', () => {
      let wrapper;

      before(() => {
        wrapper = shallow(
          <Drawer>
            <h1>Hello</h1>
          </Drawer>,
        );
        wrapper.update();
      });

      after(() => {
        wrapper.unmount();
      });

      it('should start closed', () => {
        assert.strictEqual(wrapper.props().open, false, 'should not show the modal');
        assert.strictEqual(wrapper.find(Slide).props().in, false, 'should not transition in');
      });

      it('should open', () => {
        wrapper.setProps({ open: true });
        assert.strictEqual(wrapper.props().open, true, 'should show the modal');
        assert.strictEqual(wrapper.find(Slide).props().in, true, 'should transition in');
      });

      it('should close', () => {
        wrapper.setProps({ open: false });
        assert.strictEqual(wrapper.props().open, false, 'should not show the modal');
        assert.strictEqual(wrapper.find(Slide).props().in, false, 'should not transition in');
      });
    });
  });

  describe('prop: variant=persistent', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Drawer variant="persistent">
          <h1>Hello</h1>
        </Drawer>,
      );
    });

    it('should render a div instead of a Modal when persistent', () => {
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.docked), true, 'should have the docked class');
    });

    it('should render Slide > Paper inside the div', () => {
      const slide = wrapper.childAt(0);
      assert.strictEqual(slide.length, 1);
      assert.strictEqual(slide.type(), Slide);

      const paper = slide.childAt(0);
      assert.strictEqual(paper.length === 1 && paper.type(), Paper);
    });
  });

  describe('prop: variant=permanent', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Drawer variant="permanent">
          <h1>Hello</h1>
        </Drawer>,
      );
    });

    it('should render a div instead of a Modal when permanent', () => {
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.docked), true, 'should have the docked class');
    });

    it('should render div > Paper inside the div', () => {
      const slide = wrapper;
      assert.strictEqual(slide.length, 1);
      assert.strictEqual(slide.name(), 'div');

      const paper = slide.childAt(0);
      assert.strictEqual(paper.length === 1 && paper.type(), Paper);
    });
  });

  describe('slide direction', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Drawer>
          <div />
        </Drawer>,
      );
    });

    after(() => {
      wrapper.unmount();
    });

    it('should return the opposing slide direction', () => {
      wrapper.setProps({ anchor: 'left' });
      assert.strictEqual(wrapper.find(Slide).props().direction, 'right');

      wrapper.setProps({ anchor: 'right' });
      assert.strictEqual(wrapper.find(Slide).props().direction, 'left');

      wrapper.setProps({ anchor: 'top' });
      assert.strictEqual(wrapper.find(Slide).props().direction, 'down');

      wrapper.setProps({ anchor: 'bottom' });
      assert.strictEqual(wrapper.find(Slide).props().direction, 'up');
    });
  });

  describe('Right To Left', () => {
    let wrapper;

    before(() => {
      const theme = createMuiTheme({
        direction: 'rtl',
      });
      wrapper = shallow(
        <Drawer theme={theme}>
          <div />
        </Drawer>,
      );
    });

    after(() => {
      wrapper.unmount();
    });

    it('should switch left and right anchor when theme is right-to-left', () => {
      wrapper.setProps({ anchor: 'left' });
      // slide direction for left is right, if left is switched to right, we should get left
      assert.strictEqual(wrapper.find(Slide).props().direction, 'left');

      wrapper.setProps({ anchor: 'right' });
      // slide direction for right is left, if right is switched to left, we should get right
      assert.strictEqual(wrapper.find(Slide).props().direction, 'right');
    });
  });
});

describe('isHorizontal', () => {
  it('should recognize left and right as horizontal swiping directions', () => {
    assert.strictEqual(isHorizontal({ anchor: 'left' }), true);
    assert.strictEqual(isHorizontal({ anchor: 'right' }), true);
    assert.strictEqual(isHorizontal({ anchor: 'top' }), false);
    assert.strictEqual(isHorizontal({ anchor: 'bottom' }), false);
  });
});
