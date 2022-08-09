import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from 'pages/Root';
import theme from 'utils/theme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
    <React.StrictMode>
        <BrowserRouter>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <Root/>
                </ThemeProvider>
            </StyledEngineProvider>
        </BrowserRouter>
    </React.StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root'));
