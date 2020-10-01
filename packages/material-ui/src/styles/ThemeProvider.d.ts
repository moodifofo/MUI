import { DefaultTheme } from '@material-ui/styles';

export interface ThemeProviderProps<Theme = DefaultTheme> {
  children?: React.ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
}

/**
 * It makes the `theme` available down the React tree.
 * This component should preferably be used at **the root of your component tree**.
 * API:
 *
 * - [ThemeProvider API](https://material-ui.com/api/theme-provider/)
 */
export default function ThemeProvider<T = DefaultTheme>(
  props: ThemeProviderProps<T>
): React.ReactElement<ThemeProviderProps<T>>;
