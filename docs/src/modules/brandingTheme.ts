import { deepmerge } from '@mui/utils';
import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded';
import { createTheme, ThemeOptions, Theme } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}

  interface Palette {
    primaryDark: PaletteColor;
  }
}

declare module '@mui/material/styles/createTypography' {
  interface TypographyOptions {
    fontWeightExtraBold?: number;
    fontFamilyCode?: string;
  }

  interface Typography {
    fontWeightExtraBold: number;
    fontFamilyCode: string;
  }
}

// TODO: enable this once types conflict is fixed
// declare module '@mui/material/Button' {
//   interface ButtonPropsVariantOverrides {
//     code: true;
//   }
// }

const defaultTheme = createTheme();

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  main: '#007FFF',
  500: '#007FFF',
  600: '#0072E5', // vs blueDark 900: WCAG 4.6 AAA (large), APCA 36 Not for reading text
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};
export const blueDark = {
  50: '#E2EDF8',
  100: '#CEE0F3',
  200: '#91B9E3',
  300: '#5090D3',
  main: '#5090D3',
  400: '#265D97',
  500: '#1E4976',
  600: '#173A5E',
  700: '#132F4C', // contrast 13.64:1
  800: '#001E3C',
  900: '#0A1929',
};
const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7', // vs blueDark 900: WCAG 11.6 AAA, APCA 78 Best for text
  400: '#B2BAC2', // vs blueDark 900: WCAG 9 AAA, APCA 63.3 Ok for text
  500: '#A0AAB4', // vs blueDark 900: WCAG 7.5 AAA, APCA 54.3 Only for large text
  600: '#6F7E8C', // vs white bg: WCAG 4.1 AA, APCA 68.7 Ok for text
  700: '#3E5060', // vs white bg: WCAG 8.3 AAA, APCA 88.7 Best for text
  800: '#2D3843', // vs white bg: WCAG 11.9 AAA, APCA 97.3 Best for text
  900: '#1A2027',
};
// context on the Advanced Perceptual Contrast Algorithm (APCA) used above here: https://github.com/w3c/wcag/issues/695

const systemFont = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

export const getMetaThemeColor = (mode: 'light' | 'dark') => {
  const themeColor = {
    light: grey[50],
    dark: blueDark[800],
  };
  return themeColor[mode];
};

