import { FETCH_RSVP, FETCH_BUCKETS} from '../actions/types'


const initialState = {
    myrsvpCounts: 0,
    rsvpBuckets: {}
};

export default function(state = initialState, action) {    
    // console.log(`reducer value: ${action.type}`)
    switch(action.type) {        
        case FETCH_RSVP:
            return {
                ...state,
                rsvpCounts: action.payload
            }
        case FETCH_BUCKETS:
        console.log(`entering fetch buckets reducer`)
            return {
                ...state,
                rsvpBuckets: action.payload
            }
        default:
            console.log(`entering default reducer`)
            return state
    }
}