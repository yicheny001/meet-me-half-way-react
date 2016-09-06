import React from 'react'

const TravelModes = ({handleClick}) => {
  return (
    <div>
      <a href='#' onClick={handleClick}>DRIVING</a>
      <a href='#' onClick={handleClick}>WALKING</a>
      <a href='#' onClick={handleClick}>TRANSIT</a>
    </div>
  )
}

export default TravelModes
