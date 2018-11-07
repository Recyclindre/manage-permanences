import React, {Fragment} from "react"
import {Typography} from "@material-ui/core"

class HelpPage extends React.Component {

    render() {

        return (
            <Fragment>
                <Typography component="h1" variant="h3" gutterBottom>Aide</Typography>
                <Typography component="p" gutterBottom>Vous trouverez ici de l‘aide sur l‘utilisation de l‘App</Typography>
            </Fragment>

        )
    }
}

export default HelpPage