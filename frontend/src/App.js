/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import './App.css';

import React, {Fragment} from "react"
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {lightGreen} from '@material-ui/core/colors'
import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core'
import HelpPage from './component/HelpPage'
import Composter from './component/Composter'
import { AppContext } from "./app-context"
import { superagent, apiRoot, handelError } from './utils/superagentWrapper'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Help from '@material-ui/icons/Help'

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
                    <CssBaseline />
                    <Router>
                        <Fragment>
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography variant="h6" color="inherit" style={{flexGrow:"1", textAlign: "left"}} component={Link} to="/">
                                        Compost‘heures
                                    </Typography>
                                    <IconButton color="inherit" component={Link} to="/aide/">
                                        <Help color="inherit"/>
                                    </IconButton>
                                    <Tooltip title="Bientôt ;-)">
                                        <IconButton color="inherit">
                                            <AccountCircle color="inherit"/>
                                        </IconButton>
                                    </Tooltip>
                                </Toolbar>
                            </AppBar>
                            <div style={{maxWidth: "75em", margin:"2em auto", padding:"0 7%", boxSizing:"content-box"}}>
                                <Route path="/" exact component={Composter} />
                                <Route path="/aide/" component={HelpPage} />
                            </div>
                        </Fragment>
                    </Router>
                </MuiThemeProvider>
            </AppContext.Provider>
        );
    }
}


export default App