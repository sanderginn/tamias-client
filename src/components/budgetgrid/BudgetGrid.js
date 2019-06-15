import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BudgetCategory } from '../budgetcategory/BudgetCategory';

export const BudgetGrid = ({ data, daysLeft }) => {
  return (
    <Row>
      {
        Object.keys(data.categories)
          .sort((curr, next) => (curr.group > next.group) ? 1 : -1)
          .map((key, index) =>
            <Col xs="12" sm="6" md="6" lg="4" className="mb-3" key={index}>
              <BudgetCategory
                category={data.categories[key]}
                budgeted={data.budgetedAmounts[key]}
                spent={data.transactions[key].reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0.)}
                daysLeft={daysLeft}
                key={index}
              />
            </Col>
          )
      }
    </Row>
  )
};