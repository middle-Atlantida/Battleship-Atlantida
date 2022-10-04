import React from 'react';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from 'components/ErrorBoundry';
import { ThemeSwitcher } from 'components/ThemeSwitcher';
import { store } from 'store';
import { ThemeProvider } from 'utils/theme';

import { Root } from './Root';
import { startServiceWorker } from './serviceWorker';

import './index.css';

const App = () => (
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ErrorBoundary>
                    <ThemeProvider>
                        <Root />
                        <ThemeSwitcher />
                    </ThemeProvider>
                </ErrorBoundary>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(<App />);

startServiceWorker();
