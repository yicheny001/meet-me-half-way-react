import React, { Component } from 'react';
import EnterAddressContainer from './containers/enterAddressContainer'
import YelpForm from './containers/yelpForm'
import HeaderContainer from './containers/headerContainer'
import Map from './containers/map'
import VendorsContainer from './containers/vendorsContainer'
import DetailsContainer from './containers/detailsContainer'
import './App.css';

const App = class extends Component {
  render() {
    return (
      <div>
        Meet Me Halfway
        <EnterAddressContainer />
        <YelpForm />
        <HeaderContainer />
        <Map />
        <VendorsContainer />
        <DetailsContainer />
      </div>
    )
  }
}

export default App;
