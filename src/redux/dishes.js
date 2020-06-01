import * as ActionTypes from './ActionTypes';

export const Dishes=(state={isLoading:true, err:null, dishes:[]}, action)=>{
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return {...state, dishes: action.payload, err: null, isLoading: false};

        case ActionTypes.DISHES_LOADING:
            return {...state, dishes: [], err: null, isLoading: true};

        case ActionTypes.DISHES_FAILED:
            return {...state, err: action.payload, dishes: [], isLoading: false};

        default:
            return state;
    }
};