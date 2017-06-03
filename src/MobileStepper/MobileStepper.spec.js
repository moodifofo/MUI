// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import MobileStepper, { styleSheet } from './MobileStepper';
import Button from '../Button/Button';
import KeyboardArrowLeft from '../svg-icons/keyboard-arrow-left';
import KeyboardArrowRight from '../svg-icons/keyboard-arrow-right';
import { LinearProgress } from '../Progress';

describe('<MobileStepper />', () => {
  let shallow;
  let classes;
  const defaultProps = {
    steps: 2,
    onBack: () => {},
    onNext: () => {},
  };

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a Paper component', () => {
    const wrapper = shallow(<MobileStepper {...defaultProps} />);
    assert.strictEqual(wrapper.name(), 'withStyles(Paper)');
    assert.strictEqual(wrapper.props().elevation, 0, 'should have no elevation');
  });
  it('should render with the mobileStepper class', () => {
    const wrapper = shallow(<MobileStepper {...defaultProps} />);
    assert.strictEqual(
      wrapper.hasClass(classes.mobileStepper),
      true,
      'should have the mobileStepper class',
    );
  });
  it('should render the custom className and the mobileStepper class', () => {
    const wrapper = shallow(<MobileStepper className="test-class-name" {...defaultProps} />);
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should pass the test className');
    assert.strictEqual(
      wrapper.hasClass(classes.mobileStepper),
      true,
      'should have the mobileStepper class',
    );
  });
  it('should render two buttons', () => {
    const wrapper = shallow(<MobileStepper {...defaultProps} />);
    assert.lengthOf(wrapper.find(Button), 2, 'should render two buttons');
  });
  it('should render a <Button /> as the 1st child with a <KeyboardArrowLeft /> component', () => {
    const wrapper = shallow(<MobileStepper {...defaultProps} />);
    const backButton = wrapper.childAt(0);
    assert.lengthOf(
      backButton.find(KeyboardArrowLeft),
      1,
      'should render a single <KeyboardArrowLeft /> component',
    );
  });
  it('should render a <Button /> as the 3rd child with a <KeyboardArrowRight /> component', () => {
    const wrapper = shallow(<MobileStepper {...defaultProps} />);
    const nextButton = wrapper.childAt(2);
    assert.lengthOf(
      nextButton.find(KeyboardArrowRight),
      1,
      'should render a single <KeyboardArrowRight /> component',
    );
  });
  it('should disable the back button if prop disableBack is passed', () => {
    const wrapper = shallow(<MobileStepper disableBack {...defaultProps} />);
    const backButton = wrapper.childAt(0);
    assert.strictEqual(backButton.prop('disabled'), true, 'should disable the back button');
  });
  it('should disable the next button if prop disableNext is passed', () => {
    const wrapper = shallow(<MobileStepper disableNext {...defaultProps} />);
    const nextButton = wrapper.childAt(2);
    assert.strictEqual(nextButton.prop('disabled'), true, 'should disable the next button');
  });
  it('should render just two buttons when supplied with kind text', () => {
    const wrapper = shallow(<MobileStepper kind="text" {...defaultProps} />);
    assert.lengthOf(wrapper.children(), 2, 'should render exactly two children');
  });
  it('should render dots when supplied with kind dots', () => {
    const wrapper = shallow(<MobileStepper kind="dots" {...defaultProps} />);
    assert.lengthOf(wrapper.children(), 3, 'should render exactly three children');
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.dots),
      true,
      'should have a single dots class',
    );
  });
  it('should render a dot for each step when using dots kind', () => {
    const wrapper = shallow(<MobileStepper kind="dots" {...defaultProps} />);
    assert.lengthOf(wrapper.find(`.${classes.dot}`), 2, 'should render exactly two dots');
  });
  it('should render the first dot as active if activeStep is not set', () => {
    const wrapper = shallow(<MobileStepper kind="dots" {...defaultProps} />);
    assert.strictEqual(
      wrapper.childAt(1).childAt(0).hasClass(classes.dotActive),
      true,
      'should render the first dot active',
    );
  });
  it('should honour the activeStep prop', () => {
    const wrapper = shallow(<MobileStepper kind="dots" activeStep={1} {...defaultProps} />);
    assert.strictEqual(
      wrapper.childAt(1).childAt(1).hasClass(classes.dotActive),
      true,
      'should render the second dot active',
    );
  });
  it('should render a <LinearProgress /> when supplied with kind progress', () => {
    const wrapper = shallow(<MobileStepper kind="progress" {...defaultProps} />);
    assert.lengthOf(wrapper.find(LinearProgress), 1, 'should render a <LinearProgress />');
  });
  it('should calculate the <LinearProgress /> value correctly', () => {
    const props = {
      onBack: defaultProps.onBack,
      onNext: defaultProps.onNext,
    };
    let wrapper = shallow(<MobileStepper kind="progress" steps={3} {...props} />);
    let linearProgressProps = wrapper.find(LinearProgress).props();
    assert.strictEqual(linearProgressProps.value, 0, 'should set <LinearProgress /> value to 0');

    wrapper = shallow(<MobileStepper kind="progress" steps={3} activeStep={1} {...props} />);
    linearProgressProps = wrapper.find(LinearProgress).props();
    assert.strictEqual(linearProgressProps.value, 50, 'should set <LinearProgress /> value to 50');

    wrapper = shallow(<MobileStepper kind="progress" steps={3} activeStep={2} {...props} />);
    linearProgressProps = wrapper.find(LinearProgress).props();
    assert.strictEqual(
      linearProgressProps.value,
      100,
      'should set <LinearProgress /> value to 100',
    );
  });
});
