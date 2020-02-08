import React, { Component } from "react";

class Account extends Component {
  render() {
    const { account } = this.props;
    return (
      <div>
        <h3>Welcome back, {account.name}!</h3>
        <h4>
          Your current balance is{" "}
          <p className={account.balance < 0 ? "text-danger" : "text-success"}>
            R${account.balance}
          </p>
        </h4>
        <h5>Choose your desired option:</h5>
        <a href="/deposit" className="btn btn-primary">
          Deposit
        </a>
        <br></br>
        <a href="/withdraw" className="btn btn-primary">
          Withdraw
        </a>
        <a href="/transfer" className="btn btn-primary">
          Transfer
        </a>
        {account.type === "VIP" ? (
          <button className="btn-primary">Manager Appointment</button>
        ) : null}
      </div>
    );
  }
}

export default Account;
