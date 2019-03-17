import { NEW_EVENT, FETCH_EVENTS, MODIFY_EVENT } from '../actions/types';

const initialState = {
    myevents: [],
    newEvent: {}
};

export default function(state = initialState, action) {
    switch(action.type) {        
        case NEW_EVENT:          
        return {
            ...state,
            newEvent: action.payload
        }
        case FETCH_EVENTS:        
        return {
            ...state,
            myevents: action.payload
        }
        case MODIFY_EVENT:
        console.log('in modify event reducer')
        return {
            ...state
        }
        default:
        return state
    }
}