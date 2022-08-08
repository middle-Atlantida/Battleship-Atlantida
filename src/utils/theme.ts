import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#7e83ff',
        },
        error: {
            main: '#f16858',
        },
        divider: '#222222',
        text: {
            primary: '#222222',
            secondary: '#222222',
        },
    },
    typography: {
        fontFamily: 'Inter',
    },
});

export default theme;
