import { FETCH_RSVP_COUNT, FETCH_BUCKETS, FETCH_RSVPS } from './types';
import fetch from 'cross-fetch';

export const fetchRsvps = (eventId) => dispatch => {    
    fetch(`http://localhost:9001/${eventId}/rsvps`, {
        headers: {}
    })
    .then(res => res.json())                
    .then(mytags => dispatch({
        type: FETCH_RSVPS,
        payload: mytags
    }))
    .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    });;    
};

export const fetchRsvpCount = (eventId) => dispatch => {    
    fetch(`http://localhost:9001/${eventId}/rsvpcount`, {
        headers: {}
    })
    .then(res => res.json())                
    .then(mytags => dispatch({
        type: FETCH_RSVP_COUNT,
        payload: mytags
    }))
    .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    });;    
};

export const fetchBuckets = (eventId) => dispatch => {    
    fetch(`http://localhost:9001/${eventId}/hourbuckets`, {
        headers: {}
    })
    .then(res => res.json())               
    .then(mytags => dispatch({
        type: FETCH_BUCKETS,
        payload: mytags
    }))
    .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    });;    
};
