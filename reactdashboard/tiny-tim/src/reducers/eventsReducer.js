import { CREATE_EVENT } from '../actions/types';

const initialState = {
    newEvent: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_EVENT:
        return {
            ...state,
            newEvent: action.payload
        }
        default:
        return state
    }
}