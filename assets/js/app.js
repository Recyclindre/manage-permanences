/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');

import React from "react"
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Composter from './component/Composter'
import PermancesList from './component/PermancesList'

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    }
});

class App extends React.Component {

    render() {

        return (
            <MuiThemeProvider theme={theme}>
                <Composter />
                <PermancesList />
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));