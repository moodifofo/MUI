import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Checkbox from 'checkbox';
import injectTheme from './fixtures/inject-theme';


describe('Checkbox', () => {
  const CHECKMARK_PATH = 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z';
  let ThemedCheckbox;


  beforeEach(() => {
    ThemedCheckbox = injectTheme(Checkbox);
  });


  it('should display checkmark when checked by default', () => {
    let render = TestUtils.renderIntoDocument(<ThemedCheckbox defaultChecked={true} />);
    let input = TestUtils.findRenderedDOMComponentWithTag(render, 'input');
    let svgs = TestUtils.scryRenderedDOMComponentsWithTag(render, 'svg');
    let checkMarkNode = svgs[1].getDOMNode();

    expect(input.getDOMNode().hasAttribute('checked')).to.be.true;
    expect(checkMarkNode.style.opacity).to.equal('1');
    expect(checkMarkNode.firstChild.getAttribute('d')).to.equal(CHECKMARK_PATH);
  });


  it('should NOT display checkmark when not checked by default', () => {
    let render = TestUtils.renderIntoDocument(<ThemedCheckbox defaultChecked={false} />);
    let input = TestUtils.findRenderedDOMComponentWithTag(render, 'input');
    let svgs = TestUtils.scryRenderedDOMComponentsWithTag(render, 'svg');
    let checkMarkNode = svgs[1].getDOMNode();

    expect(input.getDOMNode().hasAttribute('checked')).to.be.false;
    expect(checkMarkNode.style.opacity).to.equal('0');
    expect(checkMarkNode.firstChild.getAttribute('d')).to.equal(CHECKMARK_PATH);
  });


  describe('when initially unchecked', () => {
    let renderedCheckbox;


    beforeEach(() => {
      renderedCheckbox = TestUtils.renderIntoDocument(<ThemedCheckbox defaultChecked={false} />);
    });


    it('should display checkmark when clicked once', () => {
      let input = TestUtils.findRenderedDOMComponentWithTag(renderedCheckbox, 'input');
      let inputNode = input.getDOMNode();
      inputNode.checked = !inputNode.checked;
      TestUtils.Simulate.change(input);

      let svgs = TestUtils.scryRenderedDOMComponentsWithTag(renderedCheckbox, 'svg');
      let checkMarkNode = svgs[1].getDOMNode();
      expect(checkMarkNode.style.opacity).to.equal('1');
      expect(checkMarkNode.firstChild.getAttribute('d')).to.equal(CHECKMARK_PATH);
    });


    it('should NOT display checkmark when clicked twice', () => {
      let input = TestUtils.findRenderedDOMComponentWithTag(renderedCheckbox, 'input');
      let inputNode = input.getDOMNode();
      // Simulate events
      inputNode.checked = !inputNode.checked;
      TestUtils.Simulate.change(input);
      inputNode.checked = !inputNode.checked;
      TestUtils.Simulate.change(input);

      let svgs = TestUtils.scryRenderedDOMComponentsWithTag(renderedCheckbox, 'svg');
      let checkMarkNode = svgs[1].getDOMNode();
      expect(checkMarkNode.style.opacity).to.equal('0');
      expect(checkMarkNode.firstChild.getAttribute('d')).to.equal(CHECKMARK_PATH);
    });
  });
});
