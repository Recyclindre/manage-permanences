import React, {Fragment} from "react"
import Typography from '@material-ui/core/Typography';
import {Avatar, Card, CardContent, Chip, Grid } from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles'
import Gravatar from "react-gravatar"
import Grow from '@material-ui/core/Grow';
import * as moment from 'moment'

const styles = theme => ({
    emptyCard: {
        borderColor: theme.palette.secondary.main,
    },
    pastCard: {
        borderColor: theme.palette.grey['300'],
        backgroundColor: theme.palette.grey['300'],
    },
    canceledCard: {
        borderColor: theme.palette.grey['300'],
    },
    pastChip: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
    }
})

class Permance extends React.Component {

    render() {
        const { per, classes } = this.props

        // Vide, annulé ou passé
        let cardStyle = ''
        let chipStyle = ''
        if( moment( per.date ).isBefore() ){
            cardStyle = 'pastCard'
            chipStyle = 'pastChip'
        } else if( per.canceled ){
            cardStyle = 'canceledCard'
        } else if( per.openers.length === 0 ){
            cardStyle = 'emptyCard'
        }
        return (
            <Grow in>
                <Grid item xs={6} sm={4} md={3} >
                    <Card elevation={0} className={classes[ cardStyle ]}>
                        <CardContent>
                            <Typography style={{textTransform:"uppercase", fontWeight:"500"}} >
                                {moment(per.date).format('dddd D')}
                            </Typography>
                            <Typography gutterBottom style={{fontWeight:"500"}} >
                                {moment(per.date).format("HH[h]mm")}
                            </Typography>
                            {
                                per.canceled ?
                                    <Chip
                                        label="Annulé"
                                        className={classes[ chipStyle ]}
                                    />
                                    :
                                    per.openers.length > 0 ?
                                        per.openers.map(user => (

                                            <Chip
                                                key={user['@id']}
                                                avatar={<Avatar component={Gravatar} email={user.email}/>}
                                                label={user.username}
                                                color="primary"
                                                className={classes[ chipStyle ]}
                                                //onDelete={}
                                            />

                                        )) :
                                        <Chip
                                            label="Pas d‘ouvreur"
                                            color="secondary"
                                            className={classes[ chipStyle ]}
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

export default withStyles(styles)(Permance)