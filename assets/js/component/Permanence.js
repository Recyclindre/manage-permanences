import React, {Fragment} from "react"
import Typography from '@material-ui/core/Typography';
import {Avatar, Card, CardContent, Chip, Grid } from "@material-ui/core"
import Gravatar from "react-gravatar"
import Grow from '@material-ui/core/Grow';

class Permance extends React.Component {

    render() {
        const { per } = this.props

        const toLocaleStringOptions = {weekday: "long", day: "numeric", hour: "2-digit", minute: "2-digit"};

        return (
            <Grow in>
                <Grid item xs={6} sm={4} md={3} >
                    <Card>
                        <CardContent>
                            <Typography gutterBottom>
                                {new Date(per.date).toLocaleString('fr-FR', toLocaleStringOptions)}
                            </Typography>
                            {
                                per.canceled ?
                                    <Chip
                                        label="Annulé"
                                    />
                                    :
                                    per.openers.length > 0 ?
                                        per.openers.map(user => (

                                            <Chip
                                                key={user['@id']}
                                                avatar={<Avatar component={Gravatar} email={user.email}/>}
                                                label={user.username}
                                                color="primary"
                                                //onDelete={}
                                            />

                                        )) :
                                        <Chip
                                            label="Personne encore"
                                            color="secondary"
                                            //onClick={handleClick}
                                        />
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grow>
        )
    }
}

export default Permance