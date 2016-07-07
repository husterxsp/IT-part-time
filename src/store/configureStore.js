import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {
    createStore,
    applyMiddleware
} from 'redux';
import rootReducer from '../reducers/index';
import createMiddle from '../middleware/index';

const loggerMiddleware = createLogger();
const middle = createMiddle();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    // loggerMiddleware,
    ...middle
)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState,
        window.devToolsExtension && window.devToolsExtension());
}
