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

        <Container style={{ marginTop: '20px' }}>
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
            daysLeft={daysLeft}
          />
        </Container>
      </div>
    );
  }
}

export default App;