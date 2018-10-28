import React, {Fragment} from "react"
import Typography from '@material-ui/core/Typography';
import {Grid, CircularProgress, Button } from "@material-ui/core"
import Permanence from "./Permanence"
import {AppContext} from "../app-context"
import { superagent, apiRoot, handelError } from '../utils/superagentWrapper'
import * as moment from 'moment'
import Swipeable from 'react-swipeable'

class PermancesList extends React.Component {

    constructor() {
        super();

        const today = moment().format('YYYY-MM')

        this.state = {
            permanences: [],
            currentMonth: today,
            loading: true
        };
    }

    setCurrentMonth( currentMonth ){
        this.setState( { currentMonth } )
    }

    componentDidMount() {
        this.getPermanences()
    }

    componentDidUpdate( prevProps, prevState ){

        if( prevState.currentMonth !== this.state.currentMonth ){
            this.setState({ loading: true } )
            this.getPermanences()
        }
    }

    getPermanences(){
        const { selectedComposter } = this.context
        const { currentMonth } = this.state

        superagent
            .get(`${apiRoot}/permanences`)
            .query( { "order[date]" : "ASC" } )
            .query( { composter : selectedComposter.id } )
            .query( {"date[after]" : `${currentMonth}-01`})
            .query( {"date[before]" : `${currentMonth}-31`})
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
        const { permanences, loading, currentMonth, changeMonth } = this.state
        const prevMonth = moment( `${currentMonth}-01`).subtract( 1, 'months' ).format('YYYY-MM')
        const nextMonth = moment( `${currentMonth}-01`).add( 1, 'months' ).format('YYYY-MM')

        console.log( currentMonth )

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

                                <Swipeable
                                    onSwipedLeft={ () => this.setCurrentMonth( nextMonth ) }
                                    onSwipedRight={ () => this.setCurrentMonth( prevMonth ) }
                                >
                                    <Typography component="h2" variant="h5" gutterBottom style={{marginTop:"2em"}}>
                                        { monthObjc.month.toLocaleString( 'fr-FR', { month: "long", year: "numeric"}) }
                                    </Typography>

                                    <Grid container spacing={24} alignItems="stretch">
                                        {
                                            monthObjc.perm.map(  per => ( <Permanence per={per} key={per['@id']}/>))
                                        }
                                    </Grid>
                                </Swipeable>
                                <Grid container spacing={24} alignItems="stretch">
                                    <Grid item xs={6}>
                                        <Button variant="contained" onClick={ () => this.setCurrentMonth( prevMonth )}>
                                            Prev
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} style={{textAlign: 'right'}}>
                                        <Button variant="contained" onClick={ () => this.setCurrentMonth( nextMonth )}>
                                            Next
                                        </Button>
                                    </Grid>
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