import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Breadcrumbs, { breadcrumbsClasses as classes } from '@mui/joy/Breadcrumbs';
import { unstable_capitalize as capitalize } from '@mui/utils';

describe('<Breadcrumbs />', () => {
  const { render } = createRenderer();

  describeConformance(<Breadcrumbs />, () => ({
    classes,
    inheritComponent: 'nav',
    render,
    ThemeProvider,
    muiName: 'JoyBreadcrumbs',
    refInstanceof: window.HTMLElement,
    testVariantProps: { variant: 'solid' },
    skip: ['classesRoot', 'componentProp', 'componentsProp', 'themeDefaultProps'],
  }));

  describe('prop: size', () => {
    it('md by default', () => {
      const { getByTestId } = render(<Breadcrumbs data-testid="root" />);

      expect(getByTestId('root')).to.have.class(classes.sizeMd);
    });
    ['sm', 'md', 'lg'].forEach((size) => {
      it(`should render ${size}`, () => {
        const { getByTestId } = render(<Breadcrumbs data-testid="root" size={size} />);

        expect(getByTestId('root')).to.have.class(classes[`size${capitalize(size)}`]);
      });
    });
  });
});
