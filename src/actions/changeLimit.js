function changeLimit(limit) {
  return {
    type: 'CHANGE_LIMIT',
    payload: limit
  }
}

export default changeLimit
