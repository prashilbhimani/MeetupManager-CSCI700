import { NEW_EVENT, FETCH_EVENTS } from './types';


export const fetchEvents = () => dispatch => {    
    fetch('http://localhost:9001/fetchevents')
    .then(res => res.json())
    .then(myevents => dispatch({
        type: FETCH_EVENTS,
        payload: myevents
    }));    
};

export const createEvent = (eventData) => dispatch => {          
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
        type: NEW_EVENT,
        payload: myevent
    })
    );
};
