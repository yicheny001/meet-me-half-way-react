import React, { Component } from 'react';
import EnterAddressForm from './forms/enterAddressForm'
import YelpForm from './forms/yelpForm'
import ErrorContainer from './containers/errorContainer'
import HeaderContainer from './containers/headerContainer'
import MapAdder from './helpers/mapAdder'
import VendorsAdder from './helpers/vendorsAdder'
import VendorsContainer from './containers/vendorsContainer'
import DetailsContainer from './containers/detailsContainer'
import logo from './logo.png'

const App = class extends Component {
  render() {
    return (
      <div>
      <div id="sidebar-wrapper" className='aside' >
      <img className="image" src="http://s9.postimg.org/k6a8x8hsf/Screen_Shot_2016_09_20_at_8_56_15_PM.png" />
      <ErrorContainer />
      <EnterAddressForm />
      <HeaderContainer />
      <YelpForm />
      <VendorsContainer />
      <VendorsAdder />
      <DetailsContainer />
      </div>
      <div >
        <div id='map'></div>
        <MapAdder />
        </div>
      </div>
    )
  }
}

export default App;
