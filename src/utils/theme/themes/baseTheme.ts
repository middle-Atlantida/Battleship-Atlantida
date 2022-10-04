import { createTheme } from '@mui/material/styles';

export const baseColors = {
    text: {
        primary: '#222222',
        secondary: 'rgba(34,34,34,0.8)',
        disabled: 'rgba(34,34,34,0.6)',
        hint: 'rgba(34,34,34,0.6)',
        inverted: '#ffffff',
    },
    link: {
        primary: '#7e83ff',
        secondary: '#ffffff',
    },
    background: {
        light: '#fafafa',
        dark: '#252735',
    },
    paper: {
        light: '#fafafa',
        dark: '#252735',
    },
    primary: '#7e83ff',
    secondary: '#f16858',
};

export const baseTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: baseColors.primary,
        },
        error: {
            main: baseColors.secondary,
        },
        divider: baseColors.text.hint,
        text: {
            primary: baseColors.text.primary,
            secondary: baseColors.text.secondary,
        },
        background: {
            default: baseColors.background.light,
            paper: baseColors.paper.light,
        },
    },
    typography: {
        fontFamily: 'Inter',
        h1: {
            fontSize: 24,
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: baseColors.text.inverted,
        },
        body1: {
            fontSize: 16,
            color: baseColors.text.primary,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '20px 40px',
                    height: '50px',
                    borderRadius: '25px',
                    border: `solid 2px ${baseColors.text.primary}`,
                    fontWeight: 'bold',
                    color: baseColors.text.inverted,
                },
                outlined: {
                    color: baseColors.text.inverted,
                    border: `solid 2px ${baseColors.text.inverted}`,
                    ':hover': {
                        border: `solid 2px ${baseColors.text.inverted}`,
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    input: {
                        borderBottom: '2px solid',
                        borderColor: baseColors.text.primary,
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    border: `4px solid ${baseColors.text.primary}`,
                    padding: '50px',
                    borderRadius: '5px',
                    backdropFilter: 'blur(4px)',
                },
            },
        },
    },
});
