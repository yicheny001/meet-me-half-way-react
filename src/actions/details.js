export function addCurrentVendor({currentVendor, travelMode}) {
  return {
    type: 'ADD_CURRENT_VENDOR',
    currentVendor,
    travelMode
  }
}

export function addLengths(lengths) {
  return {
    type: 'ADD_LENGTHS',
    payload: lengths
  }
}

export function changeTravelMode({travelMode, currentVendor}) {
  return {
    type: 'CHANGE_TRAVEL_MODE',
    travelMode,
    currentVendor
  }
}

export function removeDetails() {
  return {
    type: 'REMOVE_DETAILS',
  }
}
