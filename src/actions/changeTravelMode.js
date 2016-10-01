function changeTravelMode({travelMode, currentVendor}) {
  return {
    type: 'CHANGE_TRAVEL_MODE',
    travelMode,
    currentVendor
  }
}

export default changeTravelMode
