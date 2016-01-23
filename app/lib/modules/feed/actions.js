export default class Actions {
    loadFeeds() {
        return { type: 'get', payload: ['feed 1', 'feed 2', 'feed 3'] }
    }
}