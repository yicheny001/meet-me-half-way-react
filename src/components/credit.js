import React, {Component} from 'react'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';


const style = {
  margin: 12,
};

const Credit = () => {


  return(
    <div>
    <FlatButton
      href="https://github.com/callemall/material-ui"
      secondary={true}
      icon={<FontIcon className="muidocs-icon-custom-github" />}
      style={style}
    />
    </div>
  )
}



export default Credit
