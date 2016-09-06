import React from 'react'

const Vendors = ({vendors}) => {
  var vendorsWithDetails = vendors.map(vendor => {
    var location = vendor.location
    return (
      <div>
        <div><a href={vendor.url} target='_blank'>{vendor.name}</a></div>
        <div>{vendor.rating} stars with {vendor.review_count} reviews</div>
        <div>{location.address[0]}</div>
        <div>{location.city}, {location['state_code']} {location['postal_code']}</div>
        <div>{vendor['display_phone']}</div>
      </div>
    )
  })
  return <div>{vendorsWithDetails}</div>
}

export default Vendors
