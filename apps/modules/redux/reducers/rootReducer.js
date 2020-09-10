import { combineReducers } from 'redux';

import tokensReducer from './tokensReducer';

const rootReducer = combineReducers({
    token: tokensReducer
});

export default rootReducer;