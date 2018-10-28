/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
import {CircularProgress} from "@material-ui/core"

require('../css/app.css');

import React from "react"
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {lightGreen} from '@material-ui/core/colors';
import Composter from './component/Composter'
import PermancesList from './component/PermancesList'
import { AppContext } from "./app-context"
import { superagent, apiRoot, handelError } from './utils/superagentWrapper'

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: lightGreen,
    },
    overrides: {
        MuiChip: {
            root: {
                marginTop: defaultTheme.spacing.unit,
                marginRight: defaultTheme.spacing.unit,
            }
        },
        MuiPaper :{
            root: {
                border: `2px solid ${lightGreen['500']}`,
                textAlign: "center",
                height: "100%"
            }
        }
    }
});

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedComposter: null,
            changeComposter: ( composterId ) => this.setContextComposter( composterId )
        };
    }

    setContextComposter( composterId ){

        this.setState({
            selectedComposter: null
        })

        superagent
            .get( `${apiRoot}/composters/${composterId}`)
            .then( ( response ) => {

                const body = handelError( response )
                if( body ){
                    this.setState({
                        selectedComposter: body
                    })
                }
            })
    }

    componentDidMount(){
        this.setContextComposter( '1' )
    }

    render() {

        return (
            <AppContext.Provider value={this.state}>
                <MuiThemeProvider theme={theme}>
                    <div style={{maxWidth: "75em", margin:"2em auto", padding:"0 7%", boxSizing:"content-box"}}>
                        <CssBaseline />
                        <Composter />
                        { this.state.selectedComposter &&
                            <PermancesList />
                        }
                    </div>
                </MuiThemeProvider>
            </AppContext.Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));