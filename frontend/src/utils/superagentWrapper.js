import defaults from 'superagent-defaults';

export const superagent = defaults();

superagent
    .set('Authorization', `Bearer TODO`);

export const apiRoot = 'http://localhost:8000/api'

export function handelError( response ){

    if( response.status === 200 ){
        return response.body
    } else {
        return false
    }

}