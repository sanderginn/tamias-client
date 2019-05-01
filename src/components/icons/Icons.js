import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';

export const DeleteIcon = (props) => {
  return (
    <Icon 
      name='times'
      size='small'
      style={{ visibility: props.hovering ? 'visible' : 'hidden' }}
    />
  )
};

export const AddIcon = (props) => {
  const style = {
    visibility: props.hovering ? 'visible' : 'hidden'
  }

  return (
    <Popup trigger={
      <Icon 
        name='plus'
        size='small'
        style={style}
      />
    }
    content="Add new category to group"
    basic
    />
  )
};