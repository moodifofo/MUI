import { styled } from '@mui/material/styles';

const GradientText = styled('span')<{
  color?: 'primary' | 'error' | 'success' | 'warning';
}>(({ theme, color = 'primary' }) => ({
  ...(!theme.vars
    ? {
        background:
          theme.palette.mode === 'dark'
            ? theme.palette.primary.main
            : `linear-gradient(to right, ${theme.palette[color].main}, ${theme.palette[color][700]})`,
      }
    : {
        background: `linear-gradient(to right, ${theme.palette[color].main}, ${theme.palette[color][700]})`,
        [theme.getColorSchemeSelector('dark')]: {
          backgorund: theme.vars.palette.primary.main,
        },
      }),
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

export default GradientText;
