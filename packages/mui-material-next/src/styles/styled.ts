import { createStyled } from '@mui/system';
import { Theme } from './Theme.types';
import defaultTheme from './defaultTheme';

const styled = createStyled<Theme>({ defaultTheme });

export default styled;
