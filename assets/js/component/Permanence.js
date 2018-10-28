import React, {Fragment} from "react"
import Typography from '@material-ui/core/Typography';
import {Avatar, Card, CardContent, Chip, Grid } from "@material-ui/core"
import Gravatar from "react-gravatar"
import Grow from '@material-ui/core/Grow';
import * as moment from 'moment'

class Permance extends React.Component {

    render() {
        const { per } = this.props

        return (
            <Grow in>
                <Grid item xs={6} sm={4} md={3} >
                    <Card>
                        <CardContent>
                            <Typography gutterBottom>
                                {moment(per.date).format('dddd D à HH:mm')}
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