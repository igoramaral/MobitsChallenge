import React, { Component } from "react";
import imgStatement from "../assets/statement.jpg";
import imgWithdraw from "../assets/withdraw.jpg";
import imgDeposit from "../assets/deposit.jpg";
import imgTransfer from "../assets/transfer.jpg";
import imgAppointment from "../assets/appointment.jpg";
import AccountDataService from "../services/AccountDataService";

class Account extends Component {
  state = {
    account: {
      id: "",
      name: "",
      account: "",
      password: "",
      balance: "",
      type: ""
    }
  };

  refreshAccount = () => {
    let acc = localStorage.getItem("account");
    AccountDataService.retriveAccount(acc).then(response => {
      this.setState({ account: response.data });
    });
  };

  componentDidMount() {
    this.refreshAccount();
  }

  render() {
    let account = this.state.account;
    return (
      <div className="container">
        <div className="row">
          <div className="accInfo">
            <h3>Welcome back, {account.name}!</h3>
            <h4>
              Your balance is{" "}
              <span
                className={account.balance < 0 ? "text-danger" : "text-success"}
              >
                R${account.balance}
              </span>
            </h4>
            <h5>
              You are a{" "}
              <span
                className={
                  account.type === "VIP" ? "text-info" : "text-primary"
                }
              >
                {account.type + " "}
              </span>
              costumer!
            </h5>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm text-center">
                <img
                  src={imgStatement}
                  alt="Bank Statement"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h4 className="card-title">Bank Statement</h4>
                  <p className="card-text">
                    Check all your account transactions and values
                  </p>
                  <a href="/statement" className="btn btn-primary">
                    Check Statement
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4 shadow-sm text-center">
                <div className="overflow">
                  <img
                    src={imgWithdraw}
                    alt="Money Withdrawal"
                    className="card-img-top"
                  />
                </div>
                <div className="card-body text-dark">
                  <h4 className="card-title">Make Withdrawal</h4>
                  <p className="card-text text-secondary">
                    Your money back in your hands quickly and easily.
                  </p>
                  <a href="/withdraw" className="btn btn-primary">
                    Withdraw
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4 shadow-sm text-center">
                <div className="overflow">
                  <img
                    src={imgDeposit}
                    alt="Deposit"
                    className="card-img-top"
                  />
                </div>
                <div className="card-body text-dark">
                  <h4 className="card-title">Deposit Money</h4>
                  <p className="card-text text-secondary">
                    Deposit money on your account and get richer. Always.
                  </p>
                  <a href="/deposit" className="btn btn-primary">
                    Deposit
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4 shadow-sm text-center">
                <div className="overflow">
                  <img
                    src={imgTransfer}
                    alt="Transfer"
                    className="card-img-top"
                  />
                </div>
                <div className="card-body text-dark">
                  <h4 className="card-title">Transfer Money</h4>
                  <p className="card-text text-secondary">
                    Transfer money to another account with a touch of a button.
                    Simple as that.
                  </p>
                  <a href="/transfer" className="btn btn-primary">
                    Transfer
                  </a>
                </div>
              </div>
            </div>

            {account.type === "VIP" ? (
              <div className="col-md-4">
                <div className="card mb-4 shadow-sm text-center">
                  <div className="overflow">
                    <img
                      src={imgAppointment}
                      alt="Manager Appointment"
                      className="card-img-top"
                    />
                  </div>
                  <div className="card-body text-dark">
                    <h4 className="card-title">Schedule an appointment</h4>
                    <p className="card-text text-secondary">
                      VIP costumers can schedule appointments with a manager.
                      Click here and schedule yours right now!
                    </p>
                    <a href="/manager-appointment" className="btn btn-primary">
                      Schedule Appointment
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
