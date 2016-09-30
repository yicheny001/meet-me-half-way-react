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
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  convertStars(rating){
    let array = []
      for(var i = 0; i < (rating/2); i++){
          array.push(<Star style={iconStyles} color={yellow500}/>)
      }
    return array
  }

  convertPrice(price){
    let array = []
      for(var i = 0; i < (price); i++){
          array.push('$')
      }
    return array
  }

  render() {
    var vendors = this.props.vendors.map((vendor) => {
      if(!vendor){
        return(
          <div>loading...</div>
        )
      }
      if (vendor === this.props.details.currentVendor) {
        return (
          <li className='list-group-item' data-vendor={vendor.name}>
            <Vendor vendor={vendor} convertStars={(rating) => this.convertStars(rating)} convertPrice={(price) => this.convertPrice(price)} />
            <DetailsContainer />
          </li>
        )
      }
      return (
        <li className='list-group-item' data-vendor={vendor.name}>
          <Vendor vendor={vendor} convertStars={(rating) => this.convertStars(rating)} convertPrice={(price) => this.convertPrice(price)} />
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
  return {addresses: state.addresses, vendors: state.vendors, details: state.details}
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorsContainer)
