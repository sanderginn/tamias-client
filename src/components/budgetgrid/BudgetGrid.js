import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BudgetCategory } from '../budgetcategory/BudgetCategory';

export const BudgetGrid = ({ categories, daysLeft }) => {
  return (
    <Row>
      {
        categories
          .sort((curr, next) => (curr.group > next.group) ? 1 : -1)
          .map((category, index) =>
          <Col xs="12" sm="6" md="6" lg="4" className="mb-3" key={index}>
            <BudgetCategory props={category} daysLeft={daysLeft} key={index} />
          </Col>
        )
      }
    </Row>
  )
}

