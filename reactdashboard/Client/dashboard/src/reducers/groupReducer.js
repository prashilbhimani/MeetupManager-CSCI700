import { FETCH_GROUP_INFO, FETCH_RELATED_TAGS_ON_LOCATION } from '../actions/types'


const initialState = {
    myGroupInfo: {},  
    relatedTags: []  
};

export default function(state = initialState, action) {        
    switch(action.type) {        
        case FETCH_GROUP_INFO:
            return {
                ...state,
                myGroupInfo: action.payload
            }
        case FETCH_RELATED_TAGS_ON_LOCATION:
        console.log(`in FETCH_RELATED_TAGS_ON_LOCATION: ${JSON.stringify(action.payload)}`)
        return {
            ...state,
            relatedTags: action.payload
        }
        default:            
            return state
    }
}