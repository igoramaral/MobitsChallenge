import React, { Component } from "react";
import { Formik } from "formik";
import TransactionDataService from "../services/TransactionDataService";

class Withdraw extends Component {
  state = {};

  validate = values => {
    const errors = {};
    if (!values.value) {
      errors.value = "Required";
    } else if (values.value < 0) {
      errors.value = "Must be positive";
    } else if (
      values.value > this.props.account.balance &&
      this.props.account.type === "Standard"
    ) {
      errors.value = "Insuficient funds!";
    }
    return errors;
  };

  render() {
    const { account } = this.props;
    console.log(account);
    let acc = account.account;
    acc = parseInt(acc);

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <h3>Withdraw</h3>
            <h5>
              Your current balance is{" "}
              <p
                className={account.balance < 0 ? "text-danger" : "text-success"}
              >
                R${account.balance}
              </p>
            </h5>
            <h5>Please insert desired amount to Withdraw</h5>
            <Formik
              initialValues={{ value: 0, accNum: 0 }}
              validate={this.validate}
              onSubmit={(values, actions) => {
                // console.log(values);
                // actions.setSubmitting(false);
                //to, from, value, type;
                TransactionDataService.makeTransaction(
                  values.accNum,
                  values.accNum,
                  values.value,
                  "Withdraw"
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
                  <button
                    type="submit"
                    className="btn btn-success mb-2"
                    onClick={() => {
                      props.setFieldValue("accNum", acc);
                    }}
                  >
                    Withdraw
                  </button>
                </form>
              )}
            </Formik>

            <a href="/" className="btn btn-outline-primary">
              Return to main menu
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Withdraw;
