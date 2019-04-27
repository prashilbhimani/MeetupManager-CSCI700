import { FETCH_GROUP_INFO, FETCH_RELATED_TAGS_ON_LOCATION, FETCH_RELATED_TAGS_ON_LOCATION_ONLY } from './types';
import fetch from 'cross-fetch';

export const fetchGroupInfo = (groupId) => dispatch => {    
    fetch(`http://localhost:9001/${groupId}/events`, {        
        headers: {}
    })
    .then(res => res.json())                
    .then(mytags => dispatch({
        type: FETCH_GROUP_INFO,
        payload: mytags
    }))
    .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    });;    
};


export const fetchRelatedTagsOnLocation = (location, tag) => dispatch => {        
    fetch(`http://localhost:9001/relatedtags?city=${location}&ref_tag=${tag}`, {        
        headers: {}
    })
    .then(res => res.json())                
    .then(mytags => dispatch({
        type: FETCH_RELATED_TAGS_ON_LOCATION,
        payload: mytags
    }))
    .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    });;    
};



export const fetchRelatedTagsOnLocationOnly = (location) => dispatch => {    
    console.log(`action called:`)
    fetch(`http://localhost:9001/mostfreqtags?city=${location}`, {        
        headers: {}
    })
    .then(res => res.json())                
    .then(mytags => dispatch({
        type: FETCH_RELATED_TAGS_ON_LOCATION_ONLY,
        payload: mytags
    }))
    .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    });;    
};



