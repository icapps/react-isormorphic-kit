import actions from './actions';
import reducers from './reducers';

export default (config) => {
  return {
    actions: actions(config),
    reducers,
    name: 'feed'
  };
};

