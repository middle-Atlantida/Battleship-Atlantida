import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from 'pages/Root';
import theme from 'utils/theme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import './index.css';

const App = () => (
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Root/>
            </ThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root'));
