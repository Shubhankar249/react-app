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
            return {...state, comments: state.comments.concat(comment)};    // returning a new object using spread operator , can't update existing state

        default:
            return state;
    }
};