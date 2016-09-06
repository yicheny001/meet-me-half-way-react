import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/header.js'
import SelectedAddress from '../components/selectedAddress'
import addVendors from '../actions/addVendors'
import removeAddress from '../actions/removeAddress'
import removeVendors from '../actions/removeVendors'
import removeDetails from '../actions/removeDetails'
import Center from '../modules/center'
import DistanceMatrix from '../modules/distanceMatrix'
import Avg from '../modules/avg'
import axios from 'axios'

const HeaderContainer = class extends Component {

  componentDidUpdate() {
    if (this.props.addresses.length >= 2 && this.props.search.query) {
      var center = Center(this.props.addresses)
      DistanceMatrix(this.props.addresses, center, 'DRIVING', this.callback.bind(this))
    } else {
      this.props.removeVendors()
    }
    this.props.removeDetails()
  }

  callback(response, status) {
    var arrayOfDistances = response.rows.map(datum => datum.elements[0].distance.value)
    var radius = Avg(arrayOfDistances)/5
    var {query, limit} = this.props.search
    var {lat, lng} = Center(this.props.addresses)
    this.props.addVendors({query, lat, lng, radius, limit})
  }

  remove(event) {
    event.preventDefault()
    this.props.removeAddress(event.target.previousSibling.innerHTML)
  }

  render() {
    var selectedAddresses = this.props.addresses.map(address => <SelectedAddress address={address} remove={this.remove.bind(this)} />)
    if (this.props.search.query) {
      return (
        <div>
          <Header search={this.props.search}/>
          {selectedAddresses}
        </div>
      )
    }
    return <div>{selectedAddresses}</div>
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addVendors, removeVendors, removeAddress, removeDetails}, dispatch)
}

function mapStateToProps(state) {
  return {addresses: state.addresses, search: state.search}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
