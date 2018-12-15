import React, {Fragment} from "react"
import PermancesList from './PermancesList';
import { AppContext } from '../app-context';
import ComposterStats from './ComposterStats';
import {Tabs, Tab, Typography, LinearProgress} from "@material-ui/core"
import Markdown from '../utils/Markdown'

class ComposterPermanencesListe extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            openedTab: 0,
        };
    }

    handleChange(event, openedTab) {
        this.setState({ openedTab });
    };

    render() {
        let { openedTab } = this.state;
        let appContext = this.context;

        return (
            <Fragment>
                { appContext.selectedComposter ?
                    <Fragment>

                        <Typography component="h1" variant="h3" gutterBottom>{appContext.selectedComposter.name}</Typography>

                        <Tabs
                            value={openedTab}
                            onChange={ ( event, openedTab ) => this.handleChange( event, openedTab )}
                            indicatorColor="primary"
                            style={{marginBottom:'2em'}}
                        >
                            <Tab label="Permanences" />
                            <Tab label="Informations" />
                            <Tab label="Stats" />
                        </Tabs>

                        { openedTab === 0 &&
                            <Fragment>
                                <Markdown source={appContext.selectedComposter.short_description} />

                                <PermancesList />
                            </Fragment>

                        }
                        { openedTab === 1 &&
                            <Fragment>
                                { appContext.selectedComposter.address &&
                                    <Fragment>
                                        <Typography component="h2" variant="h6">Adresse du composter</Typography>
                                        <Markdown source={appContext.selectedComposter.address} />
                                    </Fragment>
                                }
                                <Typography component="h2" variant="h6">Informations</Typography>
                                <Markdown source={appContext.selectedComposter.description} />
                            </Fragment>
                        }
                        { openedTab === 2 &&
                            <ComposterStats />
                        }

                    </Fragment>
                    :
                    <LinearProgress/>
                }
            </Fragment>

        )
    }
}
ComposterPermanencesListe.contextType = AppContext;

export default ComposterPermanencesListe