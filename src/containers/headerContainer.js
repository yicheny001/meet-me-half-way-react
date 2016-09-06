import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/header.js'
import SelectedAddresses from '../components/selectedAddresses'
import addVendors from '../actions/addVendors'
import removeAddress from '../actions/removeAddress'
import removeVendors from '../actions/removeVendors'
import Center from '../modules/center'
import RadiusHelper from '../modules/radiusHelper'
import Avg from '../modules/avg'
import axios from 'axios'

const HeaderContainer = class extends Component {

  componentDidUpdate() {
    if (this.props.addresses.length >= 2 && this.props.search.query) {
      var center = Center(this.props.addresses)
      var { origins, destinations } = RadiusHelper(this.props.addresses, center)
      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({origins, destinations, travelMode: 'DRIVING'}, this.callback.bind(this))
    } else {
      this.props.removeVendors()
    }
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
    if (this.props.search.query) {
      return (
        <div>
          <Header search={this.props.search}/>
          <SelectedAddresses addresses={this.props.addresses} remove={this.remove.bind(this)}/>
        </div>
      )
    }
    return <SelectedAddresses addresses={this.props.addresses} remove={this.remove.bind(this)}/>
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addVendors, removeVendors, removeAddress}, dispatch)
}

function mapStateToProps(state) {
  return {addresses: state.addresses, search: state.search}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
