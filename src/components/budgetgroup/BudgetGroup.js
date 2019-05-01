import React, { useState } from 'react';
import { Table, Grid } from 'semantic-ui-react';
import styles from '../../styles';
import { DeleteIcon, AddIcon } from '../icons/Icons';

const rowStyle = {
  backgroundColor: styles.colors.mid
};

export const BudgetGroup = () => {
  const [hovering, setHovering] = useState(false);

  return (
    <Table.Row 
      style={rowStyle} 
      onMouseEnter={() => setHovering(true)} 
      onMouseLeave={() => setHovering(false)}
    >
      <Table.Cell>
        <Grid columns={3}>
          <Grid.Column width={2}>
            <DeleteIcon hovering={hovering} />
          </Grid.Column>
          <Grid.Column width={12} style={styles.noPaddingLeft}>Group name</Grid.Column>
          <Grid.Column width={2} style={styles.extraPaddingRight}>
            <AddIcon hovering={hovering} />
          </Grid.Column>
        </Grid>
      </Table.Cell>
      <Table.Cell>Budgeted</Table.Cell>
      <Table.Cell>Spent</Table.Cell>
      <Table.Cell>Balance</Table.Cell>
    </Table.Row>
  )
}