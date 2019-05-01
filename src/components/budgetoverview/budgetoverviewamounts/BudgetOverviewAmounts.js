import React from 'react';
import { Table, Grid } from 'semantic-ui-react';
import styles from '../../../styles';

const amountsStyle = {
  backgroundColor: styles.colors.mid
};

const notBold = {
  fontWeight: 200
};

export const BudgetOverviewAmounts = () => {
  return (
    <Table.HeaderCell colSpan='3' textAlign="center" style={amountsStyle}>
      <Grid columns={2} >
        <Grid.Row>
          <Grid.Column textAlign='right' width={8}>€1000</Grid.Column>
          <Grid.Column textAlign='left' width={8} style={notBold}>Available Funds</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='right' width={8}>€-100</Grid.Column>
          <Grid.Column textAlign='left' width={8} style={notBold}>Overspent Last Month</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='right' width={8}>€950</Grid.Column>
          <Grid.Column textAlign='left' width={8} style={notBold}>Budget</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='right' width={8}>€50</Grid.Column>
          <Grid.Column textAlign='left' width={8} style={notBold}>For Next Month</Grid.Column>
        </Grid.Row>
      </Grid>
    </Table.HeaderCell>
  )
};