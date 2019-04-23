import { FETCH_RSVP } from './types';
import fetch from 'cross-fetch';

export const fetchRsvpCount = (eventId) => dispatch => {
    console.log(`action fetchRSVPCount done`)
    fetch(`http://localhost:9001/${eventId}/rsvpcount`, {
        headers: {}
    })
    .then(res => res.json())
    .then(rsvpcount => dispatch({
        type: FETCH_RSVP,
        payload: rsvpcount
    }))
    .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    });; 
}
/*export const fetchEvents = () => dispatch => {    
    fetch('https://epicapi.gerard.space/events/', {
        headers: {}
    })
        .then(res => res.json())
        .then(myevents => dispatch({
            type: FETCH_EVENTS,
            payload: myevents
        }))
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });;    
};

export const createEvent = (eventData) => dispatch => {    
        fetch('https://epicapi.gerard.space/events/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',                
            },
            body: JSON.stringify(eventData)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    console.log("We need to handle this error");
                }

            })
            .then(myevent => dispatch({
                type: NEW_EVENT,
                payload: myevent
            })
            );    
};

export const modifyEvents = (status, normalized_name) => dispatch => {    
        fetch(`https://epicapi.gerard.space/events/${normalized_name}/${status}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',                
            }
        }).then(res => res.json())
            .then(updatedEvent => dispatch({
                type: UPDATED_EVENT,
                payload: updatedEvent
            })
            );    
};

export const updateAnnotation = (tweet, initialTags ,tags, eventName) => dispatch => {       
        var data = {
            'initialTags': initialTags,
            'tags' : tags,
            'tweet' : tweet,
            'tweetId': tweet.id,
            'eventName': eventName
        }
        fetch(`http://localhost:9001/annotate`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',                
            },
            body: JSON.stringify(data)
        })        
        .then(res => res.json())        
        .then(res => dispatch({                        
            type: TWEET_ANNOTATION,
            payload: res
        })
        );
};

export const fetchTags = (tweetId) => dispatch => {    
        fetch('http://localhost:9001/annotate?id='+tweetId, {
            headers: {}
        })
        .then(res => res.json())             
        .then(mytags => dispatch({
            type: FETCH_TAGS,
            payload: mytags
        }))
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });;    
};*/