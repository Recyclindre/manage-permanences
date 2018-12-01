import React, { Fragment } from "react"
import Typography from '@material-ui/core/Typography';
import {Avatar, Card, CardContent, Chip, Grid, Dialog, DialogTitle,DialogContent, Button} from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles'
import Gravatar from "react-gravatar"
import Grow from '@material-ui/core/Grow';
import * as moment from 'moment'
import Markdown from "../utils/Markdown"

const styles = theme => ({
    okCard: {
        borderColor: theme.palette.primary.main,
    },
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
    },
    eventCard: {
        borderColor: theme.palette.blue['300'],
    },
    eventButton: {
        display:'block',
        margin:'0 auto',
        color: theme.palette.blue['300'],
    },
    eventChip: {
        backgroundColor: theme.palette.blue['300'],
    },
    eventDialog: {
        borderColor: theme.palette.blue['300'],
    }
})

class Permance extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          dialogOpen: false
        }
    }

    render() {
        const { dialogOpen } = this.state
        const { per, classes } = this.props

        // Vide, annulé ou passé
        let cardStyle = 'okCard'
        let chipStyle = ''
        if( moment( per.date ).isBefore() ){
            cardStyle = 'pastCard'
            chipStyle = 'pastChip'
        } else if( per.eventTitle && per.eventTitle.length > 0 ){
            cardStyle = 'eventCard'
            chipStyle = 'eventChip'
        } else if( per.canceled ){
            cardStyle = 'canceledCard'
        } else if( per.openers.length === 0 ){
            cardStyle = 'emptyCard'
        }
        return (
            <Grow in>
                <Grid item xs={6} sm={4} md={3} >
                    <Card elevation={0} style={{borderWidth:"2px", borderStyle:"solid"}} className={classes[ cardStyle ]}>
                        <CardContent>
                            <Typography style={{textTransform:"uppercase", fontWeight:"500"}} >
                                {moment(per.date).format('dddd D')}
                            </Typography>
                            <Typography gutterBottom style={{fontWeight:"500"}} >
                                {moment(per.date).format("HH[h]mm")}
                            </Typography>
                            { per.eventTitle &&
                                <Fragment>
                                    <Button onClick={() => this.setState({dialogOpen: true})} className={classes.eventButton}>
                                      {per.eventTitle}
                                    </Button>
                                    <Dialog onClose={() => this.setState({dialogOpen: false})}
                                            open={dialogOpen}
                                            fullWidth={true}
                                    >
                                        <DialogTitle id="simple-dialog-title">{per.eventTitle}</DialogTitle>
                                        <DialogContent>
                                            <Markdown source={per.eventMessage}/>
                                        </DialogContent>
                                    </Dialog>
                                </Fragment>
                            }
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
                                                key={moment(per.date).format("YYYY-mm-DD") + '-opener-' + user.id}
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