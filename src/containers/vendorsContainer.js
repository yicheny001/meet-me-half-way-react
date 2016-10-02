import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Star from 'material-ui/svg-icons/toggle/star';
import Vendor from '../components/vendor'
import ShowDetailsButton from '../components/showDetailsButton'
import { addCurrentVendor } from '../actions/details'
import DetailsContainer from './detailsContainer'
import { red500, yellow500, blue500 } from 'material-ui/styles/colors';

const VendorsContainer = class extends Component {

  handleClick(event) {
    event.preventDefault()
    var { vendors, addCurrentVendor, details: { travelMode } } = this.props
    var vendorID = event.target.dataset.id
    var currentVendor = vendors.find(vendor => vendor.id === vendorID)
    addCurrentVendor({currentVendor, travelMode})
  }

  render() {
    var { vendors, details: { currentVendor } } = this.props
    var vendors = vendors.map((vendor) => {
      if (vendor === currentVendor) {
        return (
          <li className='list-group-item' data-vendor={vendor.name}>
            <Vendor vendor={vendor} />
            <DetailsContainer />
          </li>
        )
      }
      return (
        <li className='list-group-item' data-vendor={vendor.name}>
          <Vendor vendor={vendor}  />
          <ShowDetailsButton id="demo-show-toast" className="mdl-button mdl-js-button mdl-button--raised" vendor={vendor} handleClick={this.handleClick.bind(this)} />
        </li>
      )
    })
    return <div>{vendors}</div>
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addCurrentVendor}, dispatch)
}

function mapStateToProps(state) {
  return {addresses: state.addresses, vendors: state.vendors.displayedVendors, details: state.details}
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorsContainer)
