import { assert } from 'chai';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import {
  blue,
  deepOrange,
  green,
  indigo,
  lightBlue,
  lightGreen,
  pink,
  red,
  yellow,
} from '../colors';
import { darken, lighten } from './colorManipulator';
import createPalette, { dark, light } from './createPalette';

describe('createPalette()', () => {
  beforeEach(() => {
    consoleErrorMock.spy();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  it('should create a material design palette according to spec', () => {
    const palette = createPalette({});
    assert.strictEqual(
      palette.primary.main,
      indigo[500],
      'should use indigo[500] as the default primary main color',
    );
    assert.strictEqual(
      palette.primary.light,
      indigo[300],
      'should use indigo[300] as the default primary light color',
    );
    assert.strictEqual(
      palette.primary.dark,
      indigo[700],
      'should use indigo[700] as the default primary dark color',
    );
    assert.strictEqual(
      palette.primary.contrastText,
      dark.text.primary,
      'should use dark.text.primary as the default primary contrastText color',
    );
    assert.strictEqual(
      palette.secondary.main,
      pink.A400,
      'should use pink.A400 as the default secondary main color',
    );
    assert.strictEqual(
      palette.secondary.light,
      pink.A200,
      'should use pink.A200 as the default secondary light color',
    );
    assert.strictEqual(
      palette.secondary.dark,
      pink.A700,
      'should use pink.A700 as the default secondary dark color',
    );
    assert.strictEqual(
      palette.secondary.contrastText,
      dark.text.primary,
      'should use dark.text.primary as the default secondary contrastText color',
    );
    assert.strictEqual(
      palette.error.main,
      red[500],
      'should use red[500] as the default error main color',
    );
    assert.strictEqual(
      palette.error.light,
      red[300],
      'should use red[300] as the default error light color',
    );
    assert.strictEqual(
      palette.error.dark,
      red[700],
      'should use red[700] as the default error dark color',
    );
    assert.strictEqual(
      palette.warning.main,
      yellow[500],
      'should use yellow[500] as the default warning main color',
    );
    assert.strictEqual(
      palette.warning.light,
      yellow[300],
      'should use yellow[300] as the default warning light color',
    );
    assert.strictEqual(
      palette.warning.dark,
      yellow[700],
      'should use yellow[700] as the default warning dark color',
    );
    assert.strictEqual(
      palette.info.main,
      lightBlue[500],
      'should use lightBlue[500] as the default info main color',
    );
    assert.strictEqual(
      palette.info.light,
      lightBlue[300],
      'should use lightBlue[300] as the default info light color',
    );
    assert.strictEqual(
      palette.info.dark,
      lightBlue[700],
      'should use lightBlue[700] as the default info dark color',
    );
    assert.strictEqual(
      palette.success.main,
      green[500],
      'should use green[500] as the default success main color',
    );
    assert.strictEqual(
      palette.success.light,
      green[300],
      'should use green[300] as the default success light color',
    );
    assert.strictEqual(
      palette.success.dark,
      green[700],
      'should use green[700] as the default success dark color',
    );
    assert.strictEqual(
      palette.text,
      light.text,
      'should use light theme text for a light theme by default',
    );
  });

  it('should create a palette with Material colors', () => {
    const palette = createPalette({
      primary: deepOrange,
      secondary: green,
      error: pink,
    });
    assert.strictEqual(
      palette.primary.main,
      deepOrange[500],
      'should use deepOrange[500] as the primary main color',
    );
    assert.strictEqual(
      palette.primary.light,
      deepOrange[300],
      'should use deepOrange[300] as the primary light color',
    );
    assert.strictEqual(
      palette.primary.dark,
      deepOrange[700],
      'should use deepOrange[700] as the primary dark color',
    );
    assert.strictEqual(
      palette.secondary.main,
      green.A400,
      'should use green.A400 as the secondary main color',
    );
    assert.strictEqual(
      palette.secondary.light,
      green.A200,
      'should use green.A200 as the secondary light color',
    );
    assert.strictEqual(
      palette.secondary.dark,
      green.A700,
      'should use green.A700 as the secondary dark color',
    );
    assert.strictEqual(
      palette.error.main,
      pink[500],
      'should use pink[500] as the error main color',
    );
    assert.strictEqual(
      palette.error.light,
      pink[300],
      'should use pink[300] as the error light color',
    );
    assert.strictEqual(
      palette.error.dark,
      pink[700],
      'should use pink[700] as the error dark color',
    );
    assert.strictEqual(palette.text, light.text, 'should use light theme text');
  });

  it('should create a palette with custom colors', () => {
    const palette = createPalette({
      primary: {
        main: deepOrange[500],
        light: deepOrange[300],
        dark: deepOrange[700],
        contrastText: '#ffffff',
      },
      secondary: {
        main: green.A400,
        light: green.A200,
        dark: green.A700,
        contrastText: '#000000',
      },
      error: {
        main: pink[500],
        light: pink[300],
        dark: pink[700],
        contrastText: '#00ff00',
      },
      warning: {
        main: red[500],
        light: red[300],
        dark: red[700],
        contrastText: '#0000ff',
      },
      info: {
        main: blue[500],
        light: blue[300],
        dark: blue[700],
        contrastText: '#ff0000',
      },
      success: {
        main: lightGreen[500],
        light: lightGreen[300],
        dark: lightGreen[700],
        contrastText: '#ff00ff',
      },
    });
    assert.strictEqual(
      palette.primary.main,
      deepOrange[500],
      'should use deepOrange[500] as the primary main color',
    );
    assert.strictEqual(
      palette.primary.light,
      deepOrange[300],
      'should use deepOrange[300] as the primary light color',
    );
    assert.strictEqual(
      palette.primary.dark,
      deepOrange[700],
      'should use deepOrange[700] as the primary dark color',
    );
    assert.strictEqual(
      palette.primary.contrastText,
      '#ffffff',
      'should use #ffffff as the secondary contrastText color',
    );
    assert.strictEqual(
      palette.secondary.main,
      green.A400,
      'should use green.A400 as the secondary main color',
    );
    assert.strictEqual(
      palette.secondary.light,
      green.A200,
      'should use green.A200 as the secondary light color',
    );
    assert.strictEqual(
      palette.secondary.dark,
      green.A700,
      'should use green.A700 as the secondary dark color',
    );
    assert.strictEqual(
      palette.secondary.contrastText,
      '#000000',
      'should use #000000 as the secondary contrastText color',
    );
    assert.strictEqual(
      palette.error.main,
      pink[500],
      'should use pink[500] as the error main color',
    );
    assert.strictEqual(
      palette.error.light,
      pink[300],
      'should use pink[300] as the error light color',
    );
    assert.strictEqual(
      palette.error.dark,
      pink[700],
      'should use pink[700] as the error dark color',
    );
    assert.strictEqual(
      palette.error.contrastText,
      '#00ff00',
      'should use #00ff00 as the error contrastText color',
    );
    assert.strictEqual(
      palette.warning.main,
      red[500],
      'should use red[500] as the warning main color',
    );
    assert.strictEqual(
      palette.warning.light,
      red[300],
      'should use red[300] as the warning light color',
    );
    assert.strictEqual(
      palette.warning.dark,
      red[700],
      'should use red[700] as the warning dark color',
    );
    assert.strictEqual(
      palette.warning.contrastText,
      '#0000ff',
      'should use #0000ff as the warning contrastText color',
    );
    assert.strictEqual(palette.info.main, blue[500], 'should use blue[500] as the info main color');
    assert.strictEqual(
      palette.info.light,
      blue[300],
      'should use blue[300] as the info light color',
    );
    assert.strictEqual(palette.info.dark, blue[700], 'should use blue[700] as the info dark color');
    assert.strictEqual(
      palette.info.contrastText,
      '#ff0000',
      'should use #ff0000 as the info contrastText color',
    );
    assert.strictEqual(
      palette.success.main,
      lightGreen[500],
      'should use lightGreen[500] as the success main color',
    );
    assert.strictEqual(
      palette.success.light,
      lightGreen[300],
      'should use lightGreen[300] as the success light color',
    );
    assert.strictEqual(
      palette.success.dark,
      lightGreen[700],
      'should use lightGreen[700] as the success dark color',
    );
    assert.strictEqual(
      palette.success.contrastText,
      '#ff00ff',
      'should use #ff00ff as the success contrastText color',
    );
    assert.strictEqual(palette.text, light.text, 'should use light theme text');
  });

  it('should calculate light and dark colors if not provided', () => {
    const paletteOptions = {
      primary: { main: deepOrange[500] },
      secondary: { main: green.A400 },
      error: { main: pink[500] },
      warning: { main: red[500] },
      info: { main: blue[500] },
      success: { main: lightGreen[500] },
    };
    const palette = createPalette(paletteOptions);
    assert.deepEqual(
      paletteOptions,
      {
        primary: { main: deepOrange[500] },
        secondary: { main: green.A400 },
        error: { main: pink[500] },
        warning: { main: red[500] },
        info: { main: blue[500] },
        success: { main: lightGreen[500] },
      },
      'should not mutate createPalette argument',
    );
    assert.strictEqual(
      palette.primary.main,
      deepOrange[500],
      'should use deepOrange[500] as the primary main color',
    );
    assert.strictEqual(
      palette.primary.light,
      lighten(deepOrange[500], 0.2),
      'should use lighten(deepOrange[500], 0.2) as the primary light color',
    );
    assert.strictEqual(
      palette.primary.dark,
      darken(deepOrange[500], 0.3),
      'should use darken(deepOrange[500], 0.3) as the primary dark color',
    );
    assert.strictEqual(
      palette.secondary.main,
      green.A400,
      'should use green.A400 as the secondary main color',
    );
    assert.strictEqual(
      palette.secondary.light,
      lighten(green.A400, 0.2),
      'should use lighten(green.A400, 0.2) as the secondary light color',
    );
    assert.strictEqual(
      palette.secondary.dark,
      darken(green.A400, 0.3),
      'should use darken(green.A400, 0.3) as the secondary dark color',
    );
    assert.strictEqual(
      palette.error.main,
      pink[500],
      'should use pink[500] as the error main color',
    );
    assert.strictEqual(
      palette.error.light,
      lighten(pink[500], 0.2),
      'should use lighten(pink[500], 0.2) as the error light color',
    );
    assert.strictEqual(
      palette.error.dark,
      darken(pink[500], 0.3),
      'should use darken(pink[500], 0.3) as the error dark color',
    );
    assert.strictEqual(
      palette.warning.main,
      red[500],
      'should use red[500] as the warning main color',
    );
    assert.strictEqual(
      palette.warning.light,
      lighten(red[500], 0.2),
      'should use lighten(red[500], 0.2) as the warning light color',
    );
    assert.strictEqual(
      palette.warning.dark,
      darken(red[500], 0.3),
      'should use darken(red[500], 0.3) as the warning dark color',
    );
    assert.strictEqual(palette.info.main, blue[500], 'should use blue[500] as the info main color');
    assert.strictEqual(
      palette.info.light,
      lighten(blue[500], 0.2),
      'should use lighten(blue[500], 0.2) as the info light color',
    );
    assert.strictEqual(
      palette.info.dark,
      darken(blue[500], 0.3),
      'should use darken(blue[500], 0.3) as the info dark color',
    );
    assert.strictEqual(
      palette.success.main,
      lightGreen[500],
      'should use lightGreen[500] as the success main color',
    );
    assert.strictEqual(
      palette.success.light,
      lighten(lightGreen[500], 0.2),
      'should use lighten(lightGreen[500], 0.2) as the success light color',
    );
    assert.strictEqual(
      palette.success.dark,
      darken(lightGreen[500], 0.3),
      'should use darken(lightGreen[500], 0.3) as the success dark color',
    );
  });

  it('should calculate light and dark colors using the provided tonalOffset', () => {
    const palette = createPalette({
      primary: { main: deepOrange[500] },
      secondary: { main: green.A400 },
      error: { main: red[500] },
      warning: { main: yellow[500] },
      info: { main: lightBlue[500] },
      success: { main: green[500] },
      tonalOffset: 0.1,
    });
    // primary
    assert.strictEqual(
      palette.primary.main,
      deepOrange[500],
      'should use deepOrange[500] as the primary main color',
    );
    assert.strictEqual(
      palette.primary.light,
      lighten(deepOrange[500], 0.1),
      'should use lighten(deepOrange[500], 0.1) as the primary light color',
    );
    assert.strictEqual(
      palette.primary.dark,
      darken(deepOrange[500], 0.15),
      'should use darken(deepOrange[500], 0.1) as the primary dark color',
    );
    // secondary
    assert.strictEqual(
      palette.secondary.main,
      green.A400,
      'should use green.A400 as the secondary main color',
    );
    assert.strictEqual(
      palette.secondary.light,
      lighten(green.A400, 0.1),
      'should use lighten(green.A400, 0.1) as the secondary light color',
    );
    assert.strictEqual(
      palette.secondary.dark,
      darken(green.A400, 0.15),
      'should use darken(green.A400, 0.1) as the secondary dark color',
    );
    // error
    assert.strictEqual(palette.error.main, red[500], 'should use red[500] as the error main color');
    assert.strictEqual(
      palette.error.light,
      lighten(red[500], 0.1),
      'should use lighten(red[500], 0.1) as the error light color',
    );
    assert.strictEqual(
      palette.error.dark,
      darken(red[500], 0.15),
      'should use darken(red[500], 0.1) as the error dark color',
    );
    // warning
    assert.strictEqual(
      palette.warning.main,
      yellow[500],
      'should use yellow[500] as the warning main color',
    );
    assert.strictEqual(
      palette.warning.light,
      lighten(yellow[500], 0.1),
      'should use lighten(yellow[500], 0.1) as the warning light color',
    );
    assert.strictEqual(
      palette.warning.dark,
      darken(yellow[500], 0.15),
      'should use darken(yellow[500], 0.1) as the warning dark color',
    );
    // info
    assert.strictEqual(
      palette.info.main,
      lightBlue[500],
      'should use lightBlue[500] as the info main color',
    );
    assert.strictEqual(
      palette.info.light,
      lighten(lightBlue[500], 0.1),
      'should use lighten(lightBlue[500], 0.1) as the info light color',
    );
    assert.strictEqual(
      palette.info.dark,
      darken(lightBlue[500], 0.15),
      'should use darken(lightBlue[500], 0.1) as the info dark color',
    );
    // success
    assert.strictEqual(
      palette.success.main,
      green[500],
      'should use green[500] as the success main color',
    );
    assert.strictEqual(
      palette.success.light,
      lighten(green[500], 0.1),
      'should use lighten(green[500], 0.1) as the success light color',
    );
    assert.strictEqual(
      palette.success.dark,
      darken(green[500], 0.15),
      'should use darken(green[500], 0.1) as the success dark color',
    );
  });

  it('should calculate contrastText using the provided contrastThreshold', () => {
    const palette = createPalette({ contrastThreshold: 7 });
    assert.strictEqual(
      palette.primary.contrastText,
      light.text.primary,
      'should use dark.text.primary as the default primary contrastText color',
    );
    assert.strictEqual(
      palette.secondary.contrastText,
      light.text.primary,
      'should use dark.text.primary as the default secondary contrastText color',
    );
  });

  it('should create a dark palette', () => {
    const palette = createPalette({ type: 'dark' });
    assert.strictEqual(
      palette.primary.main,
      indigo[500],
      'should use indigo as the default primary color',
    );
    assert.strictEqual(
      palette.secondary.main,
      pink.A400,
      'should use pink as the default secondary color',
    );
    assert.strictEqual(palette.text, dark.text, 'should use dark theme text');
    assert.strictEqual(consoleErrorMock.callCount(), 0);
  });

  it('logs an error when an invalid type is specified', () => {
    createPalette({ type: 'foo' });
    assert.strictEqual(consoleErrorMock.callCount(), 1);
    assert.match(
      consoleErrorMock.args()[0][0],
      /Material-UI: the palette type `foo` is not supported/,
    );
  });
  describe('augmentColor', () => {
    const palette = createPalette({});

    it('should throw when the input is invalid', () => {
      assert.throws(() => {
        palette.augmentColor({});
      }, /The color object needs to have a/);
    });

    it('should accept a color', () => {
      const color1 = palette.augmentColor({ ...indigo });
      assert.deepEqual(
        {
          main: color1.main,
          light: color1.light,
          dark: color1.dark,
          contrastText: color1.contrastText,
        },
        {
          dark: '#303f9f',
          light: '#7986cb',
          main: '#3f51b5',
          contrastText: '#fff',
        },
      );
      const color2 = palette.augmentColor({ ...indigo }, 400, 200, 600);
      assert.deepEqual(
        {
          light: color2.light,
          main: color2.main,
          dark: color2.dark,
          contrastText: color2.contrastText,
        },
        {
          light: '#9fa8da',
          main: '#5c6bc0',
          dark: '#3949ab',
          contrastText: '#fff',
        },
      );
    });

    it('should accept a partial palette color', () => {
      const color = palette.augmentColor({
        main: indigo[500],
      });
      assert.deepEqual(
        {
          light: color.light,
          main: color.main,
          dark: color.dark,
          contrastText: color.contrastText,
        },
        {
          light: 'rgb(101, 115, 195)',
          main: '#3f51b5',
          dark: 'rgb(44, 56, 126)',
          contrastText: '#fff',
        },
      );
    });
  });

  describe('getContrastText', () => {
    it('throws an exception with a falsy argument', () => {
      const { getContrastText } = createPalette({});

      [
        [undefined, 'missing background argument in getContrastText(undefined)'],
        [null, 'missing background argument in getContrastText(null)'],
        ['', 'missing background argument in getContrastText()'],
        [0, 'missing background argument in getContrastText(0)'],
      ].forEach(testEntry => {
        const [argument, errorMessage] = testEntry;

        assert.throws(() => getContrastText(argument), errorMessage);
      });
    });

    it('logs an error when the contrast ratio does not reach AA', () => {
      const { getContrastText } = createPalette({
        contrastThreshold: 0,
      });

      getContrastText('#fefefe');

      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(
        consoleErrorMock.args()[0][0],
        'falls below the WCAG recommended absolute minimum contrast ratio of 3:1',
      );
    });
  });

  it('should create a palette with unique object references', () => {
    const redPalette = createPalette({ background: { paper: 'red' } });
    const bluePalette = createPalette({ background: { paper: 'blue' } });
    assert.notStrictEqual(redPalette, bluePalette);
    assert.notStrictEqual(redPalette.background, bluePalette.background);
  });
});
