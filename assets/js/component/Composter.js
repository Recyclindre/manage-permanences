import React, {Fragment} from "react"
import { Typography, CircularProgress } from '@material-ui/core';
import { AppContext } from '../app-context';

class Composter extends React.Component {

    render() {
        let appContext = this.context;

        return (
            appContext.selectedComposter ?
                <Fragment>
                    <Typography component="h1" variant="h3" gutterBottom>{appContext.selectedComposter.name}</Typography>
                    <Typography component="p" gutterBottom>{appContext.selectedComposter.description}</Typography>
                </Fragment>
                :
                <CircularProgress />

            )
    }
}
Composter.contextType = AppContext;

export default Composter