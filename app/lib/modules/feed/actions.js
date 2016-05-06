export default function (config) {
  return {
    loadFeeds() {
      return {type: 'get', payload: ['feed 1', 'feed 2', 'feed 3']}
    }
  }
}