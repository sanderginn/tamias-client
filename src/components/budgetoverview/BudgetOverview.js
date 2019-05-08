import React from 'react';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import styles from '../../styles';

export const BudgetOverview = ({ startDate, endDate, daysLeft, availableFunds, remainderLastPeriod, budgeted, spent }) => {

  const forNextMonth = (availableFunds + remainderLastPeriod - budgeted).toFixed(2);
  const statisticStyle = {
    display: 'table',
    margin: '0 auto'
  };

  return (
    <Row style={styles.rowStyle}>
      <Col span={24}>
        <Card>
          <Row type='flex' justify='space-around' align='middle'>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Typography.Title level={2}>{startDate.format('MMM Do')} - {endDate.format('MMM Do')}</Typography.Title>
            </Col>

            <Col span={8}>
              <Row>
                <Col span={12}>
                  <Statistic
                    title='Days left'
                    value={daysLeft}
                    style={statisticStyle}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title='Remaining budget'
                    value={spent}
                    prefix={'€'}
                    decimalSeparator={','}
                    groupSeparator={'.'}
                    toFixed={2}
                    style={statisticStyle}
                  />
                </Col>
              </Row>
            </Col>

            <Col span={8}>
              <Row gutter={12}>
                <Col
                  span={12}
                  style={{ textAlign: 'end' }}
                >
                  <Typography.Text strong>{availableFunds}</Typography.Text>
                </Col>
                <Col span={12}>Available funds</Col>
              </Row>
              <Row gutter={12}>
                <Col
                  span={12}
                  style={{ textAlign: 'end' }}
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
                  style={{ textAlign: 'end' }}
                >
                  <Typography.Text strong>{budgeted}</Typography.Text>
                </Col>
                <Col span={12}>Total budgeted</Col>
              </Row>
              <Row gutter={12}>
                <Col
                  span={12}
                  style={{ textAlign: 'end' }}
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
      </Col>
    </Row>
  )
}