export default function query(state = null, action) {
  switch(action.type) {
    case 'ADD_QUERY':
      return action.payload
    case 'NUKE':
      return null
    default:
      return state
  }
}
