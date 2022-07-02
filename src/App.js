import react from 'react';

//Redux
import { useSelector } from 'react-redux';

//Components, styles
import Dashboard from './pages/dashboard.js';
import Login from './pages/login';
import './App.css';

//MUI
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1024,
            lg: 1280,
            xl: 1920,
        },
    },
});

function App() {
    //Get access token from store
    const access_token = useSelector((state) => state.user.access_token);

    return (
        <ThemeProvider theme={theme}>
            <div className='App'>
                {access_token ? <Dashboard /> : <Login />}
            </div>
        </ThemeProvider>
    );
}

export default App;
