import * as ActionTypes from './ActionTypes';

// creating a action Creator function that creates an action object
export const addComment=(dishId, rating, author, comment)=>({    //@params: that are required to add a comment
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId:dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});