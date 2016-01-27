import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import DevTools from '../devtools';

function _buildStore(middlewares, reducers) {
  return compose(
    applyMiddleware(...middlewares),
    DevTools.instrument()
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

