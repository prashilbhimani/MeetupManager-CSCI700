import { FETCH_GROUP_INFO } from '../actions/types'


const initialState = {
    myGroupInfo: {},    
};

export default function(state = initialState, action) {        
    switch(action.type) {        
        case FETCH_GROUP_INFO:
            return {
                ...state,
                myGroupInfo: action.payload
            }
        default:            
            return state
    }
}