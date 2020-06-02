import * as ActionTypes from './ActionTypes';
import {baseUrl} from "../shared/baseUrl";




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

// creating a thunk used for fetchingDishes which is a middleware function that returns a function
export const fetchDishes=()=>(dispatch)=> {     // the inner middleware function can take params: dispatch, getState if required
    dispatch(dishesLoading(true));

    return fetch(baseUrl+'dishes')
        .then(response=>response.json())
        .then(dishes=>dispatch(addDishes(dishes)));
};

// Action creators
export const dishesLoading=()=> ({  // returning action
   type:ActionTypes.DISHES_LOADING
});

export const dishesFailed=(err)=>({
    type:ActionTypes.DISHES_FAILED,
    payload: err
});

export const addDishes=(dishes)=>({
    type:ActionTypes.ADD_DISHES,
    payload:dishes
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});