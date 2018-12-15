import {create} from 'apisauce'
import * as moment from 'moment'


const ApiCall = create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Authorization': `Bearer TODO`
  },
  timeout: 10000
})

const Api = {
  getComposter: ( composterId ) => ApiCall.get(`composters/${composterId}`),
  getPermanences: ( selectedComposter, currentMonth ) => ApiCall.get( 'permanences', {
    "order[date]" : "ASC",
    composter: selectedComposter,
    "date[after]": `${currentMonth}-01`,
    "date[before]": `${currentMonth}-31`
  }),
  getStatsByComposter: ( selectedComposter ) => ApiCall.get( 'permanences',{
    "order[date]" : "ASC",
    composter: selectedComposter,
    "date[after]": moment().subtract( 1, 'years').format( 'YYYY-MM-DD'),
    "date[before]": moment().format( 'YYYY-MM-DD')
  })
}


export default Api