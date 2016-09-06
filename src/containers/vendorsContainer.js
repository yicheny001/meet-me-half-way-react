import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Vendors from '../components/vendors'

const VendorsContainer = class extends Component {

  render() {
    return <Vendors vendors={this.props.vendors}/>
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({}, dispatch)
}

function mapStateToProps(state) {
  return {vendors: state.vendors}
}

export default connect(mapStateToProps)(VendorsContainer)
