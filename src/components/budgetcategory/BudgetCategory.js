import React, { useState, useRef, useEffect } from 'react';

import { Card, Statistic, Divider, Input } from 'antd';
import styles from '../../styles';
import { DeleteIcon } from '../icons/Icons';

export const BudgetCategory = ({ props, daysLeft }) => {
  const [hovering, setHovering] = useState(false);

  const [editModeEnabled, setEditMode] = useState(false);
  const insideStatisticRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleBudgetClick);

    return () => {
      document.removeEventListener("mousedown", handleBudgetClick);
    };
  }, []);

  const handleBudgetClick = e => {
    if (insideStatisticRef.current.contains(e.target)) {
      return;
    }

    setEditMode(false);
    setBudgetInput(budgetValue);
  }


  const [budgetValue, setBudgetValue] = useState(props.budgeted);
  const [budgetInput, setBudgetInput] = useState(budgetValue);
  const onBudgetChange = (newValue) => {
    setBudgetValue(newValue);
  };

  function balance() {
    return props.budgeted - props.spent;
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
          valueStyle={{ display: 'flex' }}
          precision={2}
          prefix={'€'}
          decimalSeparator={','}
          groupSeparator={'.'}
          value={budgetValue}
          valueRender={(node) => {
            return (
              <div ref={insideStatisticRef} onClick={() => setEditMode(true)}>
                {
                  editModeEnabled ?
                    <Input type="number"
                      defaultValue={budgetInput}
                      style={{ height: '25px' }}
                      onChange={e => setBudgetInput(e.target.value)}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          setBudgetValue(budgetInput);
                          setEditMode(false);
                        }
                      }}
                    /> :
                    node
                }
              </div>
            )
          }}
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
      <Divider style={{ margin: '0 auto', minWidth: '80%', width: '80%' }} />
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