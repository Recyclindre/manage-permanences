import React, {Fragment} from "react"
import Typography from '@material-ui/core/Typography';
import {Avatar, List, ListItem, ListItemText} from "@material-ui/core"
import Gravatar from "react-gravatar"



class PermancesList extends React.Component {

    constructor() {
        super();

        this.state = {
            permanences: []
        };
    }

    componentDidMount() {
        fetch('/api/permanences')
            .then(response => response.json())
            .then(entries => {
                console.log( entries )
                this.setState({
                    permanences: entries['hydra:member']
                });
            });
    }

    render() {
        const { permanences } = this.state

        return (
            <Fragment>
                <Typography component="h2" variant="h2" >Octobre 2018</Typography>
                <List>
                    {
                        permanences.map(  per => (
                            <ListItem key={per['@id']} dense>
                                <ListItemText primary={ new Date( per.date ).toLocaleString() } />
                                {
                                    per.openers && per.openers.map( user => (

                                        <Fragment key={user['@id']}>
                                            <Avatar component={Gravatar} email={user.email} />
                                            <ListItemText primary={user.username} />
                                        </Fragment>

                                    ))
                                }
                            </ListItem>
                        ))
                    }
                </List>
            </Fragment>
        )
    }
}

export default PermancesList