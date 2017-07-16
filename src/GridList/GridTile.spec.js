// @flow weak

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import GridTile from './GridTile';

describe('<GridTile />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  const tileData = {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  };

  it('should render a div', () => {
    const testChildren = <img src={tileData.img} alt="foo" />;
    const wrapper = shallow(
      <GridTile>
        {testChildren}
      </GridTile>,
    );
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should render a ul', () => {
    const testChildren = <img src={tileData.img} alt="foo" />;
    const wrapper = shallow(
      <GridTile component="li">
        {testChildren}
      </GridTile>,
    );
    assert.strictEqual(wrapper.name(), 'li');
  });

  describe('prop: children', () => {
    it('should render children by default', () => {
      const testChildren = <img src={tileData.img} alt="foo" />;
      const wrapper = shallow(
        <GridTile>
          {testChildren}
        </GridTile>,
      );

      assert.strictEqual(
        wrapper.containsMatchingElement(testChildren),
        true,
        'should contain the children',
      );
    });
  });

  describe('prop: className', () => {
    it('should renders className', () => {
      const testChildren = <img src={tileData.img} alt="foo" />;
      const wrapper = shallow(
        <GridTile className="foo">
          {testChildren}
        </GridTile>,
      );

      assert.strictEqual(wrapper.hasClass('foo'), true, 'should contain the className');
    });
  });
});
