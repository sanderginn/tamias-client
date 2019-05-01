import React, { useState } from 'react';
import { Grid, Table } from 'semantic-ui-react';
import styles from '../../styles';
import { DeleteIcon } from '../icons/Icons';

const style = {
  backgroundColor: styles.colors.light
};

export const BudgetCategory = () => {
  const [hovering, setHovering] = useState(false);

  return (
    <Table.Row 
      style={style}
      onMouseEnter={() => setHovering(true)} 
      onMouseLeave={() => setHovering(false)}
    >
      <Table.Cell>
        <Grid columns={2}>
          <Grid.Column width={2}>
            <DeleteIcon hovering={hovering} />
          </Grid.Column>
          <Grid.Column width={14} style={styles.noPaddingLeft}>Category name</Grid.Column>
        </Grid>
      </Table.Cell>
      <Table.Cell>Budgeted</Table.Cell>
      <Table.Cell>Spent</Table.Cell>
      <Table.Cell>Balance</Table.Cell>
    </Table.Row>
  )
}