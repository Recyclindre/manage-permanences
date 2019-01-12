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
    "date[before]": `${currentMonth}-31T23:59:00`
  }),
  getStatsByComposter: ( selectedComposter ) => ApiCall.get( 'permanences',{
    "order[date]" : "ASC",
    composter: selectedComposter,
    "date[after]": moment().subtract( 1, 'years').format(),
    "date[before]": moment().format()
  })
}


export default Api