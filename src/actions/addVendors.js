import axios from 'axios'

function addVendors({query, lat, lng, radius, limit}){
  var request = axios.get(`http://localhost:3006/heycutie/${query}/${lat}/${lng}/${radius}/${limit}`)
  return {
    type: 'ADD_VENDORS',
    payload: request
  }
}

export default addVendors
