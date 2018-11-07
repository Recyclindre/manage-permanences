import React, {Fragment} from "react"
import PermancesList from './PermancesList';
import { AppContext } from '../app-context';
import {Tabs, Tab, Typography, CircularProgress} from "@material-ui/core"
import Markdown from '../utils/Markdown'

class ComposterPermanencesListe extends React.Component {

    constructor() {
        super();

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
                            indicatorColor="primary">
                            <Tab label="Permanences" />
                            <Tab label="Informations" />
                        </Tabs>

                        { openedTab === 0 &&
                            <Fragment>
                                <Typography component="p" gutterBottom>{appContext.selectedComposter.description}</Typography>

                                <PermancesList />
                            </Fragment>

                        }
                        { openedTab === 1 && <Markdown source={appContext.selectedComposter.description} />}

                    </Fragment>
                    :
                    <CircularProgress/>
                }
            </Fragment>

        )
    }
}
ComposterPermanencesListe.contextType = AppContext;

export default ComposterPermanencesListe