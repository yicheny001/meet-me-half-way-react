import React from 'react'
import MapsDirectionsWalk from 'material-ui/svg-icons/maps/directions-walk';
import MapsDirectionsTransit from 'material-ui/svg-icons/maps/directions-transit';
import MapsDirectionsCar from 'material-ui/svg-icons/maps/directions-car';

import {red500, yellow500, deepOrange500,blue500} from 'material-ui/styles/colors';

const iconStyles = {
  marginRight: 24,
};

const TravelModes = ({handleClick}) => {
  return (
    <div>
      <MapsDirectionsWalk id='WALKING' style={iconStyles} color={deepOrange500} hoverColor={yellow500} onClick={handleClick} />
      <MapsDirectionsTransit id='TRANSIT' style={iconStyles} color={deepOrange500} hoverColor={yellow500} onClick={handleClick} />
      <MapsDirectionsCar id='DRIVING' style={iconStyles} color={deepOrange500} hoverColor={yellow500} onClick={handleClick} />
    </div>
  )
}

export default TravelModes
