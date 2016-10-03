import React, {Component} from 'react'
import Star from 'material-ui/svg-icons/toggle/star';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function openNow(vendor){
  if(vendor.hours){
    return <div>{vendor.hours.status}</div>
  }
}

function convertPrice(vendor){
  if(vendor.price){
    let price = vendor.price.tier
    let array = []
      for(var i = 0; i < (price); i++){
          array.push('$')
      }
    return array
  }
}

function convertStars(rating){
  let array = []
    for(var i = 0; i < (rating/2); i++){
        array.push(<Star color={yellow500}/>)
    }
  return array
}

const Vendor = ({vendor}) => {
  var { location, rating } = vendor
  return (
    <div id={vendor.name}>
      <div><a href={vendor.url} target='_blank'>{vendor.name}</a>&nbsp; <span className='price'>{convertPrice(vendor)}</span></div>
      <div>{convertStars(rating)} with {numberWithCommas(vendor.ratingSignals)} reviews</div>
      <div>{location.address}</div>
      <div>{location.city}, {location.state} {location.postalCode}</div>
      <div>{vendor.contact.formattedPhone}</div>
      {openNow(vendor)}
      {/* <div>{vendor.hours.status}</div>
      <div>{vendor.menu.url}</div> */}
    </div>
  )
}

export default Vendor
