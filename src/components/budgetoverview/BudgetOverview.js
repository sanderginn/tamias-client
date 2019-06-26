import React from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Statistic from '../statistic/Statistic';

export const BudgetOverview = ({ startDate, endDate, daysLeft, availableFunds, remainderLastPeriod, budgeted, spent }) => {
  const forNextMonth = (remainderLastPeriod - budgeted).toFixed(2);

  return (
    <Row className="mb-4">
      <Col>
        <Card border='dark'>
          <Card.Body>
            <Row>
              <Col xs="12" sm="3" className='text-center align-self-center mb-4 mb-sm-0'>
                <h3 className='align-middle'>{startDate.format('MMM Do')} - {endDate.format('MMM Do')}</h3>
                <h6 className='align-middle'>Days left: {daysLeft}</h6>
              </Col>

              <Col xs="12" sm="2" className="mb-4 mb-sm-0">
                <Statistic title='Remaining budget' value={spent} prefix='€' />
              </Col>

              <Col xs="12" sm="3" className="mb-4 mb-sm-0">
                
              </Col>

              <Col xs="12" sm="4" className="mb-4 mb-sm-0 align-self-center">
                <Row>
                  <Col xs="4" className='text-right font-weight-bold'>{availableFunds}</Col>
                  <Col xs="8">Available funds</Col>
                </Row>
                <Row>
                  <Col
                    xs="4"
                    className={'text-right font-weight-bold ' + (remainderLastPeriod < 0.0 && 'text-danger')}
                  >
                    {remainderLastPeriod}
                  </Col>
                  <Col xs="8">{remainderLastPeriod < 0.0 ? "Overspent last period" : "Left over from last period"}</Col>
                </Row>
                <Row>
                  <Col xs="4" className='text-right font-weight-bold'>{budgeted}</Col>
                  <Col xs="8" >Total budgeted</Col>
                </Row>
                <Row>
                  <Col
                    xs="4"
                    className={'text-right font-weight-bold ' + (forNextMonth < 0.0 && 'text-danger')}
                  >
                    {forNextMonth}
                  </Col>
                  <Col xs="8">For next month</Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}