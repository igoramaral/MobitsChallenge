import React, { Component } from "react";
//

class BankStatement extends Component {
  render() {
    const { statement } = this.props;
    return (
      <div className="container justify-content-center">
        <h3>Bank Statement</h3>
        <table className="table table-responsive table-small">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Transaction</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          {statement !== null ? (
            <tbody>
              {this.props.statement.map(transaction => (
                <tr key={transaction.id}>
                  <th scope="row">
                    {transaction.date.replace(/T/, " ").replace(/\..+/, "")}
                  </th>
                  {transaction.transDesc === "Transfer" &&
                  transaction.value < 0 ? (
                    <td>
                      {transaction.transDesc} to {transaction.accTo}
                    </td>
                  ) : transaction.transDesc === "Transfer" &&
                    transaction.value > 0 ? (
                    <td>
                      {transaction.transDesc} from {transaction.accFrom}
                    </td>
                  ) : (
                    <td>{transaction.transDesc}</td>
                  )}
                  <td
                    className={
                      transaction.value < 0 ? "text-danger" : "text-success"
                    }
                  >
                    {transaction.value}
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row" colSpan="2">
                  Current Balance:
                </th>
                <td>
                  <p
                    className={
                      this.props.account.balance < 0
                        ? "text-danger"
                        : "text-success"
                    }
                  >
                    R${this.props.account.balance}
                  </p>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody></tbody>
          )}
        </table>

        <a href="/" className="btn btn-outline-primary">
          Return to main menu
        </a>
      </div>
    );
  }
}

export default BankStatement;
