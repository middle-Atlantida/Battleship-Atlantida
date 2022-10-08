import { ReactNode, useMemo, useState } from 'react';

import {
    CssBaseline,
    StyledEngineProvider,
    ThemeProvider as MUIThemeProvider,
} from '@mui/material';

import { darkTheme, lightTheme } from '../themes';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

type ThemeProviderProps = {
    children?: ReactNode;
};

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    return (
        <ThemeContext.Provider value={defaultProps}>
            <StyledEngineProvider injectFirst>
                <MUIThemeProvider theme={theme === Theme.DARK ? darkTheme.theme : lightTheme.theme}>
                    <CssBaseline />
                    {children}
                </MUIThemeProvider>
            </StyledEngineProvider>
        </ThemeContext.Provider>
    );
};
