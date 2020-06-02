import * as ActionTypes from './ActionTypes';
import {baseUrl} from "../shared/baseUrl";


// creating a action Creator function that creates an action object
export const addComment=(comment)=>({    //@params: that are required to add a comment
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment=(dishId, rating, author, comment)=> (dispatch) =>{
    const newComment = {
        dishId:dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    console.log("Trying to add a comment");
    newComment.date= new Date().toISOString();
    return fetch(baseUrl+'comments', {
        method:'POST',
        body: JSON.stringify(newComment),
        headers:{'Content-Type': 'application/json'},
        credentials:'same-origin'
    })
        .then(response=> {
            if (response.ok) return response;   // if server sends an appropriate response then return response for next promise to use.

            // handling error
            let err=new Error(`Error ${response.status} : ${response.statusText}`);
            err.response=response;
            throw err;

        }, error=> {    // if server doesn't serve any response.
            throw new Error(error.message);
        })
        .then(response=>response.json())
        .then(comment=> dispatch(addComment(comment)))
        .catch(err=> {alert('Post request failed!!\n Error:'+err.message)});
};

// creating a thunk used for fetchingDishes which is a middleware function that returns a function
export const fetchDishes=()=>(dispatch)=> {     // the inner middleware function can take params: dispatch, getState if required
    dispatch(dishesLoading(true));

    return fetch(baseUrl+'dishes')
        .then(response=> {
            if (response.ok) return response;   // if server sends an appropriate response then return response for next promise to use.

            // handling error
            let err=new Error(`Error ${response.status} : ${response.statusText}`);
            err.response=response;
            throw err;

        }, error=> {    // if server doesn't serve any response.
            throw new Error(error.message);
        })
        .then(response=>response.json())
        .then(dishes=>dispatch(addDishes(dishes)))
        .catch(err=> dispatch(dishesFailed(err.message)));
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
        .then(response=> {
            if (response.ok) return response;   // if server sends an appropriate response then return response for next promise to use.

            // handling error
            let err=new Error(`Error ${response.status} : ${response.statusText}`);
            err.response=response;
            throw err;

        }, error=> {    // if server doesn't serve any response.
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(err=> dispatch(commentsFailed(err.message)));
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
        .then(response=> {
            if (response.ok) return response;   // if server sends an appropriate response then return response for next promise to use.

            // handling error
            let err=new Error(`Error ${response.status} : ${response.statusText}`);
            err.response=response;
            throw err;

        }, error=> {    // if server doesn't serve any response.
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(err=> dispatch(promosFailed(err.message)));
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