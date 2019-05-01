import React from 'react';
import { Table } from 'semantic-ui-react';
import { BudgetOverviewAmounts } from './budgetoverviewamounts/BudgetOverviewAmounts';

export const BudgetOverview = () => {
  return(
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell rowSpan='4' style={{background: "white"}}/>
        <Table.HeaderCell colSpan='3' textAlign="center" style={{border: "1px solid rgba(34,36,38,.15)"}}><h2>Month</h2></Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <BudgetOverviewAmounts />
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell colSpan='3' textAlign="center">Overbudgeted</Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell>Budgeted</Table.HeaderCell>
        <Table.HeaderCell>Spent</Table.HeaderCell>
        <Table.HeaderCell>Balance</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  )
}