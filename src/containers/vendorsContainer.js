import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Star from 'material-ui/svg-icons/toggle/star';
import Vendor from '../components/vendor'
import ShowDetailsButton from '../components/showDetailsButton'
import addCurrentVendor from '../actions/addCurrentVendor'
import DetailsContainer from './detailsContainer'
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

const iconStyles = {
  marginRight: 24,
};

const VendorsContainer = class extends Component {

  handleClick(event) {
    event.preventDefault()
    var vendorID = event.target.dataset.id
    var vendor = this.props.vendors.find(vendor => vendor.id === vendorID)
    this.props.addCurrentVendor(vendor)
    this.changeCurrentVendorCss(vendorID)
    this.snackBar(vendor)
  }

  changeCurrentVendorCss(vendorID){
    document.getElementById(vendorID).style.backgroundColor='#ffffb3'
    setTimeout(() => document.getElementById(vendorID).style.backgroundColor='', 1000)
  }

  snackBar(vendor){
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: `${vendor.name} at ${vendor.location.address}`};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }

  convertStars(rating){
    let array = []
      for(var i=0; i < rating; i++){
          array.push(<Star style={iconStyles} color={yellow500}/>)
      }
    return array
  }

  render() {
    var vendors = this.props.vendors.map((vendor, index) => {
      return (
        <li className='list-group-item' id={index + 1}>
          <Vendor vendor={vendor} convertStars={(rating)=>this.convertStars(rating)} />
          <ShowDetailsButton id="demo-show-toast" className="mdl-button mdl-js-button mdl-button--raised" vendor={vendor} handleClick={this.handleClick.bind(this)} />
          <DetailsContainer />
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
  return {addresses: state.addresses, vendors: state.vendors}
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorsContainer)
