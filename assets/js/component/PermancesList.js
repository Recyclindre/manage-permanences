import React, {Fragment} from "react"
import Typography from '@material-ui/core/Typography';
import {Grid, CircularProgress } from "@material-ui/core"
import Permanence from "./Permanence"
import {AppContext} from "../app-context"
import { superagent, apiRoot, handelError } from '../utils/superagentWrapper'


class PermancesList extends React.Component {

    constructor() {
        super();

        this.state = {
            permanences: [],
            loading: true
        };
    }

    componentDidMount() {

        this.getPermanences( this.context.selectedComposter.id )
    }

    getPermanences( composterId ){
        superagent
            .get(`${apiRoot}/permanences?order[date]=ASC&composter=${composterId}`)
            .then( ( response ) => {
                const body = handelError( response )
                if( body ){
                    this.setState({
                        permanences: body['hydra:member'],
                        loading: false
                    })
                }
            })
    }


    render() {
        const { permanences, loading } = this.state

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
                    loading  ?
                        <CircularProgress style={{marginTop:"2em"}}/>
                        :
                        permanencesByMonth.map( ( monthObjc ) => (
                            <Fragment key={monthObjc.month.toLocaleString()}>

                                <Typography component="h2" variant="h5" gutterBottom style={{marginTop:"2em"}}>
                                    { monthObjc.month.toLocaleString( 'fr-FR', { month: "long", year: "numeric"}) }
                                </Typography>

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
PermancesList.contextType = AppContext;

export default PermancesList