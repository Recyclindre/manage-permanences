import React, {Fragment} from "react"
import Typography from '@material-ui/core/Typography';



class Composter extends React.Component {

    render() {

        return (
                <Fragment>
                    <Typography component="h1" variant="h3" gutterBottom>Recyclindre</Typography>
                    <Typography component="p" gutterBottom>Les permanences ont lieu de 18h30 à 19h00 le jeudi et le 11h30 à 12h00 le samedi</Typography>
                </Fragment>
            )
    }
}

export default Composter