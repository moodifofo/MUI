import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import { extendTheme, useTheme, CssVarsProvider } from '@mui/joy/styles';

describe('extendTheme', () => {
  it('the output contains required fields', () => {
    const result = extendTheme();
    Object.keys(result).forEach((field) => {
      expect([
        'breakpoints',
        'components',
        'colorSchemes',
        'focus',
        'fontSize',
        'fontFamily',
        'fontWeight',
        'letterSpacing',
        'lineHeight',
        'getCssVar',
        'spacing',
        'radius',
        'shadow',
        'typography',
        'colorInversionConfig',
        'variants',
        'cssVarPrefix',
        'unstable_sxConfig',
        'unstable_sx',
      ]).to.includes(field);
    });
  });

  it('should have joy default css var prefix', () => {
    const theme = extendTheme();
    expect(theme.cssVarPrefix).to.equal('joy');
    expect(theme.typography.body1.fontSize).to.equal('var(--joy-fontSize-md)');
  });

  it('should have custom css var prefix', () => {
    const theme = extendTheme({ cssVarPrefix: 'foo' });
    expect(theme.cssVarPrefix).to.equal('foo');
    expect(theme.typography.body1.fontSize).to.equal('var(--foo-fontSize-md)');
  });

  it('should have no css var prefix', () => {
    const theme = extendTheme({ cssVarPrefix: '' });
    expect(theme.cssVarPrefix).to.equal('');
    expect(theme.typography.body1.fontSize).to.equal('var(--fontSize-md)');
  });

  describe('theme.unstable_sx', () => {
    let originalMatchmedia;
    const { render } = createRenderer();
    const storage = {};
    beforeEach(() => {
      originalMatchmedia = window.matchMedia;
      // Create mocks of localStorage getItem and setItem functions
      Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: (key) => storage[key],
          setItem: (key, value) => {
            storage[key] = value;
          },
        },
        configurable: true,
      });
      window.matchMedia = () => ({
        addListener: () => {},
        removeListener: () => {},
      });
    });
    afterEach(() => {
      window.matchMedia = originalMatchmedia;
    });
    
    const theme = extendTheme({
      colorSchemes: {
        light: {
          palette: {
            primary: {
              500: 'rgb(0, 0, 255)',
            },
          },
        },
      },
    });

    it('bgcolor', () => {
      let styles = {};

      const Test = () => {
        const theme = useTheme();
        styles = theme.unstable_sx({ bgcolor: 'primary.500' });
        return null;
      };

      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Test />
        </CssVarsProvider>,
      );

      expect(styles).to.deep.equal({
        backgroundColor: 'var(--joy-palette-primary-500)',
      });
    });

    it('borderRadius', () => {
      let styles = {};

      const Test = () => {
        const theme = useTheme();
        styles = theme.unstable_sx({ borderRadius: 'md' });
        return null;
      };

      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Test />
        </CssVarsProvider>,
      );

      expect(styles).to.deep.equal({
        borderRadius: 'var(--joy-radius-md)',
      });
    });
  });
});
