import React from 'react'
import Geosuggest from 'react-geosuggest';
import MapsAddLocation from 'material-ui/svg-icons/maps/add-location';
import FlatButton from 'material-ui/FlatButton'

const styles = {
  'minWidth':'0px !important'
}

const AddressForm = ({onSubmit}) => {
  return (
    <form id='address-form' onSubmit={onSubmit}>
      <Geosuggest
      className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'
      placeholder="ENTER AN ADDRESS!"
      country='us'
      />
      <FlatButton style={styles} type='submit' icon={<MapsAddLocation />} />
    </form>
  )
}

export default AddressForm
