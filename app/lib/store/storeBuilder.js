import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import DevTools from '../utils/devtools';

function _buildStore(middlewares, reducers) {
  let functions = [applyMiddleware(...middlewares)];
  if (process.env.feature.DEV) {
    functions.push(require('../utils/devtools').default.instrument());
  }
  return compose(
    ...functions
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

