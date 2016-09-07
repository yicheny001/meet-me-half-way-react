import React, { Component } from 'react';
import EnterAddressContainer from './containers/enterAddressContainer'
import YelpForm from './containers/yelpForm'
import HeaderContainer from './containers/headerContainer'
import MapContainer from './containers/mapContainer'
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
        <MapContainer />
        <VendorsContainer />
        <DetailsContainer />
      </div>
    )
  }
}

export default App;
