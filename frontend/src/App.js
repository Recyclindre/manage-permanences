/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import './App.css'

import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { lightGreen, blue } from '@material-ui/core/colors'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip
} from '@material-ui/core'
import HelpPage from './component/HelpPage'
import Composter from './component/Composter'
import { AppContext } from './app-context'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Help from '@material-ui/icons/Help'
import Api from './utils/Api'

import { ReactComponent as Logo } from './svg/logo.svg'

const defaultTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: lightGreen,
    blue: blue
  },
  overrides: {
    MuiChip: {
      root: {
        marginTop: defaultTheme.spacing.unit,
        marginRight: defaultTheme.spacing.unit
      }
    },
    MuiPaper: {
      root: {
        textAlign: 'center',
        height: '100%'
      }
    }
  }
})

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedComposter: null,
      changeComposter: composterId => this.setContextComposter(composterId)
    }
  }

  async setContextComposter(composterId) {
    this.setState({
      selectedComposter: null
    })

    const selectedComposter = await Api.getComposter(composterId)
    if (selectedComposter.status === 200) {
      this.setState({
        selectedComposter: selectedComposter.data
      })
    }
  }

  componentDidMount() {
    this.setContextComposter('1')
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
                  <Typography
                    variant="h6"
                    color="inherit"
                    style={{
                      flexGrow: '1',
                      textAlign: 'left',
                      textDecoration: 'none'
                    }}
                    component={Link}
                    to="/"
                  >
                    <Logo
                      style={{
                        width: 50,
                        height: 50,
                        verticalAlign: 'middle',
                        marginRight: '.5em'
                      }}
                    />
                    <span>Compost'heur</span>
                  </Typography>
                  <IconButton color="inherit" component={Link} to="/aide/">
                    <Help color="inherit" />
                  </IconButton>
                  <Tooltip title="Bientôt ;-)">
                    <IconButton color="inherit">
                      <AccountCircle color="inherit" />
                    </IconButton>
                  </Tooltip>
                </Toolbar>
              </AppBar>
              <div
                style={{
                  maxWidth: '75em',
                  margin: '2em auto',
                  padding: '0 7%',
                  boxSizing: 'content-box'
                }}
              >
                <Route path="/" exact component={Composter} />
                <Route path="/aide/" component={HelpPage} />
              </div>
            </Fragment>
          </Router>
        </MuiThemeProvider>
      </AppContext.Provider>
    )
  }
}

export default App
