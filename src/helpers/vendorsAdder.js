import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addVendors, removeVendors } from '../actions/vendors'
import { addError } from '../actions/error'
import Center from '../modules/center'
import DistanceMatrix from '../modules/distanceMatrix'
import Avg from '../modules/avg'
import axios from 'axios'

const VendorsAdder = class extends Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.travelMode !== nextProps.travelMode) {
      return false // does not update if travelMode changes
    }
    return true
  }

  componentDidUpdate() {
    var { removeVendors, addresses, search: query } = this.props
    removeVendors()
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
    var { query } = this.props.search
    var { lat, lng } = Center(this.props.addresses)
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
    addError
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    addresses: state.addresses,
    search: state.search,
    travelMode: state.details.travelMode
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorsAdder)
