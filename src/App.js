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
      <div id='allStyles'>
        <div id='map'></div>
        <ErrorContainer />
        <HeaderContainer />
        <VendorsAdder />
        <VendorsContainer />
        <DetailsContainer />
        <MapAdder />
        <div className='forms'>
        <EnterAddressForm />
        <YelpForm />
        </div>
        <footer>Meet Me Halfway (c)
        Made by Leandro Araneta & Yichen Yang</footer>

      </div>
    )
  }
}

export default App;
