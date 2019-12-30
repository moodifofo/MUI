import React from 'react';
import { expect } from 'chai';
import { stub, spy } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';
import Rating from './Rating';
import Star from '../internal/svg-icons/Star';

describe('<Rating />', () => {
  let mount;
  const render = createClientRender();
  let classes;
  const defaultProps = {
    name: 'rating-test',
    value: 2,
  };

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<Rating {...defaultProps} />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Rating {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));

  it('should render', () => {
    const { container } = render(<Rating {...defaultProps} />);

    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should round the value to the provided precision', () => {
    const { container, getByLabelText } = render(
      <Rating {...defaultProps} value={3.9} precision={0.2} />,
    );
    const input = getByLabelText('4 Stars');
    const checked = container.querySelector('input[name="rating-test"]:checked');
    expect(input).to.equal(checked);
    expect(input.value).to.equal('4');
  });

  it('should handle mouse hover correctly', () => {
    const { container } = render(<Rating {...defaultProps} />);
    stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
      left: 0,
      right: 100,
    }));
    stub(container.firstChild.firstChild, 'getBoundingClientRect').callsFake(() => ({
      width: 20,
    }));
    fireEvent.mouseMove(container.firstChild, {
      clientX: 19,
    });
    expect(container.querySelectorAll(`.${classes.iconHover}`).length).to.equal(1);
    fireEvent.mouseMove(container.firstChild, {
      clientX: 21,
    });
    expect(container.querySelectorAll(`.${classes.iconHover}`).length).to.equal(2);
  });

  describe('prop: IconContainerComponent', () => {
    it('should render with custom icons', () => {
      function IconContainer() {
        return (
          <span>
            <Star />
          </span>
        );
      }
      const { container } = render(
        <Rating name="custom-icon-set" value={1} max={5} IconContainerComponent={IconContainer} />,
      );
      expect(container.querySelectorAll(`.${classes.label}`).length).to.equal(5);
    });
  });

  it('should clear the rating', () => {
    const handleChange = spy();
    const { getByLabelText } = render(<Rating {...defaultProps} onChange={handleChange} />);

    const input = getByLabelText('2 Stars');
    fireEvent.click(input, {
      clientX: 1,
    });

    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.deep.equal(null);
  });

  it('should select the rating', () => {
    const handleChange = spy();
    const { getByLabelText } = render(<Rating {...defaultProps} onChange={handleChange} />);

    const input = getByLabelText('3 Stars');
    fireEvent.click(input);

    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.deep.equal(3);
  });

  it('should select the empty input if value is null', () => {
    const { container, getByLabelText } = render(<Rating {...defaultProps} value={null} />);
    const input = getByLabelText('Empty');
    const checked = container.querySelector('input[name="rating-test"]:checked');
    expect(input).to.equal(checked);
    expect(input.value).to.equal('');
  });
});
