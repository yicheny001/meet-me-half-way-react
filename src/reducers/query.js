export default function query(state = null, action) {
  switch(action.type) {
    case 'ADD_QUERY':
      return action.payload
    default:
      return state
  }
}
