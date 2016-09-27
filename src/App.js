import React, { Component } from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import EnterAddressForm from './forms/enterAddressForm'
import YelpForm from './forms/yelpForm'
import ErrorContainer from './containers/errorContainer'
import HeaderContainer from './containers/headerContainer'
import DrawerSimpleExample from './containers/drawerContainer'
import MapAdder from './helpers/mapAdder'
import VendorsAdder from './helpers/vendorsAdder'
import VendorsContainer from './containers/vendorsContainer'
import DetailsContainer from './containers/detailsContainer'
import logo from './logo.png'
import Credit from './components/credit'
import {blue500} from 'material-ui/styles/colors';

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
        <DrawerSimpleExample/>
        <div id='map'></div>
        <MapAdder />
        <DetailsContainer />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
