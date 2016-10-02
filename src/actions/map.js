export function addMap(map) {
  return {
    type: 'ADD_MAP',
    payload: map
  }
}

export function addMarkers(stuff) {
  return {
    type: 'ADD_MARKERS',
    payload: stuff
  }
}

export function adjustMarkers(displayedVendors) {
  return {
    type: 'ADJUST_MARKERS',
    payload: displayedVendors
  }
}
