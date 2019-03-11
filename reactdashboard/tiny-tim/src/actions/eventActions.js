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
            'content-type' : 'application/json'          
        },
        body: JSON.stringify(eventData)
    }).then(res => res.json())    
    .then(myevent => dispatch({
        type: NEW_EVENT,
        payload: myevent
    })
    );
};
