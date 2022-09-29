import React from 'react';

import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from 'components/ErrorBoundry';
import { store } from 'store';
import { theme } from 'utils/theme';

import { Root } from './Root';
import { startServiceWorker } from './serviceWorker';
import './index.css';

const App = () => (
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ErrorBoundary>
                    <StyledEngineProvider injectFirst>
                        <ThemeProvider theme={theme}>
                            <Root/>
                        </ThemeProvider>
                    </StyledEngineProvider>
                </ErrorBoundary>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(<App/>);

startServiceWorker();
