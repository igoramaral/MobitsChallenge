import React, { Component } from "react";
import TransactionDataService from "../services/TransactionDataService";
import AccountDataService from "../services/AccountDataService";

class ManagerAppointment extends Component {
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

  makeAppointment = () => {
    let acc = this.state.account.account;
    acc = parseInt(acc);
    //to, from, value, type;
    TransactionDataService.makeTransaction(
      acc,
      acc,
      50,
      "Manager Appointment"
    ).then(response => {
      console.log("Transaction Done!");
    });
  };

  render() {
    const account = this.state.account;

    const divStyle = {
      textAlign: "center",
      height: "400px"
    };
    return (
      <div style={divStyle}>
        <h3>Manager Appointment</h3>
        {account.type === "Standard" ? (
          <div className="alert alert-warning">
            <h4>
              You're a standard costumer. You cannot schedule appointments with
              a manager
            </h4>
          </div>
        ) : (
          <div>
            <h5>
              Are you sure you want to proceed with scheduling an appointment?
              R$ 50,00 will be debited from your account.
            </h5>
            <button className="btn btn-success" onClick={this.makeAppointment}>
              Proceed with schedule
            </button>
          </div>
        )}
        <a href="/" className="btn btn-outline-primary">
          Return to main menu
        </a>
      </div>
    );
  }
}

export default ManagerAppointment;
