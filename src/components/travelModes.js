import React from 'react'

const TravelModes = ({handleClick}) => {
  return (
    <div>
      <a href='#' data-mode='DRIVING' onClick={handleClick}> Driving </a>
      <a href='#' data-mode='WALKING' onClick={handleClick}> Walking </a>
      <a href='#' data-mode='TRANSIT' onClick={handleClick}> Transit </a>
    </div>
  )
}

export default TravelModes
