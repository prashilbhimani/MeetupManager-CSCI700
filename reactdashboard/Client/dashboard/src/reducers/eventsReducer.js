import { FETCH_RSVP_COUNT, FETCH_RSVPS, FETCH_BUCKETS} from '../actions/types'


const initialState = {
    myrsvpCounts: 0,
    myrsvpBuckets: {},
    myrsvps: []
};

export default function(state = initialState, action) {        
    switch(action.type) {        
        case FETCH_RSVP_COUNT:
            return {
                ...state,
                myrsvpCounts: action.payload
            }
        case FETCH_BUCKETS:            
            return {
                ...state,
                myrsvpBuckets: action.payload
            }
        case FETCH_RSVPS:            
            return {
                ...state,
                myrsvps:action.payload
            }
        default:            
            return state
    }
}