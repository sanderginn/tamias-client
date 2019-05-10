import React, { useState, useRef, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

export const BudgetCategory = ({ props, daysLeft }) => {

  const [editModeEnabled, setEditMode] = useState(false);
  const budgetRef = useRef();
  
  const handleBudgetClick = e => {
    if (budgetRef.current.contains(e.target)) {
      return;
    }

    setEditMode(false);
    setBudgetInput(budgetValue);
  }

  const [budgetValue, setBudgetValue] = useState(props.budgeted);
  const [budgetInput, setBudgetInput] = useState(budgetValue);

  useEffect(() => {
    document.addEventListener("mousedown", handleBudgetClick);

    return () => {
      document.removeEventListener("mousedown", handleBudgetClick);
    };
  }, [budgetValue]);

  function onKeyPress(e) {
    if (e.key === 'Enter') {
      setBudgetValue(parseFloat(e.target.value));
      setEditMode(false);
    }
  }
  
  function balance() {
    return props.budgeted - props.spent;
  }

  return (
    <Card border={props.group} style={{ borderWidth: '2px' }}>
      <Card.Header>{props.name}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          {'Budgeted: '}
          <div
            style={{ display: 'inline-block' }}
            ref={budgetRef}
            onClick={() => setEditMode(true)}
          >
            {
              editModeEnabled ?
                <Form.Control 
                  style={{ height: '1.5rem' }}
                  value={budgetInput}
                  onChange={e => {
                    setBudgetInput(parseFloat(e.target.value));
                  }}
                  onKeyPress={onKeyPress}
                /> :
                budgetValue.toFixed(2)
            }
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          Spent: {props.spent.toFixed(2)}
        </ListGroup.Item>
        <ListGroup.Item>
          Balance: {balance().toFixed(2)}
        </ListGroup.Item>
        <ListGroup.Item>
          Per day: {balance() > 0.0 ? (balance() / daysLeft).toFixed(2) : 0.00}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}