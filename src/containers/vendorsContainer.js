import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Vendor from '../components/vendor'
import ShowDetailsButton from '../components/showDetailsButton'
import addCurrentVendor from '../actions/addCurrentVendor'

const VendorsContainer = class extends Component {

  handleClick(event) {
    var vendorID = event.target.dataset.id
    var vendor = this.props.vendors.find(vendor => vendor.id === vendorID)
    this.props.addCurrentVendor(vendor)
  }

  render() {
    var vendors = this.props.vendors.map(vendor => {
      return (
        <div>
          <Vendor vendor={vendor} />
          <ShowDetailsButton vendor={vendor} handleClick={this.handleClick.bind(this)} />
        </div>
      )
    })
    return <div>{vendors}</div>
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addCurrentVendor}, dispatch)
}

function mapStateToProps(state) {
  return {addresses: state.addresses, vendors: state.vendors}
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorsContainer)
