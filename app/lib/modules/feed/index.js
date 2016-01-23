import Actions from './actions';
import reducers from './reducers';

export default (config) => {
  return {
    actions: new Actions(config),
    reducers,
    name: 'feed'
  };
};

