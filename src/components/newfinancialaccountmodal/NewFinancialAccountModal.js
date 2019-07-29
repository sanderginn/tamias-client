import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const NewFinancialAccountModal = (props) => {

  const [name, setName] = useState('');

  return (
    <Modal {...props} centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">New account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control 
          id="accountName" 
          type="text" 
          placeholder="Account name" 
          value={name} 
          onChange={(e) =>  {
            setName(e.target.value)}
          } 
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={async () =>  {
          var response = await props.onSubmit(name);
          console.log(response);
          if (response !== undefined) {
            console.log(response);
          }
        }}>Submit</Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}