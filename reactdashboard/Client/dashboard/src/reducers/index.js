import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import groupReducer from "./groupReducer";


export default combineReducers({    
    eventsReducer: eventsReducer,  
    groupReducer: groupReducer      
});

// nameofreducer: reducerObject