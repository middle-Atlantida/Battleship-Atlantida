import { createTheme } from '@mui/material/styles';

import { Theme } from '../lib/ThemeContext';
import { baseColors, baseTheme } from './baseTheme';

export const lightTheme = {
    name: Theme.LIGHT,
    theme: createTheme(baseTheme, {
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
            },
        },
        typography: {
            h1: {
                color: baseColors.text.inverted,
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        input: {
                            borderColor: baseColors.text.primary,
                        },
                    },
                },
            },
        },
    }),
};
