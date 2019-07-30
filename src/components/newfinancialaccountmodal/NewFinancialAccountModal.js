import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

export const NewFinancialAccountModal = (props) => {

  const handleOnClick = async () => {
    var response = await props.onSubmit(name.trim());

    if (response !== undefined) {
      setErrors(response.errors.map(e => e.message));
    } else {
      setErrors([]);
    }

    setName('');
  }

  const [errors, setErrors] = useState([]);
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
          onChange={(e) => setName(e.target.value)}
        />
        {
          errors.length !== 0 &&
          <Alert variant={'danger'} style={{ marginTop: "1rem" }}>
            <ul style={{ marginBottom: 0 }}>
              {errors.map((e, index) => <li key={index}>{e}</li>)}
            </ul>
          </Alert>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleOnClick}>Submit</Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}