import React, { Component } from "react";
import TransactionDataService from "../services/TransactionDataService";

class ManagerAppointment extends Component {
  state = {};

  makeAppointment = () => {
    let acc = this.props.account.account;
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
    const { account } = this.props;
    return (
      <div>
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
