import React, { Component } from "react";

class Deposit extends Component {
  state = {};
  render() {
    return (
      <div>
        <a
          className="btn btn-primary"
          data-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Deposit
        </a>
        <p>Enter value to deposit:</p>
        <div className="collapse" id="collapseExample">
          <div className="card card-body">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="rs-symbol">
                  R$
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Value"
                aria-label="value"
                aria-describedby="rs-simbol"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Deposit;
