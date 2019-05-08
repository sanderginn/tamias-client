import React from 'react';
import './App.css';
import styles from '../../styles';

import { Layout, Row, Col } from 'antd';

import { BudgetOverview } from '../budgetoverview/BudgetOverview';
import { BudgetGrid } from '../budgetgrid/BudgetGrid';
import moment from 'moment';

const { Header, Content, Footer, Sider } = Layout;

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

const startDate = moment().date() > 25 ? moment().date(26) : moment().date(26).subtract(1, 'month');
const endDate = moment().date() > 25 ? moment().date(25).add(1, 'month') : moment().date(25);
const daysLeft = endDate.diff(moment(), 'days');

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Layout style={{ minHeight: '100vh' }}>

          <Layout >
            <Header style={{ background: '#fff', padding: 0, marginBottom: 10 }} />

            <Content style={{ margin: '0 25%', maxWidth: '60%' }}>

              <BudgetOverview
                startDate={startDate}
                endDate={endDate}
                daysLeft={daysLeft}
                availableFunds={data.availableFunds}
                remainderLastPeriod={data.remainder}
                budgeted={categories.reduce((acc, category) => acc + category.budgeted, 0.)}
                spent={categories.reduce((acc, category) => acc + category.spent, 0.)}
              />

              <BudgetGrid
                categories={categories}
                numCols={3}
                daysLeft={daysLeft}
              />

            </Content>

            <Footer style={{ textAlign: 'center' }}>
              Footer text
            </Footer>
          </Layout>

        </Layout>
      </div>
    );
  }
}

export default App;