import axios from 'axios'

function addVendors({query, lat, lng, radius, limit, handleClick}){
  var request = axios.get(`http://localhost:3006/heycutie/${query}/${lat}/${lng}/${radius}/${limit}`)
  return {
    type: 'ADD_VENDORS',
    meta: handleClick,
    payload: request
  }
}

export default addVendors
