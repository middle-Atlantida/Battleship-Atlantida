import React from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from 'pages/Root';
import { theme } from 'utils/theme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import './index.css';
import { ErrorBoundary } from 'components/ErrorBoundry';

const App = () => (
    <React.StrictMode>
        <ErrorBoundary>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <Root/>
                </ThemeProvider>
            </StyledEngineProvider>
        </ErrorBoundary>
    </React.StrictMode>
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(<App />);
