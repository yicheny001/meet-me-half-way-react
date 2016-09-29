import React from 'react'
import MapsDirectionsWalk from 'material-ui/svg-icons/maps/directions-walk';
import MapsDirectionsTransit from 'material-ui/svg-icons/maps/directions-transit';
import MapsDirectionsCar from 'material-ui/svg-icons/maps/directions-car';
import {red500, yellow500, deepOrange500, blue500} from 'material-ui/styles/colors';

const TravelModes = ({handleClick}) => {
  return (
    <div className='travel-modes'>
      <MapsDirectionsCar id='DRIVING' color={deepOrange500} hoverColor={yellow500} onClick={handleClick} /> &nbsp;
      <MapsDirectionsWalk id='WALKING' color={deepOrange500} hoverColor={yellow500} onClick={handleClick} /> &nbsp;
      <MapsDirectionsTransit id='TRANSIT' color={deepOrange500} hoverColor={yellow500} onClick={handleClick} />
    </div>
  )
}

export default TravelModes
