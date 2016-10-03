import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import SocialSentimentVerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import FontIcon from 'material-ui/FontIcon';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import FormsContainer from '../containers/formsContainer'
import ErrorContainer from '../containers/errorContainer'
import HeaderContainer from '../containers/headerContainer'
import VendorsContainer from '../containers/vendorsContainer'
import FiltersContainer from '../containers/filtersContainer'

const styles = {
  backgroundColor:'#2962FF'
}

export default class DrawerSidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open})

  scrollUp = () => document.getElementId('address-form').scrollIntoView()

  render() {
    return (
      <div>
        <FlatButton
          id='start'
          label="Meet Me"
          onTouchTap={this.handleToggle}
          backgroundColor="#fff"
          icon={<SocialSentimentVerySatisfied />}
        />
        <Drawer open={this.state.open} width='350' style={styles}>
          <MenuItem onTouchTap={this.handleToggle}>x</MenuItem>
          <div className='aside'>
            <img className="image" src="http://s9.postimg.org/k6a8x8hsf/Screen_Shot_2016_09_20_at_8_56_15_PM.png" />
            <ErrorContainer />
            <FormsContainer />
            <FiltersContainer />
            <HeaderContainer />
            <div id='results'/>
            <VendorsContainer />
          </div>
          <MenuItem onTouchTap={this.scrollUp}>BACK TO TOP</MenuItem>
        </Drawer>
      </div>
    );
  }
}
