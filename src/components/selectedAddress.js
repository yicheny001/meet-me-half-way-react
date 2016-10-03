import React from 'react'
import {List, ListItem} from 'material-ui/List';
import {yellow600} from 'material-ui/styles/colors';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const styles = {
  li: {padding: '2px 30px 2px 2px'},
  button: {margin: '0px'}
}

const SelectedAddress = ({address, remove}) => {
  return (
     <ListItem
     className='capCalibri'
     insetChildren={false}
     innerDivStyle={styles.li}
     primaryText={address.name}
     rightIcon={<ActionDelete style={styles.button} color={yellow600} onClick={remove} />}
     />
  )
}

export default SelectedAddress
