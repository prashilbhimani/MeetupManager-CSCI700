import { FETCH_RSVP } from '../actions/types'

const initialState = {
    myevents: [],
    newEvent: {},
    errorsNewEvent: {}
};

export default function(state = initialState, action) {
    switch(action.type) {  
        case FETCH_RSVP:
            return {
                ...state,
                rsvpCounts: action.payload
            }
        /*case NEW_EVENT:
            
            if (typeof action.payload !== 'undefined'){
                return {
                    ...state,
                    newEvent: action.payload,
                    myevents: [action.payload,...state.myevents]
                }
            } else {
                return {...state}
            }      
           
        case FETCH_EVENTS:        
            return {
                ...state,
                myevents: action.payload
            }
        case UPDATED_EVENT:
            let events = [...state.myevents];
            events.find((o, i) => {     
                if (o.normalized_name === action.payload.normalized_name) {
                    events[i] = action.payload
                    return true; // stop searching
                }
                return false;
            });
            return {
                ...state,
                myevents: events
            }
        case FETCH_TAGS:        
        return {
            ...state,
            initialTags: action.payload
        }*/

        default:
        return state
    }
}