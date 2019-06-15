import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import moment from 'moment';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { BudgetOverview } from '../budgetoverview/BudgetOverview';
import { BudgetGrid } from '../budgetgrid/BudgetGrid';

import { useState, useEffect } from 'react';
import axios from 'axios';

const categories = [{
  key: 1,
  name: 'Groceries',
  budgeted: 200.0,
  spent: 80.75,
  group: 'primary'
},
{
  key: 2,
  name: 'Lunch',
  budgeted: 1571.,
  spent: 31.50,
  group: 'warning'
},
{
  key: 3,
  name: 'Social',
  budgeted: 150.,
  spent: 183.24,
  group: 'primary'
},
{
  key: 4,
  name: 'Random shopping',
  budgeted: 217.61,
  spent: 107.98,
  group: 'info'
},
{
  key: 5,
  name: 'Foo',
  budgeted: 0.,
  spent: 0.,
  group: 'success'
}];

// const data = {
//   availableFunds: 2705.42,
//   remainder: -21.67
// };

export const App = () => {

  const [data, setData] = useState({ budget: undefined, categories: [], isFetching: true });

  useEffect(() => {
    const fetchData = async () => {
      const budgetResponse = await axios('/budgets/' + 1);
      const categoryBudgetAmountsResponse = await axios('/categorybudgetamounts/find_by_budget', {
        params: {
          budgetId: 1
        }
      });

      const categories = await categoryBudgetAmountsResponse.data.amounts
        .reduce(async (previous, amount) => {
          const category = await axios('/categories/' + amount.categoryId);
          (await previous)[amount.categoryId] = category.data.category;
          return previous;
        }, {});

      const budgetedAmounts = categoryBudgetAmountsResponse.data.amounts
        .reduce((previous, amount) => {
          previous[amount.categoryId] = amount.budgetedAmount;
          return previous;
        }, {});

      const transactions = await Object.keys(categories)
        .reduce(async (previous, key) => {
          const categoryId = categories[key].id
          const transactionsForCategory = await axios('/transactions/find_by_category', {
            params: {
              categoryId: categoryId
            }
          });
          (await previous)[categoryId] = transactionsForCategory.data.transactions;
          return previous;
        }, {});

      budgetResponse.data.budget.startDate = moment(budgetResponse.data.budget.startDate);
      budgetResponse.data.budget.endDate = moment(budgetResponse.data.budget.endDate);

      setData({
        budget: budgetResponse.data.budget,
        categories: categories,
        budgetedAmounts: budgetedAmounts,
        transactions: transactions,
        isFetching: false
      });
    }

    fetchData();
  }, []);

  const daysLeft = data.isFetching ? undefined : data.budget.endDate.diff(moment(), 'days');

  return (
    <div className='app'>
      {console.log(data)}
      <Navbar bg='dark' variant='dark' expand="lg" >
        <Container>
          <Navbar.Brand href="/">Tamias</Navbar.Brand>
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/budget">Budget</Nav.Link>
              <NavDropdown title="Accounts" id="navbar-accounts">
                <NavDropdown.Item href="/account/checking">Checking</NavDropdown.Item>
                <NavDropdown.Item href="/account/saving">Saving</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/newaccount">New account</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {data.isFetching ?
        (<div>Loading...</div>) :
        <Container style={{ marginTop: '20px' }}>
          <BudgetOverview
            startDate={data.budget.startDate}
            endDate={data.budget.endDate}
            daysLeft={daysLeft}
            availableFunds={data.availableFunds}
            remainderLastPeriod={data.remainder}
            budgeted={categories.reduce((acc, category) => acc + category.budgeted, 0.)}
            spent={categories.reduce((acc, category) => acc + category.spent, 0.)}
          />

          <BudgetGrid
            data={data}
            daysLeft={daysLeft}
          />
        </Container>
      }
    </div>
  );
}

export default App;