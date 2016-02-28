/**
 * Created by mobinni on 08/12/15.
 */
import Feed from './components/Feed';
import Item from './components/Item';

export default {
  index: {
    path: 'feed',
    getComponent(location, cb) {
      cb(null, Feed);
    }
  },
  item: {
    path: 'feed/:item',
    getComponent(location, cb) {
      cb(null, Item);
    }
  }
};