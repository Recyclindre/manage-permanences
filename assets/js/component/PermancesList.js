import React, {Fragment} from "react"
import Typography from '@material-ui/core/Typography';
import {Avatar, Card, CardContent, Chip, Grid } from "@material-ui/core"
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
                            <Typography component="h2" variant="h5" gutterBottom style={{marginTop:"2em"}}>{ monthObjc.month.toLocaleString( 'fr-FR', { month: "long", year: "numeric"}) }</Typography>
                                <Grid container spacing={24} alignItems="stretch">
                                    {
                                        monthObjc.perm.map(  per => (
                                                <Grid item xs={6} sm={4} md={3} key={per['@id']}>
                                                    <Card>
                                                        <CardContent>
                                                            <Typography gutterBottom>
                                                                { new Date( per.date ).toLocaleString( 'fr-FR', toLocaleStringOptions ) }
                                                            </Typography>
                                                            {
                                                                per.openers.length > 0 ?
                                                                    per.openers.map( user => (

                                                                        <Chip
                                                                            key={user['@id']}
                                                                            avatar={<Avatar component={Gravatar} email={user.email} />}
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
                                        ))
                                    }
                                </Grid>
                        </Fragment>
                    ))
                }
            </Fragment>
        )
    }
}

export default PermancesList