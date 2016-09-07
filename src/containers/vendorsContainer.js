import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Vendor from '../components/vendor'
import ShowDetailsButton from '../components/showDetailsButton'
import addCurrentVendor from '../actions/addCurrentVendor'

const VendorsContainer = class extends Component {

  handleClick(event) {
    event.preventDefault()
    var vendorID = event.target.dataset.id
    var vendor = this.props.vendors.find(vendor => vendor.id === vendorID)
    this.props.addCurrentVendor(vendor)
    this.snackBar(vendor)
  }

  snackBar(vendor){
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: `${vendor.name} at ${vendor.location.address}`};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }

  render() {
    var vendors = this.props.vendors.map((vendor, index) => {
      return (
        <div className='container' id={index + 1}>
          <Vendor vendor={vendor} />
          <ShowDetailsButton id="demo-show-toast" className="mdl-button mdl-js-button mdl-button--raised" vendor={vendor} handleClick={this.handleClick.bind(this)} />
          <br />
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
