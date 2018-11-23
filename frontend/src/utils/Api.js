import {create} from 'apisauce'


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
    })
}


export default Api