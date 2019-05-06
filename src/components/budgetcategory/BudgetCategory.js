import React, { useState } from 'react';

import { Card, Statistic, Divider, Typography } from 'antd';
import styles from '../../styles';
import { DeleteIcon } from '../icons/Icons';

export const BudgetCategory = ({props, daysLeft}) => {
  const [hovering, setHovering] = useState(false);

  const [budgetValue, setBudgetValue] = useState(props.budgeted);
  
  const onBudgetChange = (newValue) => {
    setBudgetValue(newValue);
  };

  function balance() {
    return props.budgeted - props.spent;
  }

  function percentage() {
    return (props.spent / props.budgeted) * 100;
  }

  const gridStyle = { 
    width: '50%', 
    boxShadow: 'initial'
  };

  return (
    <Card title={props.name}>
      <Card.Grid style={gridStyle}>
        <Statistic 
            title='Budgeted'
            formatter={ () => <Typography.Text editable= {{ onChange: onBudgetChange }}>{budgetValue}</Typography.Text> }
            valueStyle={{ fontSize: '1.5em' }}
            precision={2}
            prefix={'€'}
            decimalSeparator={','}
            groupSeparator={'.'}
          />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Statistic 
            title='Spent'
            value={props.spent}
            precision={2}
            prefix={'€'}
            decimalSeparator={','}
            groupSeparator={'.'}
          />
      </Card.Grid>
      <Divider style={{ margin: '0 auto', minWidth: '80%', width: '80%'}} />
      <Card.Grid style={gridStyle}>
        <Statistic 
            title='Balance'
            value={balance()}
            valueStyle={{ color: balance() > 0.0 ? styles.colors.balanceGreen : styles.colors.balanceRed }}
            precision={2}
            prefix={'€'}
            decimalSeparator={','}
            groupSeparator={'.'}
          />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Statistic 
            title='Per day'
            value={balance() > 0.0 ? balance() / daysLeft : 0}
            valueStyle={{ color: balance() > 0.0 ? styles.colors.balanceGreen : styles.colors.balanceRed }}
            precision={2}
            prefix={'€'}
            decimalSeparator={','}
            groupSeparator={'.'}
          />
      </Card.Grid>
    </Card>
  )
}