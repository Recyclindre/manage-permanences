import React, { useContext, useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Grid, LinearProgress, Button } from '@material-ui/core'
import Permanence from './Permanence'
import { AppContext } from '../app-context'
import * as moment from 'moment'
import 'moment/locale/fr'
import Swipeable from 'react-swipeable'
import { sortBy } from 'lodash'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Api from '../utils/Api'
import { RRule, RRuleSet } from 'rrule'

const composterRruleSet = () => {
  const thursday = new RRule({
    freq: RRule.WEEKLY,
    byweekday: [RRule.TH],
    dtstart: new Date(Date.UTC(2017, 0, 1, 17, 30)),
    until: new Date(Date.UTC(2019, 2, 30))
  })
  const wednesday = new RRule({
    freq: RRule.WEEKLY,
    byweekday: [RRule.WE],
    dtstart: new Date(Date.UTC(2019, 2, 30, 17, 30))
  })
  const saturday = new RRule({
    freq: RRule.WEEKLY,
    byweekday: [RRule.SA],
    dtstart: new Date(Date.UTC(2017, 0, 1, 10, 30))
  })
  const rruleSet = new RRuleSet()
  rruleSet.rrule(thursday)
  rruleSet.rrule(wednesday)
  rruleSet.rrule(saturday)

  return rruleSet
}

const PermancesList = () => {
  const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM'))
  const [loading, setLoading] = useState(false)
  const [permanences, setPermanences] = useState([])
  const { selectedComposter } = useContext(AppContext)

  let isMount = true

  const fetchData = async () => {
    setLoading(true)

    const result = await Api.getPermanences(selectedComposter.id, currentMonth)

    if (result.status === 200 && isMount) {
      setPermanences(result.data)
      setLoading(false)
    }
  }

  useEffect(
    () => {
      fetchData()

      return () => {
        isMount = false
      }
    },
    [currentMonth]
  )

  // TODO on doit récupérer de l'API dans l'objet composte normalement
  const rruleSet = composterRruleSet()

  let allReadyDisplayDay = []
  permanences.forEach(perm => {
    const currentDay = moment(perm.date).format('YYYY-MM-DD')
    allReadyDisplayDay.push(currentDay)
  })

  const defaultDateOfPeriod = rruleSet.between(
    new Date(`${currentMonth}-01`),
    moment(currentMonth)
      .endOf('month')
      .toDate()
  )

  let defaultPermanence = []

  defaultDateOfPeriod.forEach(date => {
    // On vérifie qu'on a pas déja des perms le même jours
    const momentDate = moment(date).isDST()
      ? moment(date).subtract(1, 'hours')
      : moment(date)
    const currentDay = momentDate.format('YYYY-MM-DD')
    if (!allReadyDisplayDay.includes(currentDay)) {
      defaultPermanence.push({
        date: momentDate.format(),
        openers: []
      })
    }
  })

  let allPerm = permanences.concat(defaultPermanence)

  allPerm = sortBy(allPerm, ['date'])

  let permToDisplay = allPerm.map(perm => {
    return <Permanence per={perm} key={perm.date} />
  })

  const prevMonth = moment(`${currentMonth}-01`)
    .subtract(1, 'months')
    .format('YYYY-MM')

  const nextMonth = moment(`${currentMonth}-01`)
    .add(1, 'months')
    .format('YYYY-MM')

  return (
    <Swipeable
      onSwipedLeft={() => setCurrentMonth(nextMonth)}
      onSwipedRight={() => setCurrentMonth(prevMonth)}
    >
      <Typography
        component="h2"
        variant="h5"
        gutterBottom
        style={{ marginTop: '2em' }}
      >
        {moment(currentMonth).format('MMMM YYYY')}
      </Typography>

      {loading ? (
        <LinearProgress variant="query" style={{ marginTop: '2em' }} />
      ) : (
        <Grid container spacing={24} alignItems="stretch">
          {permToDisplay}
        </Grid>
      )}

      <Grid container spacing={24} alignItems="stretch">
        <Grid item xs={6}>
          <Button
            variant="contained"
            onClick={() => setCurrentMonth(prevMonth)}
          >
            <ChevronLeft />
            {moment(`${currentMonth}-01`)
              .subtract(1, 'months')
              .format('MMM YY')}
          </Button>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            onClick={() => setCurrentMonth(nextMonth)}
          >
            {moment(`${currentMonth}-01`)
              .add(1, 'months')
              .format('MMM YY')}
            <ChevronRight />
          </Button>
        </Grid>
      </Grid>
    </Swipeable>
  )
}

export default PermancesList
