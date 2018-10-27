import React, {Fragment} from "react"
import Typography from '@material-ui/core/Typography';
import {Grid } from "@material-ui/core"
import Permanence from "./Permanence"



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
                                        monthObjc.perm.map(  per => ( <Permanence per={per} key={per['@id']}/>))
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