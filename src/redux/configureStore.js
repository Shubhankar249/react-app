import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import {createForms} from "react-redux-form";
import {InitialFeedback} from "./forms";
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';

export const ConfigureStore = () => {
    const store= createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
                ...createForms({feedback : InitialFeedback})  // react-redux-forms provides all required things like reducers, actionCreators, etc.
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};