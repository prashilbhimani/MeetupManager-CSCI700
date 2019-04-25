import { FETCH_RSVP_COUNT, FETCH_RSVPS, FETCH_BUCKETS} from '../actions/types'


const initialState = {
    myrsvpCounts: 0,
    rsvpBuckets: {},
    myrsvps: []
};

export default function(state = initialState, action) {    
    // console.log(`reducer value: ${action.type}`)
    switch(action.type) {        
        case FETCH_RSVP_COUNT:
            return {
                ...state,
                myrsvpCounts: action.payload
            }
        case FETCH_BUCKETS:            
            return {
                ...state,
                rsvpBuckets: action.payload
            }
        case FETCH_RSVPS:
            console.log(`fetching rsvps`)
            return {
                ...state,
                myrsvps:action.payload
            }
        default:
            console.log(`entering default reducer`)
            return state
    }
}