import React, { useState } from 'react';
import './App.css';

import { Layout, Menu, Icon, Row, Col } from 'antd';

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
  
  generateCategoryRows(numCols) {
    return categories
      .map((category, index) => <BudgetCategory props={category} daysLeft={daysLeft} key={index}/>)
      .reduce(function(rows, category) {
        let lastIndex = rows.length - 1;
        let nextCol = 
          <Col span={24/numCols} key={rows[lastIndex].length}>
            {category}
          </Col>;       
        
        if (rows[lastIndex].length < numCols) {
          rows[lastIndex].push(nextCol);
        } else {
          rows.push([nextCol]);
        }
        
        return rows;
      }, [[]])
      .map((rowCategories, index) => {
        return (
          <Row gutter={24} style={rowStyle} key={index}>
            {rowCategories}
          </Row>
        )
    });
  }

  render() {
    return (
      <div className='app'>
        <Layout style={{ minHeight: '100vh'}}>

          <Layout >
            <Header style={{ background: '#fff', padding: 0, marginBottom: 10 }} />

            <Content style={{ margin: '0 25%', maxWidth: '60%' }}>
              <Row style={rowStyle}>
                <Col span={24}>
                  <BudgetOverview 
                    startDate={startDate} 
                    endDate={endDate} 
                    daysLeft={daysLeft}
                    availableFunds={data.availableFunds}
                    remainderLastPeriod={data.remainder}
                    budgeted={categories.reduce((acc, category) => acc + category.budgeted, 0.)}
                    spent={categories.reduce((acc, category) => acc + category.spent, 0.)}
                  />
                </Col>
              </Row>

              {
                this.generateCategoryRows(3)
              }
              
            </Content>

            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
                  
        </Layout>
      </div>
    );
  }
}

export default App;