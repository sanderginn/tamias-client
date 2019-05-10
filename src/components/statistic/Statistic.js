import React from 'react';
import Card from 'react-bootstrap/Card';

const Statistic = ({ title, value, prefix }) => {
  return (
    <Card style={{ textAlign: 'center'}} >
      <Card.Header style={{ fontSize: '0.75em'}}>{title}</Card.Header>
      <Card.Body as='h5'>{(prefix ? prefix : null) + value}</Card.Body>
    </Card>
  )
}

export default Statistic;