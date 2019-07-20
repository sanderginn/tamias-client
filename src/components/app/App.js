import axios from 'axios';
import moment from 'moment';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { LinkContainer } from 'react-router-bootstrap'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { BudgetGrid } from '../budgetgrid/BudgetGrid';
import { BudgetOverview } from '../budgetoverview/BudgetOverview';
import { FinancialAccount } from '../financialaccount/FinancialAccount';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export const App = () => {

  const [data, setData] = useState({ budget: undefined, categories: [], isFetching: true });

  const Budget = () => data.isFetching ?
    (<div>Loading...</div>) :
    (
      <Container style={{ marginTop: '20px' }}>
        <BudgetOverview
          startDate={data.budget.startDate}
          endDate={data.budget.endDate}
          daysLeft={daysLeft}
          income={data.income.transactions.reduce((t_acc, transaction) => t_acc + parseFloat(transaction.amount), 0.).toFixed(2)}
          remainderLastPeriod={data.remainderLastPeriod} // TODO
          budgeted={data.budgeted}
          savingsGoal={data.budget.goalAmountToSave}
          savedThisMonth={data.savings.transactions.reduce((t_acc, transaction) => t_acc + parseFloat(transaction.amount), 0.).toFixed(2)}
          spent={data.spent}
        />

        <BudgetGrid
          data={data}
          daysLeft={daysLeft}
        />
      </Container>
    );

  const Account = ({ match }) => data.isFetching ?
    (<div>Loading...</div>) :
    (
      <Container style={{ marginTop: '20px' }}>
        <FinancialAccount account={data.accounts[match.params.id]} />
      </Container>
    );


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios('/get_current_budget_by_userId', {
        params: {
          userId: 1
        }
      });

      response.data.budget.startDate = moment(response.data.budget.startDate);
      response.data.budget.endDate = moment(response.data.budget.endDate);

      const categories = response.data.categories;

      const accounts = response.data.accounts
        .reduce((obj, account) => {
          obj[account.id] = { transactions: [], ...account };
          return obj;
        }, {});

      response.data.transactions.map(transaction => {
        transaction.date = moment(transaction.date);
        return accounts[transaction.accountId].transactions.push(
          {
            categoryName: categories[transaction.categoryId].name,
            ...transaction
          }
        );
      });

      for (var key in categories) {
        if (categories[key].type !== "USER_DEFINED")
          delete categories[key];
      }

      setData(
        {
          budget: response.data.budget,
          categories: categories,
          budgeted: Object.keys(categories)
            .reduce((acc, key) => acc + parseFloat(categories[key].budgetedAmount), 0.)
            .toFixed(2),
          spent: Object.keys(categories)
            .reduce((acc, key) => acc + categories[key].transactions
              .reduce((t_acc, transaction) => t_acc + parseFloat(transaction.amount), 0.), 0.)
            .toFixed(2),
          income: response.data.income,
          savings: response.data.savings,
          accounts: accounts,
          remainderLastPeriod: 0., //TODO
          isFetching: false
        }
      );
    }

    fetchData();
  }, []);

  const daysLeft = data.isFetching ? undefined : data.budget.endDate.diff(moment(), 'days');

  return (
    <div className='app'>
      <Router>
        <Navbar bg='dark' variant='dark' expand="lg" >
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Tamias</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/">
                  <Nav.Link>Budget</Nav.Link>
                </LinkContainer>
                {!data.isFetching && <NavDropdown title="Accounts" id="navbar-accounts">
                  {
                    Object.keys(data.accounts)
                      .map((account, index) =>
                        <LinkContainer to={`/account/${data.accounts[account].id}`} key={index}>
                          <NavDropdown.Item>{data.accounts[account].name}</NavDropdown.Item>
                        </LinkContainer>
                      )
                  }
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/newaccount">New account</NavDropdown.Item>
                </NavDropdown>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Route exact path="/" component={Budget} />
        <Route path="/account/:id" component={Account} />
      </Router>
    </div>
  );
}

export default App;