export const getDesignTokens = (mode: 'light' | 'dark') =>
  ({
    palette: {
      primary: {
        ...blue,
        ...(mode === 'dark' && {
          main: blue[400],
        }),
      },
      divider: mode === 'dark' ? blueDark[700] : grey[100],
      primaryDark: blueDark,
      mode,
      ...(mode === 'dark' && {
        background: {
          default: blueDark[800],
          paper: blueDark[900],
        },
      }),
      common: {
        black: '#1D1D1D',
      },
      ...(mode === 'light' && {
        text: {
          primary: grey[900],
          secondary: grey[700],
        },
      }),
      ...(mode === 'dark' && {
        text: {
          primary: '#fff',
          secondary: grey[400],
        },
      }),
      grey,
      error: {
        50: '#FFF0F1',
        100: '#FFDBDE',
        200: '#FFBDC2',
        300: '#FF99A2',
        400: '#FF7A86',
        500: '#FF505F',
        main: '#EB0014', // contrast 4.63:1
        600: '#EB0014',
        700: '#C70011',
        800: '#94000D',
        900: '#570007',
      },
      success: {
        50: '#E9FBF0',
        100: '#C6F6D9',
        200: '#9AEFBC',
        300: '#6AE79C',
        400: '#3EE07F',
        500: '#21CC66',
        600: '#1DB45A',
        ...(mode === 'dark' && {
          main: '#1DB45A', // contrast 6.17:1 (blueDark.800)
        }),
        ...(mode === 'light' && {
          main: '#1AA251', // contrast 3.31:1
        }),
        700: '#1AA251',
        800: '#178D46',
        900: '#0F5C2E',
      },
      warning: {
        50: '#FFF9EB',
        100: '#FFF3C1',
        200: '#FFECA1',
        300: '#FFDC48', // vs blueDark900: WCAG 10.4 AAA, APCA 72 Ok for text
        400: '#F4C000', // vs blueDark900: WCAG 6.4 AA normal, APCA 48 Only large text
        500: '#DEA500', // vs blueDark900: WCAG 8 AAA normal, APCA 58 Only large text
        600: '#D18E00', // vs blueDark900: WCAG 6.4 AA normal, APCA 48 Only large text
        main: '#AB6800',
        700: '#AB6800', // vs white bg: WCAG 4.4 AA large, APCA 71 Ok for text
        800: '#8C5800', // vs white bg: WCAG 5.9 AAA large, APCA 80 Best for text
        900: '#5A3600', // vs white bg: WCAG 10.7 AAA, APCA 95 Best for text
      },
    },
    shape: {
      borderRadius: 10,
    },
    spacing: 10,
    typography: {
      fontFamily: ['"IBM Plex Sans"', ...systemFont].join(','),
      fontFamilyCode: [
        'Consolas',
        'Menlo',
        'Monaco',
        'Andale Mono',
        'Ubuntu Mono',
        'monospace',
      ].join(','),
      fontFamilyTagline: ['"PlusJakartaSans-ExtraBold"', ...systemFont].join(','),
      fontFamilySystem: systemFont.join(','),
      fontWeightExtraBold: 800,
      h1: {
        fontFamily: ['"PlusJakartaSans-ExtraBold"', ...systemFont].join(','),
        fontSize: 'clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)',
        fontWeight: 800,
        lineHeight: 78 / 70,
        ...(mode === 'light' && {
          color: blueDark[900],
        }),
      },
      h2: {
        fontFamily: ['"PlusJakartaSans-ExtraBold"', ...systemFont].join(','),
        fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
        fontWeight: 800,
        lineHeight: 44 / 36,
        color: mode === 'dark' ? grey[100] : blueDark[700],
      },
      h3: {
        fontFamily: ['"PlusJakartaSans-Bold"', ...systemFont].join(','),
        fontSize: defaultTheme.typography.pxToRem(36),
        lineHeight: 44 / 36,
        letterSpacing: 0.2,
      },
      h4: {
        fontFamily: ['"PlusJakartaSans-Bold"', ...systemFont].join(','),
        fontSize: defaultTheme.typography.pxToRem(28),
        lineHeight: 42 / 28,
        letterSpacing: 0.2,
      },
      h5: {
        fontFamily: ['"PlusJakartaSans-Bold"', ...systemFont].join(','),
        fontSize: defaultTheme.typography.pxToRem(24),
        lineHeight: 36 / 24,
        letterSpacing: 0.1,
        color: mode === 'dark' ? blue[300] : blue.main,
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(20),
        lineHeight: 30 / 20,
      },
      button: {
        textTransform: 'initial',
        fontWeight: 700,
        letterSpacing: 0,
      },
      subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(18),
        lineHeight: 24 / 18,
        letterSpacing: 0,
        fontWeight: 500,
      },
      body1: {
        fontSize: defaultTheme.typography.pxToRem(16), // 16px
        lineHeight: 24 / 16,
        letterSpacing: 0,
      },
      body2: {
        fontSize: defaultTheme.typography.pxToRem(14), // 14px
        lineHeight: 21 / 14,
        letterSpacing: 0,
      },
      caption: {
        display: 'inline-block',
        fontSize: defaultTheme.typography.pxToRem(12), // 12px
        lineHeight: 18 / 12,
        letterSpacing: 0,
        fontWeight: 700,
      },
    },
  } as ThemeOptions);

