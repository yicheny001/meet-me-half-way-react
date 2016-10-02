import React, { Component } from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DrawerSidebar from './containers/drawerContainer'
import MapAdder from './helpers/mapAdder'
import VendorsAdder from './helpers/vendorsAdder'
import MarkersAdder from './helpers/markersAdder'
import { blue500 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    textColor: blue500,
  }
});


const App = class extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <DrawerSidebar/>
        <div id='map'></div>
        <MapAdder />
        <VendorsAdder />
        <MarkersAdder />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
