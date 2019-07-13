import React from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export const BudgetOverview = ({ startDate, endDate, daysLeft, income, remainderLastPeriod, budgeted, savingsGoal, savedThisMonth, spent }) => {
  const remainingBudget = (income + remainderLastPeriod - budgeted).toFixed(2);
  const savingsDiff = (savedThisMonth - savingsGoal).toFixed(2);

  return (
    <Row className="mb-4">
      <Col>
        <Card border='dark'>
          <Card.Body>
            <Row>
              <Col xs="12" sm="4" className='text-center align-self-center mb-4 mb-sm-0'>
                <h3 className='align-middle'>{startDate.format('MMM Do')} - {endDate.format('MMM Do')}</h3>
                <h6 className='align-middle'>Days left: {daysLeft}</h6>
              </Col>

              <Col xs="12" sm="4" className="mb-4 mb-sm-0 align-self-center">
                <Row>
                  <Col xs="4" className='text-right font-weight-bold'>{income}</Col>
                  <Col xs="8">Income</Col>
                </Row>
                <Row>
                  <Col
                    xs="4"
                    className={'text-right font-weight-bold ' + (remainderLastPeriod < 0.0 && 'text-danger')}
                  >
                    {remainderLastPeriod}
                  </Col>
                  <Col xs="8">{remainderLastPeriod < 0.0 ? "Overspent previous period" : "Remainder previous period"}</Col>
                </Row>
                <Row>
                  <Col xs="4" className='text-right font-weight-bold'>{budgeted}</Col>
                  <Col xs="8" >Total budgeted</Col>
                </Row>
                <Row>
                  <Col
                    xs="4"
                    className={'text-right font-weight-bold ' + (remainingBudget < 0.0 && 'text-danger')}
                  >
                    {remainingBudget}
                  </Col>
                  <Col xs="8">Remaining budget</Col>
                </Row>
              </Col>

              <Col xs="12" sm="4" className="mb-4 mb-sm-0 align-self-center">
                <Row>
                  <Col xs="4" className='text-right font-weight-bold'>{savingsGoal}</Col>
                  <Col xs="8">Savings goal</Col>
                </Row>

                <Row>
                  <Col xs="4" className='text-right font-weight-bold'>{savedThisMonth}</Col>
                  <Col xs="8" >Saved this month</Col>
                </Row>

                <Row>
                  <Col
                    xs="4"
                    className={'text-right font-weight-bold ' + (savingsDiff < 0.0 && 'text-danger')}
                  >
                    {savingsDiff}
                  </Col>
                  <Col xs="8">Savings {savingsDiff < 0.0 ? "deficit" : "surplus"}</Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}