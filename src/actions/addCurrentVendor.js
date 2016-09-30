function addCurrentVendor({currentVendor, travelMode}){
  return {
    type: 'ADD_CURRENT_VENDOR',
    currentVendor,
    travelMode
  }
}

export default addCurrentVendor
