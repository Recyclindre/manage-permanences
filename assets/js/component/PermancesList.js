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
        fetch('/api/permanences?order[date]=ASC')
            .then(response => response.json())
            .then(entries => {
                this.setState({
                    permanences: entries['hydra:member']
                });
            });
    }

    render() {
        const { permanences } = this.state

        const toLocaleStringOptions = {weekday: "long", day: "numeric", hour: "2-digit", minute: "2-digit"};

        let permanencesByMonth = []
        permanences.forEach( ( per ) => {

            const perDate = new Date( per.date )
            if( typeof permanencesByMonth[ perDate.getMonth() ] === 'undefined' ){
                permanencesByMonth[ perDate.getMonth() ] = {}
                permanencesByMonth[ perDate.getMonth() ].month = perDate
                permanencesByMonth[ perDate.getMonth() ].perm = []
            }
            permanencesByMonth[ perDate.getMonth() ].perm.push( per )
        })

        return (
            <Fragment>
                {
                    permanencesByMonth && permanencesByMonth.map( ( monthObjc ) => (
                        <Fragment key={monthObjc.month.toLocaleString()}>
                            <Typography component="h2" variant="h2" >{ monthObjc.month.toLocaleString( 'fr-FR', { month: "long", year: "numeric"}) }</Typography>
                            <List>
                                {
                                    monthObjc.perm.map(  per => (
                                        <ListItem key={per['@id']} dense>
                                            <ListItemText primary={ new Date( per.date ).toLocaleString( 'fr-FR', toLocaleStringOptions ) } />
                                            {
                                                per.openers.length > 0 ?
                                                    per.openers.map( user => (

                                                    <Fragment key={user['@id']}>
                                                        <Avatar component={Gravatar} email={user.email} />
                                                        <ListItemText primary={user.username} />
                                                    </Fragment>

                                                    )) :
                                                    <ListItemText primary="Personne encore" />
                                            }
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Fragment>
                    ))
                }
            </Fragment>
        )
    }
}

export default PermancesList