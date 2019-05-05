import React, { useState } from 'react';
import './App.css';

import { Layout, Menu, Icon, Row, Col, Card } from 'antd';

import { BudgetCategory } from '../budgetcategory/BudgetCategory';
import { BudgetOverview } from '../budgetoverview/BudgetOverview';
import moment from 'moment';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const categories = [{
  key: 1,
  name: 'Groceries',
  budgeted: 200.0,
  spent: 80.75
},
{
  key: 2,
  name: 'Lunch',
  budgeted: 1571.,
  spent: 31.50
}, 
{
  key: 3,
  name: 'Social',
  budgeted: 150.,
  spent: 183.24
},
{
  key: 4,
  name: 'Random shopping',
  budgeted: 217.61,
  spent: 107.98
}];

const data = {
  availableFunds: 2705.42,
  remainder: -21.67
};

const rowStyle = {
  marginBottom: '24px'
};

const startDate = moment().date() > 25 ? moment().date(26) : moment().date(26).subtract(1, 'month');
const endDate = moment().date() > 25 ? moment().date(25).add(1, 'month') : moment().date(25);
const daysLeft = endDate.diff(moment(), 'days');

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  createRows(numCols) {
    return categories
      .map((category, index) => <BudgetCategory props={category} daysLeft={daysLeft} />)
      .reduce(function(rows, category) {
        if (rows[rows.length - 1].length < numCols) {
          rows[rows.length - 1].push(<Col span={24/numCols}>{category}</Col>);
        } else {
          rows.push([<Col span={24/numCols}>{category}</Col>]);
        }
        
        return rows;
      }, [[]])
      .map((category, index) => {
      return (
        <Row gutter={24} style={rowStyle}>
          { category.map((rowContent) => rowContent) }
        </Row>
      )
    });
  }

  render() {
    const tableStyle = { border: "none" };
    const tableBodyStyle = {border: "1px solid rgba(34,36,38,.15)"};

    return (
      <div className='app'>
        <Layout style={{ minHeight: '100vh'}}>
          <Sider
            collapsible
            collapsed={this.collapsed}
            onCollapse={this.onCollapse}
          >
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span>Option 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Option 2</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={<span><Icon type="user" /><span>User</span></span>}
              >
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={<span><Icon type="team" /><span>Team</span></span>}
              >
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <Icon type="file" />
                <span>File</span>
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout>
            <Header style={{ background: '#fff', padding: 0, marginBottom: 10 }} />

            <Content style={{ margin: '0 16px', maxWidth: '60%' }}>
              <Row style={rowStyle}>
                <Col span={24}>
                  <BudgetOverview 
                    startDate={startDate} 
                    endDate={endDate} 
                    daysLeft={daysLeft}
                    availableFunds={data.availableFunds}
                    remainderLastPeriod={data.remainder}
                    budgeted={categories.reduce((acc, category) => acc + category.budgeted, 0.)}
                  />
                </Col>
              </Row>

              {
                this.createRows(3)
              }
              
            </Content>

            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>

          {/* <Container text textAlign="center">
            <Table structured celled style={tableStyle}>
              <BudgetOverview />
              <Table.Body style={tableBodyStyle}>
                <BudgetGroup />
                <BudgetCategory />
                <BudgetCategory />
                <BudgetCategory />
                <BudgetGroup />
                <BudgetCategory />
                <BudgetCategory />
                <BudgetCategory />
              </Table.Body>
            </Table>
          </Container> */}
        
        </Layout>
      </div>
    );
  }
}

export default App;