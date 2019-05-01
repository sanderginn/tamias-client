import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { BudgetGroup } from '../budgetgroup/BudgetGroup';
import { BudgetCategory } from '../budgetcategory/BudgetCategory';
import { BudgetOverview } from '../budgetoverview/BudgetOverview';

import { Table, Menu, Grid, Button, Icon, Container } from "semantic-ui-react";

class App extends React.Component {

  render() {
    const tableStyle = { border: "none" };
    const tableBodyStyle = {border: "1px solid rgba(34,36,38,.15)"};
    return (
      <div className="App">
        <Grid padded className="tablet computer only">
          <Menu borderless fluid inverted size="huge">
            <Container>
              <Menu.Item header as="a" href="#root">
                Project Name
              </Menu.Item>
              <Menu.Item active as="a" href="#root">
                Home
              </Menu.Item>
              <Menu.Item as="a" href="#root">
                About
              </Menu.Item>
              <Menu.Item as="a" href="#root">
                Contact
              </Menu.Item>
            </Container>
          </Menu>
        </Grid>
        <Grid padded className="mobile only">
          <Menu borderless fluid inverted size="huge">
            <Menu.Item header as="a" href="#root">
              Project Name
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Button
                  icon
                  inverted
                  basic
                  toggle
                >
                  <Icon name="content" />
                </Button>
              </Menu.Item>
            </Menu.Menu>
            <Menu
              borderless
              fluid
              inverted
              vertical
            >
              <Menu.Item active as="a" href="#root">
                Home
              </Menu.Item>
              <Menu.Item as="a" href="#root">
                About
              </Menu.Item>
              <Menu.Item as="a" href="#root">
                Contact
              </Menu.Item>
            </Menu>
          </Menu>
        </Grid>
        <Container text textAlign="center">
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
        </Container>
      
      </div>
    );
  }
}

export default App;