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
import CssBaseline from '@material-ui/core/CssBaseline';
import {lightGreen} from '@material-ui/core/colors';
import Composter from './component/Composter'
import PermancesList from './component/PermancesList'

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
    palette: {
        primary: lightGreen,
    },
    typography: {
        useNextVariants: true,
    },
    overrides: {
        MuiChip: {
            root: {
                marginTop: defaultTheme.spacing.unit,
                marginRight: defaultTheme.spacing.unit,
            }
        }
    }
});

class App extends React.Component {

    render() {

        return (
            <MuiThemeProvider theme={theme}>
                <div style={{maxWidth: "75em", margin:"2em auto", padding:"0 7%", boxSizing:"content-box"}}>
                    <CssBaseline />
                    <Composter />
                    <PermancesList />
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));