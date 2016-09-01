import React, { Component } from 'react';
import EnterAddress from './components/enterAddress'
import Map from './components/map'
import './App.css';

const App = class extends Component {
  render() {
    return (
      <div>
      Meet Me Halfway
      <EnterAddress />
      <Map />
      <div id='map'></div>
      </div>
    );
  }
}

export default App;
