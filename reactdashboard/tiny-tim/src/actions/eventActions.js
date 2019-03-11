import { CREATE_EVENT } from './types';


export const createEvent = (eventData) => dispatch => {      
    console.log(`event data is: ${JSON.stringify(eventData)}`)
    fetch('http://localhost:9001/newevent', {
        method: 'POST',        
        headers : {
            'content-type' : 'application/json',
            'Access-Control-Allow-Origin': '*'            
        },
        body: JSON.stringify(eventData)
    }).then(res => res.json())
    .then(res => console.log(`response is: ${JSON.stringify(res)}`))
    .then(myevent => dispatch({
        type: CREATE_EVENT,
        payload: myevent
    })
    );
};
