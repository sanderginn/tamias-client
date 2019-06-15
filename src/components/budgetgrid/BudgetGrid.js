import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BudgetCategory } from '../budgetcategory/BudgetCategory';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const BudgetGrid = ({ budgetId, daysLeft }) => {
  const [data, setData] = useState({ budget: undefined, categories: [], isFetching: true });

  useEffect(() => {
    const fetchData = async () => {
      const budgetResponse = await axios('/budgets/' + 1);
      const categoryBudgetAmountsResponse = await axios('/categorybudgetamounts/find_by_budget', {
        params: {
          budgetId: 1
        }
      });

      const categories = await categoryBudgetAmountsResponse.data.amounts
        .reduce(async (previous, amount) => {
          const category = await axios('/categories/' + amount.categoryId);
          (await previous)[amount.categoryId] = category.data.category;
          return previous;
        }, {});

      const budgetedAmounts = categoryBudgetAmountsResponse.data.amounts
        .reduce((previous, amount) => {
          previous[amount.categoryId] = amount.budgetedAmount;
          return previous;
        }, {});

      const transactions = await Object.keys(categories)
        .reduce(async (previous, key) => {
          const categoryId = categories[key].id
          const transactionsForCategory = await axios('/transactions/find_by_category', {
            params: {
              categoryId: categoryId
            }
          });
          (await previous)[categoryId] = transactionsForCategory.data.transactions;
          return previous;
        }, {});

      console.log(transactions);
      setData({
        budget: budgetResponse.data.budget,
        categories: categories,
        budgetedAmounts: budgetedAmounts,
        transactions: transactions,
        isFetching: false
      });
    }

    fetchData();
  }, [budgetId]);

  return (
    <Row>
      {console.log(data)}
      {
        data.isFetching ? (<div>Loading...</div>) : Object.keys(data.categories)
          // .sort((curr, next) => (curr.group > next.group) ? 1 : -1)
          .map((key, index) =>
            <Col xs="12" sm="6" md="6" lg="4" className="mb-3" key={index}>
              <BudgetCategory
                category={data.categories[key]}
                budgeted={data.budgetedAmounts[key]}
                spent={data.transactions[key].reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0.)}
                daysLeft={daysLeft}
                key={index}
              />
            </Col>
          )
      }
    </Row>
  )
};