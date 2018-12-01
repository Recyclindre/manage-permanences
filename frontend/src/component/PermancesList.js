import React from "react"
import Typography from '@material-ui/core/Typography';
import {Grid, LinearProgress, Button } from "@material-ui/core"
import Permanence from "./Permanence"
import {AppContext} from "../app-context"
import * as moment from 'moment'
import 'moment/locale/fr'
import Swipeable from 'react-swipeable'
import { find } from 'lodash'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Api from '../utils/Api'

class PermancesList extends React.Component {

    constructor(props) {
        super(props);

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
        this.mounted = true;
        this.getPermanences()
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    componentDidUpdate( prevProps, prevState ){

        if( prevState.currentMonth !== this.state.currentMonth ){
            this.setState({ loading: true } )
            this.getPermanences()
        }
    }

    async getPermanences(){
        const { selectedComposter } = this.context
        const { currentMonth } = this.state

        const permanences = await Api.getPermanences( selectedComposter.id, currentMonth)

        if( permanences.status === 200 && this.mounted) {
            this.setState({
              permanences: permanences.data,
              loading: false
            })
        }
    }


    render() {
        const { permanences, loading, currentMonth } = this.state

        moment.locale('fr')
        const currentMonthNum = moment( currentMonth ).get('month')
        const prevMonth = moment( `${currentMonth}-01`).subtract( 1, 'months' ).format('YYYY-MM')
        const nextMonth = moment( `${currentMonth}-01`).add( 1, 'months' ).format('YYYY-MM')

        let currentDay = moment( `${currentMonth}-01`)
        let permToDisplay = []
        // TODO on doit récupérer de l'API dans l'objet composte normalement
        const recurrentPerm = [
            { day: 4, hour: 18, minute: 30},
            { day: 6, hour: 11, minute: 30},
        ]

        // On passe en revut chaque date du mois
        while( currentDay.get('month') === currentMonthNum ){
            const permOfTheDay = find( permanences, function(o) { return currentDay.isSame( o.date, 'day' ); } )

            if( permOfTheDay ){
                // Si un permanence correspond a la date on l'affiche
                permToDisplay.push( <Permanence per={permOfTheDay} key={currentDay.format()}/> )
            } else {
                // Si c'est une date de permanences prévut on affiche un permanence sans ouvreur
                let recPerm = find( recurrentPerm, [ 'day', currentDay.get('day') ] )
                if( recPerm ){
                    currentDay.set('hour', recPerm.hour)
                    currentDay.set('minute', recPerm.minute)
                    permToDisplay.push( <Permanence per={{date: currentDay.format(), openers: [] }} key={currentDay.format()}/> )
                }
            }
            currentDay.add( 1, 'days' )
        }
        return (
            <Swipeable
                onSwipedLeft={ () => this.setCurrentMonth( nextMonth ) }
                onSwipedRight={ () => this.setCurrentMonth( prevMonth ) }
            >
                <Typography component="h2" variant="h5" gutterBottom style={{marginTop:"2em"}}>
                    { moment( currentMonth ).format('MMMM YYYY') }
                </Typography>

                {
                    loading  ?
                        <LinearProgress variant="query" style={{marginTop:"2em"}}/>
                        :
                        <Grid container spacing={24} alignItems="stretch">
                            { permToDisplay }
                        </Grid>
                }

                <Grid container spacing={24} alignItems="stretch">
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={ () => this.setCurrentMonth( prevMonth )}>
                            <ChevronLeft />
                            { moment( `${currentMonth}-01`).subtract( 1, 'months' ).format( 'MMM YY' ) }
                        </Button>
                    </Grid>
                    <Grid item xs={6} style={{textAlign: 'right'}}>
                        <Button variant="contained" onClick={ () => this.setCurrentMonth( nextMonth )}>
                            { moment( `${currentMonth}-01`).add( 1, 'months' ).format( 'MMM YY' ) }
                            <ChevronRight />
                        </Button>
                    </Grid>
                </Grid>
            </Swipeable>
        )
    }
}
PermancesList.contextType = AppContext;

export default PermancesList