import React, { Component } from 'react';
import EnterAddressContainer from './components/enterAddressContainer'
import YelpForm from './components/yelpForm'
import HeaderContainer from './components/headerContainer'
import Map from './components/map'
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
      </div>
    )
  }
}

export default App;
