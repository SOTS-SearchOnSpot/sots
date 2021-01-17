import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '@redux';

const middleware = [
    thunk
];

const configureStore = () => {
    let store = null;
    store = compose(applyMiddleware(...middleware))(createStore)(reducers);
    return store;
}
export default configureStore();