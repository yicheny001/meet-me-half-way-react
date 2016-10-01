import React, {Component} from 'react'
import Star from 'material-ui/svg-icons/toggle/star';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

const iconStyles = {
  marginRight: 24,
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const Vendor = ({vendor, convertStars}) => {
  var location = vendor.location
  var rating = vendor.rating
  // var price = vendor.price.tier
  return (
    <div id={vendor.name}>
      <div><a href={vendor.url} target='_blank'>{vendor.name}</a></div>
      <div>{convertStars(rating)} with {numberWithCommas(vendor.ratingSignals)} reviews</div>
      {/* <div>{convertPrice(price)}</div> */}
      <div>{location.address}</div>
      <div>{location.city}, {location.state} {location.postalCode}</div>
      <div>{vendor.contact.formattedPhone}</div>
      {/* <div>{vendor.hours.status}</div>
      <div>{vendor.menu.url}</div> */}
    </div>
  )
}

export default Vendor
