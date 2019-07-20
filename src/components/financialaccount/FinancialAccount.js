import React from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table';

export const FinancialAccount = ({ account }) => {
  return (
    <Table responsive>
      {console.log(account)}
      <thead>
        <tr>
          <th>Date</th>
          <th>Comment</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {
          account.transactions
            .sort((a, b) => b.date - a.date)
            .map((transaction, index) => {
              return (
                <tr key={index}>
                  <td>{transaction.date.format("DD/MM/Y")}</td>
                  <td>{transaction.comment}</td>
                  <td>{transaction.categoryId}</td>
                  <td>{transaction.amount}</td>
                </tr>
              )
            })
        }
      </tbody>
    </Table>
  );
}