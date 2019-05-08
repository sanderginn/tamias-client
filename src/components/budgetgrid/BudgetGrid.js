import React from 'react';
import { Col, Row } from 'antd';
import { BudgetCategory } from '../budgetcategory/BudgetCategory';
import styles from '../../styles';

export const BudgetGrid = ({ categories, numCols, daysLeft }) => {
  return (
    categories
      .map((category, index) => <BudgetCategory props={category} daysLeft={daysLeft} key={index} />)
      .reduce(function (rows, category) {
        let lastIndex = rows.length - 1;
        let nextCol =
          <Col span={24 / numCols} key={rows[lastIndex].length}>
            {category}
          </Col>;

        if (rows[lastIndex].length < numCols) {
          rows[lastIndex].push(nextCol);
        } else {
          rows.push([nextCol]);
        }

        return rows;
      }, [[]])
      .map((rowCategories, index) => {
        return (
          <Row gutter={24} style={styles.rowStyle} key={index}>
            {rowCategories}
          </Row>
        )
      })
  )
}

