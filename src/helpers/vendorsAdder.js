import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addVendors, removeVendors } from '../actions/vendors'
import { removeDetails } from '../actions/details'
import { addError, removeError } from '../actions/error'
import Center from '../modules/center'
import axios from 'axios'

const VendorsAdder = class extends Component {

  componentDidUpdate() {
    var { removeVendors, removeDetails, removeError, addresses, query } = this.props
    removeVendors()
    removeDetails()
    removeError()
    if (addresses.length >= 2 && query) {
      this.makeRequest()
    }
  }

  makeRequest() {
    var { query, addresses } = this.props
    var { lat, lng } = Center(addresses)
    axios.get(`http://localhost:3006/heycutie/${query}/${lat}/${lng}`)
    .then(response => {
      var parsedData = JSON.parse(response.data).data.response
      if (parsedData.totalResults === 0) {
        this.props.addError("Sorry, there is no data available for this query.")
      }
      var vendors = parsedData.groups[0].items.map(item => item.venue)
      this.props.addVendors(vendors)
    })
  }

  render() {
    return null
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addVendors,
    removeVendors,
    removeDetails,
    addError,
    removeError
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    addresses: state.addresses,
    query: state.query
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorsAdder)
