import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addVendors, removeVendors } from '../actions/vendors'
import { removeDetails } from '../actions/removeDetails'
import { addError, removeError } from '../actions/error'
import Center from '../modules/center'
import DistanceMatrix from '../modules/distanceMatrix'
import Avg from '../modules/avg'
import axios from 'axios'

const VendorsAdder = class extends Component {

  componentDidUpdate() {
    var { removeVendors, removeDetails, removeError, addresses, query } = this.props
    removeVendors()
    removeDetails()
    removeError()
    if (addresses.length >= 2 && query) {
      var center = Center(addresses)
      DistanceMatrix(addresses, center, 'DRIVING', this.callback.bind(this))
      // adds vendors if there are at least two inputted addresses and a query
      // verifies that location is accessible
    }
  }

  callback(response, status) {
    if (response.rows[0].elements[0].status === 'ZERO_RESULTS') {
      this.props.addError('Sorry, data for this query is unavailable.')
      return false
    }
    var data = this.fetchData(response)
    this.makeRequest(data)
  }

  fetchData(response) {
    var { query, addresses } = this.props
    var { lat, lng } = Center(addresses)
    return {query, lat, lng}
  }

  makeRequest({query, lat, lng}) {
    axios.get(`http://localhost:3006/heycutie/${query}/${lat}/${lng}`)
    .then(response => {
      var parsedData = JSON.parse(response.data)
      var vendors = parsedData.data.response.groups[0].items.map(item => item.venue)
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
