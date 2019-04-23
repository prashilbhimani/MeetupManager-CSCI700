import { FETCH_RSVP } from '../actions/types'

const initialState = {
    myrsvpCounts: 0
};

export default function(state = initialState, action) {
    console.log(`in reducer: ${JSON.stringify(action)}`)  
    switch(action.type) {        
        case FETCH_RSVP:
            return {
                ...state,
                rsvpCounts: action.payload
            }
        default:
            console.log(`entering default reducer`)
            return state
    }
}