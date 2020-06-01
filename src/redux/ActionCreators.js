import * as ActionTypes from './ActionTypes';
import {DISHES} from "../shared/dishes";

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

    setTimeout(()=> {
        dispatch(addDishes(DISHES));
    }, 2000)
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