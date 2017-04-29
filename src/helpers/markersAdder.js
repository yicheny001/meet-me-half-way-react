import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addMarkers, adjustMarkers } from '../actions/map'
import { addCurrentVendor } from '../actions/details'

const MarkersAdder = class extends Component {

  componentWillUpdate(nextProps) {
    if (this.props.travelMode !== nextProps.travelMode) {
      return false
    }
    var { allVendors, displayedVendors, type } = nextProps.vendors
    if (type === 'add') {
      this.props.addMarkers({allVendors, displayedVendors, onClick: this.handleClick.bind(this)})
    } else if (type === 'adjust') {
      this.props.adjustMarkers(displayedVendors)
    }
  }

  handleClick(currentVendor) {
    var { addCurrentVendor, travelMode } = this.props
    addCurrentVendor({currentVendor, travelMode})
    this.scrollTo(currentVendor)
  }

  scrollTo(vendor) {
    document.getElementById(`${vendor.name}`).scrollIntoView()
  }

  render() {
    return null
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addMarkers, adjustMarkers, addCurrentVendor}, dispatch)
}

function mapStateToProps(state) {
  return {vendors: state.vendors, travelMode: state.details.travelMode}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkersAdder)
