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

export const modifyEvents = (type, normalized_name) => dispatch => { 
    console.log('in modify events action')
    console.log(`type is: ${type}`)
    var status = type === "start" ? "ACTIVE": "NOT_ACTIVE";         
    fetch(`http://localhost:9001/${normalized_name}/${status}`, {
        method: 'PUT',        
        headers : {
            'content-type' : 'application/json'          
        }        
    }).then(res => res.json())    
};
