// Components
import App from '../components/Main';
import feed from './feed';

export default {
  path: '/',
  component: App,
  childRoutes: [
    feed.index,
    feed.item
  ]
};
