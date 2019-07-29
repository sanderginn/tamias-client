import React from 'react';
import Table from 'react-bootstrap/Table';

export const FinancialAccount = ({ account }) => {
  return (
    <Table responsive striped hover size="sm">
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
          account && account.transactions
            .sort((a, b) => b.date - a.date)
            .map((transaction, index) => {
              return (
                <tr key={index}>
                  <td>{transaction.date.format("DD/MM/Y")}</td>
                  <td>{transaction.comment}</td>
                  <td>{transaction.categoryName}</td>
                  <td>{transaction.amount}</td>
                </tr>
              )
            })
        }
      </tbody>
    </Table>
  );
}