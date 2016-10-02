export function addVendors(vendors) {
  return {
    type: 'ADD_VENDORS',
    payload: vendors
  }
}

export function removeVendors() {
  return {
    type: 'REMOVE_VENDORS',
  }
}

export function toggleOpenNow(openNow) {
  return {
    type: 'TOGGLE_OPEN_NOW',
    payload: openNow
  }
}

export function changeLimit(limit) {
  return {
    type: 'CHANGE_LIMIT',
    payload: limit
  }
}
