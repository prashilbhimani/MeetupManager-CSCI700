import { NEW_EVENT, FETCH_EVENTS } from './types';


export const fetchEvents = () => dispatch => {  
    console.log('in fetch events action')  
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

export const modifyEvents = (type, normalized_name) => dispatch => { 
    console.log('in modify events action')         
    fetch(`http://localhost:9001/${normalized_name}/${type}`, {
        method: 'PUT',        
        headers : {
            'content-type' : 'application/json'          
        }        
    }).then(res => res.json())    
};
