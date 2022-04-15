import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { PostReducer, FetchPosts, FetchPost, UpdatePost } from './reducers/PostReducer';

const rootReducers = combineReducers({
    PostReducer,
    FetchPosts,
    FetchPost,
    UpdatePost,
});
const middlewares = [thunkMiddleware]; //if more than 1 middleware presents
const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)));
export default Store;