export function getThemedComponents(theme: Theme) {
  return {
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          sizeLarge: {
            padding: '1rem 1.25rem',
            ...theme.typography.body1,
            lineHeight: 21 / 16,
            fontWeight: 700,
          },
          containedPrimary: {
            backgroundColor: theme.palette.primary[500],
            color: '#fff',
          },
        },
        variants: [
          {
            props: { variant: 'code' },
            style: {
              color:
                theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[800],
              border: '1px solid',
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[400]
                  : theme.palette.grey[200],
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.grey[50],
              ...theme.typography.body2,
              fontFamily: theme.typography.fontFamilyCode,
              fontWeight: 600,
              WebkitFontSmoothing: 'subpixel-antialiased',
              '&:hover, &.Mui-focusVisible': {
                borderColor: theme.palette.primary.main,
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[600]
                    : theme.palette.primary[50],
                '& .MuiButton-endIcon': {
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary[300]
                      : theme.palette.primary.main,
                },
              },
              '& .MuiButton-startIcon': {
                color: theme.palette.grey[400],
              },
              '& .MuiButton-endIcon': {
                color:
                  theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[700],
              },
            },
          },
        ],
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            [theme.breakpoints.up('md')]: {
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[700]
                : theme.palette.grey[100],
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: {
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primary[400]
                : theme.palette.primary[600],
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            '&.MuiTypography-body1 > svg': {
              marginTop: 2,
            },
            '& svg:last-child': {
              marginLeft: 2,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          outlined: {
            color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.grey[900],
            backgroundColor: 'transparent',
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[600]
                : theme.palette.grey[300],
          },
          filled: {
            fontWeight: 400,
            border: '1px solid transparent',
            color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary[700],
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[500]
                : theme.palette.primary[100],
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[600]
                  : theme.palette.primary[200],
            },
          },
          deleteIcon: {
            color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary[700],
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 5,
            '&:hover, &:focus': {
              backgroundColor: theme.palette.mode === 'dark' ? '' : theme.palette.grey[100],
            },
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: ArrowDropDownRounded,
        },
        styleOverrides: {
          iconFilled: {
            top: 'calc(50% - .25em)',
          },
        },
      },
      MuiTab: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor:
              theme.palette.mode === 'dark' ? theme.palette.primaryDark[900] : '#fff',
            '&[href]': {
              textDecorationLine: 'none',
            },
          },
          outlined: {
            display: 'block',
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[400]
                : theme.palette.grey[200],
            ...(theme.palette.mode === 'dark' && {
              backgroundColor: theme.palette.primaryDark[700],
            }),
            'a&, button&': {
              '&:hover': {
                boxShadow: '1px 1px 20px 0 rgb(90 105 120 / 20%)',
              },
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: theme.spacing(1, 2),
            borderColor: theme.palette.divider,
          },
          head: {
            color: theme.palette.text.primary,
            fontWeight: 700,
          },
          body: {
            color: theme.palette.text.secondary,
          },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            backgroundColor:
              theme.palette.mode === 'dark' ? theme.palette.primaryDark[900] : '#fff',
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 700,
            color:
              theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[700],
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[500]
                : theme.palette.grey[200],
            '&.Mui-selected': {
              color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary[500],
              borderColor:
                theme.palette.mode === 'dark'
                  ? `${theme.palette.primary[700]} !important`
                  : `${theme.palette.primary[500]} !important`,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.primary[50],
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[600]
                    : theme.palette.primary[100],
              },
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            paddingTop: 7,
            paddingBottom: 7,
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 32,
            height: 20,
            padding: 0,
            '& .MuiSwitch-switchBase': {
              '&.Mui-checked': {
                transform: 'translateX(11px)',
                color: '#fff',
              },
            },
          },
          switchBase: {
            height: 20,
            width: 20,
            padding: 0,
            color: '#fff',
            '&.Mui-checked + .MuiSwitch-track': {
              opacity: 1,
            },
          },
          track: {
            opacity: 1,
            borderRadius: 32,
            backgroundColor:
              theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400],
          },
          thumb: {
            flexShrink: 0,
            width: '14px',
            height: '14px',
          },
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 700,
            color:
              theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[700],
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[500]
                : theme.palette.grey[200],
            '&.Mui-selected': {
              color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary[500],
              borderColor:
                theme.palette.mode === 'dark'
                  ? `${theme.palette.primary[700]} !important`
                  : `${theme.palette.primary[500]} !important`,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.primary[50],
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[600]
                    : theme.palette.primary[100],
              },
            },
          },
        },
      },
      MuiCssBaseline: {
        defaultProps: {
          enableColorScheme: true,
        },
      },
    },
  };
}

const darkTheme = createTheme(getDesignTokens('dark'));
export const brandingDarkTheme = deepmerge(darkTheme, getThemedComponents(darkTheme));
