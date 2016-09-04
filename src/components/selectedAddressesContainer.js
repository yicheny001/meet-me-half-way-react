import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import removeAddress from '../actions/removeAddress'
import SelectedAddresses from './selectedAddresses'

const SelectedAddressesContainer = class extends Component {

  remove(event) {
    event.preventDefault()
    this.props.removeAddress(event.target.previousSibling.innerHTML)
  }

  render() {
    return (
      <div>
        <SelectedAddresses remove={this.remove.bind(this)} addresses={this.props.addresses}/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({removeAddress}, dispatch)
}

function mapStateToProps(state) {
  return {addresses: state.addresses}
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedAddressesContainer)
