import React, { Component } from 'react';
import EnterAddressForm from './forms/enterAddressForm'
import YelpForm from './forms/yelpForm'
import ErrorContainer from './containers/errorContainer'
import HeaderContainer from './containers/headerContainer'
import MapAdder from './helpers/mapAdder'
import VendorsAdder from './helpers/vendorsAdder'
import VendorsContainer from './containers/vendorsContainer'
import DetailsContainer from './containers/detailsContainer'
import './App.css';

const App = class extends Component {
  render() {
    return (
      <div>
        Meet Me Halfway
        <EnterAddressForm />
        <YelpForm />
        <ErrorContainer />
        <HeaderContainer />
        <MapAdder />
        <div id='map'></div>
        <VendorsAdder />
        <VendorsContainer />
        <DetailsContainer />
      </div>
    )
  }
}

export default App;
