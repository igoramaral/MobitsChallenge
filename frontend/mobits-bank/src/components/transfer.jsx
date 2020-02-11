import React, { Component } from "react";
import { Formik } from "formik";
import AccountDataService from "../services/AccountDataService";
import TransactionDataService from "../services/TransactionDataService";

class Transfer extends Component {
  state = {
    account: {}
  };

  refreshAccount = () => {
    AccountDataService.retriveAccount(localStorage.getItem("account")).then(
      response => {
        this.setState({ account: response.data });
      }
    );
  };

  componentDidMount() {
    this.refreshAccount();
    console.log(this.state.account);
  }

  validate = values => {
    const errors = {};
    if (!values.value) {
      errors.value = "Required";
    } else if (values.value < 0) {
      errors.value = "Must be positive";
    } else if (!values.accTo) {
      errors.accTo = "Required";
    } else if (values.accTo < 10000 || values.accTo > 99999) {
      //cannot make transfer to invalid account number
      errors.accTo = "Enter a valid destination account number";
    } else if (values.accNum === values.accTo) {
      //cannot make transfer to the same account
      errors.transaction = "Cannot make transfer to the same account";
    } else if (
      values.value + 8 > this.state.account.balance &&
      this.state.account.type === "Standard"
    ) {
      errors.value = "Insuficient funds!";
    }
    return errors;
  };

  render() {
    let account = this.state.account;
    let acc = account.account;
    acc = parseInt(acc);

    const divStyle = {
      textAlign: "center"
    };

    return (
      <div className="container" style={divStyle}>
        <div className="row">
          <div className="col-sm">
            <h3>Transfer</h3>
            <h5>
              Your current balance is{" "}
              <p
                className={account.balance < 0 ? "text-danger" : "text-success"}
              >
                R${account.balance}
              </p>
            </h5>
            <h5>Please insert desired amount to Transfer</h5>
            <Formik
              initialValues={{ value: 0, accNum: 0, accTo: 0 }}
              validate={this.validate}
              onSubmit={(values, actions) => {
                // console.log(values);
                // actions.setSubmitting(false);
                //to, from, value, type;
                TransactionDataService.makeTransaction(
                  values.accTo,
                  values.accNum,
                  values.value,
                  "Transfer"
                ).then(response => {
                  console.log("Transaction Done!");
                });
              }}
            >
              {props => (
                <form onSubmit={props.handleSubmit}>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">R$</div>
                    </div>
                    <input
                      id="value"
                      name="value"
                      type="number"
                      step="0.01"
                      className="form-control"
                      placeholder="0.00"
                      onChange={props.handleChange}
                    />
                    <input
                      id="accNum"
                      name="accNum"
                      type="hidden"
                      className="form-control"
                      onChange={props.handleChange}
                      value={account.accNumber}
                    />
                  </div>
                  {props.touched.value && props.errors.value ? (
                    <div className="alert alert-warning">
                      {props.errors.value}
                    </div>
                  ) : null}
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">Account</div>
                    </div>
                    <input
                      id="accTo"
                      name="accTo"
                      type="number"
                      className="form-control"
                      placeholder="Destination"
                      onChange={props.handleChange}
                    />
                  </div>
                  {props.touched.accTo && props.errors.accTo ? (
                    <div className="alert alert-warning">
                      {props.errors.accTo}
                    </div>
                  ) : null}
                  {props.touched.accTo && props.errors.transaction ? (
                    <div className="alert alert-danger">
                      {props.errors.transaction}
                    </div>
                  ) : null}
                  <button
                    type="submit"
                    className="btn btn-success mb-2"
                    onClick={() => {
                      props.setFieldValue("accNum", acc);
                    }}
                  >
                    Transfer
                  </button>
                </form>
              )}
            </Formik>

            {this.state.account.type &&
            this.state.account.type === "Standard" ? (
              <div>
                <p>You are a Standard costumer.</p>
                <p>Your transfer limit is R$ 1000.00 per transaction.</p>
                <p>Your transfer fee is R$ 8,00</p>
                <p>
                  Please be aware that you will not be able to complete
                  transaction if your balance is unsuficient to debit both the
                  transfer and the fee values.
                </p>
              </div>
            ) : this.state.account.type === "VIP" ? (
              <div>
                <p>You are a VIP costumer.</p>
                <p>You have no transfer limit</p>
                <p>Your transfer fee is 0,8% of transfer value.</p>
              </div>
            ) : null}

            <a href="/" className="btn btn-outline-primary">
              Return to main menu
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Transfer;
