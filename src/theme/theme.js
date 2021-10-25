import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#9c27b0',
    },
  },
  overrides: {
    MuiDialog: {
      paperWidthSm: {
        maxWidth: 'none',
      },
    },
  },
});

export default theme;
