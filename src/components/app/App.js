import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BudgetGrid } from '../budgetgrid/BudgetGrid';
import { BudgetOverview } from '../budgetoverview/BudgetOverview';
import './App.css';

export const App = () => {

  const [data, setData] = useState({ budget: undefined, categories: [], isFetching: true });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios('/find_categories_transactions_by_budgetId', {
        params: {
          budgetId: 1
        }
      });

      response.data.budget.startDate = moment(response.data.budget.startDate);
      response.data.budget.endDate = moment(response.data.budget.endDate);

      const categories = response.data.categories;

      setData({
        budget: response.data.budget,
        categories: response.data.categories,
        budgeted: Object.keys(categories)
          .reduce((acc, key) => acc + parseFloat(categories[key].budgetedAmount), 0.)
          .toFixed(2),
        spent: Object.keys(categories)
          .reduce((acc, key) => acc + categories[key].transactions
            .reduce((t_acc, transaction) => t_acc + parseFloat(transaction.amount), 0.), 0.)
          .toFixed(2),
        remainderLastPeriod: 0., //TODO
        isFetching: false
      });
    }

    fetchData();
  }, []);

  const daysLeft = data.isFetching ? undefined : data.budget.endDate.diff(moment(), 'days');

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

      {data.isFetching ?
        (<div>Loading...</div>) :
        <Container style={{ marginTop: '20px' }}>
                  {console.log(data)}
          <BudgetOverview
            startDate={data.budget.startDate}
            endDate={data.budget.endDate}
            daysLeft={daysLeft}
            availableFunds={data.budgeted + data.remainderLastPeriod - data.spent}
            remainderLastPeriod={data.remainderLastPeriod} // TODO
            budgeted={data.budgeted}
            spent={data.spent}
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