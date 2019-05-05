import React from 'react';
import { Card, Col, Row, Statistic, Typography } from 'antd';

export const BudgetOverview = ({startDate, endDate, daysLeft, availableFunds, remainderLastPeriod, budgeted}) => {

  const forNextMonth = (availableFunds + remainderLastPeriod - budgeted).toFixed(2);

  return(
    <Card>
      <Row>
        <Col span={8}>
          <Row>
            <Col span={8}>
              <Statistic 
                title='From'
                value={startDate.format('MMM Do')}
              />
            </Col>
            <Col span={8}>
              <Statistic 
                title='To'
                value={endDate.format('MMM Do')}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title='Days left'
                value={daysLeft}
              />
            </Col>
          </Row>
        </Col>

        <Col span={8}>
          <Row gutter={12}>
            <Col 
              span={12} 
              style={{textAlign: 'end'}}
            >
              <Typography.Text strong>{availableFunds}</Typography.Text>
            </Col>
            <Col span={12}>Available funds</Col>
          </Row>
          <Row gutter={12}>
            <Col 
              span={12} 
              style={{textAlign: 'end'}}
            >
              <Typography.Text 
                strong
                type={remainderLastPeriod < 0.0 ? 'danger' : ''}
              >
                {remainderLastPeriod}
              </Typography.Text>
            </Col>            
            <Col span={12} >
              {remainderLastPeriod < 0.0 ? "Overspent last period" : "Left over from last period"}
            </Col>
          </Row>
          <Row gutter={12}>
            <Col 
              span={12} 
              style={{textAlign: 'end'}}
            >
              <Typography.Text strong>{budgeted}</Typography.Text>
            </Col>            
            <Col span={12}>Total budgeted</Col>
          </Row>
          <Row gutter={12}>
            <Col 
              span={12} 
              style={{textAlign: 'end'}}
            >
              <Typography.Text 
                strong
                type={forNextMonth < 0.0 ? 'danger' : ''}
              >
                {forNextMonth}
              </Typography.Text>
            </Col>            
            <Col span={12}>For next month</Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}