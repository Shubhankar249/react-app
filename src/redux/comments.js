import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT :
            let comment=action.payload;
            comment.id=state.length; // Since all comment id are given as 0,1,2... a new id can be no. of el in state
            comment.date= new Date().toISOString();
            return state.concat(comment);
        default:
            return state;
    }
};