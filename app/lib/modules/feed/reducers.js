function feeds(state = [], action) {
  if (action.type === 'get') return action.payload;
  else return state;
}

export default {
  feeds
}