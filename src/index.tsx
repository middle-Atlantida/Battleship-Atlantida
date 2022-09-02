import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { theme } from 'utils/theme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'components/ErrorBoundry';
import { configureStore } from 'store/store';
import { Root } from './Root';
import { startServiceWorker } from './serviceWorker';
import './index.css';

const store = configureStore();

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
