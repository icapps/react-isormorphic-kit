import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { devTools } from 'redux-devtools';

function _buildStore(middlewares, reducers) {
  return compose(
    applyMiddleware(...middlewares),
    devTools()
  )(createStore)(combineReducers(reducers));
}

export default function storeBuilder(reducers, customMiddlewares = []) {
    const middlewares = [];
    const store = _buildStore([...middlewares, ...customMiddlewares], reducers)
    
    return {
        store,
        middlewares
    }
}

