import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/header.js'
import SelectedAddress from '../components/selectedAddress'
import removeAddress from '../actions/removeAddress'
import removeDetails from '../actions/removeDetails'
import removeError from '../actions/removeError'
import { List } from 'material-ui/List';

const HeaderContainer = class extends Component {

  componentDidUpdate() {
    this.props.removeDetails()
    this.props.removeError()
  }

  remove(event) {
    event.preventDefault()
    this.props.removeAddress(event.target.parentElement.nextSibling.innerHTML)
  }

  render() {
    var selectedAddresses = this.props.addresses.map((address,index) => <SelectedAddress address={address} remove={this.remove.bind(this)} key={index}/>)
    if (this.props.search.query) {
      return (
        <List>
          <Header search={this.props.search}/>
          {selectedAddresses}
        </List>
      )
    }
    return <div>{selectedAddresses}</div>
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({removeAddress, removeDetails, removeError}, dispatch)
}

function mapStateToProps(state) {
  return {addresses: state.addresses, search: state.search}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
