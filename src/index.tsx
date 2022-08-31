import React from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from 'pages/Root';
import { theme } from 'utils/theme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'components/ErrorBoundry';
import { Provider } from 'react-redux';
import { configureStore } from 'store/store';

const store = configureStore();

const App = () => (
    <React.StrictMode>
        <BrowserRouter>
            <ErrorBoundary>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <Root/>
                    </ThemeProvider>
                </StyledEngineProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </React.StrictMode>
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App/>
    </Provider>,
);
