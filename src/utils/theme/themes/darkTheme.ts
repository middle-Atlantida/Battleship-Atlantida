import { createTheme } from '@mui/material/styles';

import { Theme } from '../lib/ThemeContext';
import { baseColors, baseTheme } from './baseTheme';

export const darkTheme = {
    name: Theme.DARK,
    theme: createTheme(baseTheme, {
        palette: {
            mode: 'dark',
            primary: {
                main: baseColors.primary,
            },
            error: {
                main: baseColors.secondary,
            },
            divider: baseColors.text.hint,
            text: {
                primary: baseColors.text.inverted,
                secondary: baseColors.text.hint,
            },
            background: {
                default: baseColors.background.dark,
                paper: baseColors.background.dark,
            },
        },
        typography: {
            h1: {
                color: baseColors.text.inverted,
            },
            body1: {
                color: baseColors.text.inverted,
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        input: {
                            color: baseColors.text.inverted,
                            borderColor: baseColors.text.inverted,
                        },
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderColor: baseColors.text.inverted,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderColor: baseColors.text.inverted,
                    },
                },
            },
        },
    }),
};
