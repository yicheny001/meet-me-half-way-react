function addVendors({vendors, handleClick}) {
  return {
    type: 'ADD_VENDORS',
    vendors,
    handleClick
  }
}

export default addVendors
