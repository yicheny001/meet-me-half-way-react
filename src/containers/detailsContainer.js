import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TravelModes from '../components/travelModes'
import Details from '../components/details'
import addLengths from '../actions/addLengths'
import changeTravelMode from '../actions/changeTravelMode'
import addError from '../actions/addError'
import DistanceMatrix from '../modules/distanceMatrix'
import Popover from 'material-ui/Popover';

const DetailsContainer = class extends Component {

  constructor(props) {
   super(props);

   this.state = {
     open: false,
   };
 }

  handleRequestClose = () => {
   this.setState({
     open: false,
   });
 };

  componentWillMount() {
    var {lat, lng} = this.props.details.currentVendor
    var destination = {lat, lng}
    DistanceMatrix(this.props.addresses, destination, this.props.details.travelMode, this.callback.bind(this))
  }

  componentWillUpdate(nextProps) {
    if (this.props.details.travelMode === nextProps.details.travelMode) {
      return false
    }
    var {lat, lng} = nextProps.details.currentVendor
    var destination = {lat, lng}
    DistanceMatrix(this.props.addresses, destination, nextProps.details.travelMode, this.callback.bind(this))
    return true
  }

  callback(response, status) {
    var lengths = response.rows.map(row => {
      var element = row.elements[0]
      if (element.status === "ZERO_RESULTS") {
        return 'This form of transit is not available'
      }
      return `${element.distance.text} / ${element.duration.text} away`
    })
    this.props.addLengths(lengths)

  }

  handleClick(event) {
    var travelMode = event.target.parentElement.id
    this.props.changeTravelMode(travelMode)
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
   this.setState({
     open: false,
   });
 };


  render() {
    if (this.props.details.lengths.length > 0) {
      var detailsForAddresses = []
      for (var i = 0; i < this.props.addresses.length; i++) {
        detailsForAddresses.push(<Details
          address={this.props.addresses[i]}
          length={this.props.details.lengths[i]}
          />)
      }
      return (
        <div>
        {/* <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        > */}
          <TravelModes handleClick={this.handleClick.bind(this)} />
          {detailsForAddresses}
          {/* </Popover> */}
        </div>
      )
    } else {
      return null
    }
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addLengths, changeTravelMode, addError}, dispatch)
}

function mapStateToProps(state) {
  return {addresses: state.addresses, details: state.details}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer)
