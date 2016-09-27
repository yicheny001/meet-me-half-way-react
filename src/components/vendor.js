import React, {Component} from 'react'
import Star from 'material-ui/svg-icons/toggle/star';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

const iconStyles = {
  marginRight: 24,
};


const Vendor = ({vendor, convertStars}) => {
  var location = vendor.location
  var rating = vendor.rating

  return (
    <div id={vendor.id}>
      <div><a href={vendor.url} target='_blank'>{vendor.name}</a></div>
      <div>{convertStars(rating)} with {vendor.review_count} reviews</div>
      <div>{location.address[0]}</div>
      <div>{location.city}, {location['state_code']} {location['postal_code']}</div>
      <div>{vendor['display_phone']}</div>
    </div>
  )
}

export default Vendor
