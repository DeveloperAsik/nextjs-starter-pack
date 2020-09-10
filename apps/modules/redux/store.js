import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '@modules_redux_reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;