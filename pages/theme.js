import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#eee',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      ex: 300,
      sm: 700,
      md: 1024,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
