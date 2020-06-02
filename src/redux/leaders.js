import * as ActionTypes from './ActionTypes';

export const Leaders=(state={isLoading:true, err:null, leaders:[]}, action)=>{
    switch (action.type) {
        case ActionTypes.ADD_LEADERS:
            return {...state, leaders: action.payload, err: null, isLoading: false};

        case ActionTypes.LEADERS_LOADING:
            return {...state, leaders: [], err: null, isLoading: true};

        case ActionTypes.DISHES_FAILED:
            return {...state, err: action.payload, leaders: [], isLoading: false};

        default:
            return state;
    }
};