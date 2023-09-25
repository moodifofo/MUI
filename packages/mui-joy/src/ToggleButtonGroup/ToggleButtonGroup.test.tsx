import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, describeConformance, screen } from '@mui-internal/test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import ToggleButtonGroup, { toggleButtonGroupClasses as classes } from '@mui/joy/ToggleButtonGroup';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';

describe('<ToggleButtonGroup />', () => {
  const { render } = createRenderer();

  describeConformance(<ToggleButtonGroup />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyToggleButtonGroup',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['classesRoot', 'componentsProp', 'themeVariants'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('renders a `group`', () => {
    const { queryByRole } = render(<ToggleButtonGroup aria-label="my group" />);

    expect(queryByRole('group', { name: 'my group' })).not.to.equal(null);
  });

  it('should disable all ToggleButton if disabled prop is passed', () => {
    render(
      <ToggleButtonGroup disabled>
        <Button value="one">1</Button>
        <IconButton value="two">2</IconButton>
      </ToggleButtonGroup>,
    );
    const [firstButton, secondButton] = screen.getAllByRole('button');
    expect(firstButton).to.have.property('disabled', true);
    expect(secondButton).to.have.property('disabled', true);
  });

  it('[exclusive] should render a selected ToggleButton if value is selected', () => {
    const { getAllByRole } = render(
      <ToggleButtonGroup value="one">
        <Button value="one">1</Button>
        <IconButton value="two">1</IconButton>
      </ToggleButtonGroup>,
    );

    expect(getAllByRole('button')[0]).to.have.attribute('aria-pressed', 'true');
    expect(getAllByRole('button')[1]).to.have.attribute('aria-pressed', 'false');
  });

  it('[non-exclusive] should render a selected ToggleButton if value is selected', () => {
    const { getAllByRole } = render(
      <ToggleButtonGroup value={['one', 'two']}>
        <Button value="one">1</Button>
        <IconButton value="two">1</IconButton>
      </ToggleButtonGroup>,
    );

    const buttons = getAllByRole('button');
    expect(buttons[0]).to.have.attribute('aria-pressed', 'true');
    expect(buttons[1]).to.have.attribute('aria-pressed', 'true');
  });

  describe('prop: onChange', () => {
    describe('exclusive', () => {
      it('passed value should be null when current value is toggled off', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup value="one" onChange={handleChange}>
            <Button value="one">One</Button>
            <IconButton value="two">Two</IconButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.equal(null);
      });

      it('should be a single value when value is toggled on', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup onChange={handleChange}>
            <Button value="one">One</Button>
            <IconButton value="two">Two</IconButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.equal('one');
      });

      it('should be a single value when a new value is toggled on', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup value="one" onChange={handleChange}>
            <Button value="one">One</Button>
            <IconButton value="two">Two</IconButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[1].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.equal('two');
      });
    });

    describe('non exclusive', () => {
      it('should be an empty array when current value is toggled off', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup value={['one']} onChange={handleChange}>
            <Button value="one">One</Button>
            <IconButton value="two">Two</IconButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.deep.equal([]);
      });

      it('should be an array with a single value when value is toggled on', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup value={[]} onChange={handleChange}>
            <Button value="one">One</Button>
            <IconButton value="two">Two</IconButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.have.members(['one']);
      });

      it('should be an array with a single value when a secondary value is toggled off', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup value={['one', 'two']} onChange={handleChange}>
            <Button value="one">One</Button>
            <IconButton value="two">Two</IconButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.have.members(['two']);
      });

      it('should be an array of all selected values when a second value is toggled on', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup value={['one']} onChange={handleChange}>
            <Button value="one">One</Button>
            <IconButton value="two">Two</IconButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[1].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.have.members(['one', 'two']);
      });
    });
  });
});
