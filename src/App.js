import React, { Component } from 'react';
import EnterAddressContainer from './components/enterAddressContainer'
import SelectedAddressesContainer from './components/selectedAddressesContainer'
import YelpForm from './components/yelpForm'
import Map from './components/map'
import './App.css';

const App = class extends Component {
  render() {
    return (
      <div>
        Meet Me Halfway
        <EnterAddressContainer />
        <SelectedAddressesContainer />
        <YelpForm />
        <Map />
      </div>
    )
  }
}

export default App;
