import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from 'pages/Root';
import theme from 'utils/theme';
import { ThemeProvider } from '@mui/material';
import './index.css';

const App = () => (
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Root/>
        </ThemeProvider>
    </React.StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root'));
