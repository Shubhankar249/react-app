import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = {err:null, comments:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, comments: action.payload, err: null};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, err: action.payload, comments: []};

        case ActionTypes.ADD_COMMENT :
            let comment=action.payload;
            comment.id=state.comments.length; // Since all comment id are given as 0,1,2... a new id can be no. of el in state
            comment.date= new Date().toISOString();
            return {...state, comments: state.comments.concat(comment)};    // returning a new object using spread operator , can't update existing state

        default:
            return state;
    }
};