import React, { useState } from 'react';
import './App.css';

import { Layout, Menu, Icon, Row, Col, Card } from 'antd';

import { BudgetGroup } from '../budgetgroup/BudgetGroup';
import { BudgetCategory } from '../budgetcategory/BudgetCategory';
import { BudgetOverview } from '../budgetoverview/BudgetOverview';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const data = [{
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

const rowStyle = {
  marginBottom: '24px'
};

const daysLeft = 13;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
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

            <Content style={{ margin: '0 16px' }}>
              <Row style={rowStyle}>
                <Col span={24}>
                  <Card title="Overview">Content</Card>
                </Col>
              </Row>
              <Row gutter={24} style={rowStyle}>
                <Col span={6}>
                  <BudgetCategory props={data[0]} daysLeft={daysLeft} />
                </Col>
                <Col span={6}>
                  <BudgetCategory props={data[1]} daysLeft={daysLeft} />
                </Col>
                <Col span={6}>
                  <BudgetCategory props={data[2]} daysLeft={daysLeft} />
                </Col>
                <Col span={6}>
                  <BudgetCategory props={data[3]} daysLeft={daysLeft} />
                </Col>
              </Row>
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