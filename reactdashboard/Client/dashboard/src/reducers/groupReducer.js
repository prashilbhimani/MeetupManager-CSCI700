import { FETCH_GROUP_INFO, FETCH_RELATED_TAGS_ON_LOCATION, FETCH_RELATED_TAGS_ON_LOCATION_ONLY } from '../actions/types'


const initialState = {
    myGroupInfo: {},  
    relatedTags: [],
    relatedTagsLocationOnly: []  
};

export default function(state = initialState, action) {        
    switch(action.type) {        
        case FETCH_GROUP_INFO:
            return {
                ...state,
                myGroupInfo: action.payload
            }
        case FETCH_RELATED_TAGS_ON_LOCATION:        
        return {
            ...state,
            relatedTags: action.payload
        }
        case FETCH_RELATED_TAGS_ON_LOCATION_ONLY:
        console.log(`in FETCH_RELATED_TAGS_ON_LOCATION_ONLY: ${JSON.stringify(action.payload)}`)
        return {
            ...state,
            relatedTagsLocationOnly: action.payload

        }
        default:            
            return state
    }
}