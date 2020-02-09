import React, { Component } from "react";
import NavBar from "./components/navbar";
import Account from "./components/account";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountDataService from "./services/AccountDataService";
import TransactionDataService from "./services/TransactionDataService";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";
import Transfer from "./components/transfer";
import ManagerAppointment from "./components/manager";
import BankStatement from "./components/statement";

class App extends Component {
  state = {
    accNumber: "54321",
    account: {},
    statement: null
  };

  refreshAccount = () => {
    AccountDataService.retriveAccount(this.state.accNumber).then(response => {
      this.setState({ account: response.data });
    });
  };

  refreshStatement = () => {
    TransactionDataService.getStatement(this.state.accNumber).then(response => {
      this.setState({ statement: response.data });
    });
  };

  componentDidMount() {
    this.refreshAccount();
    this.refreshStatement();
  }

  render() {
    let account = this.state.account;
    let statement = this.state.statement;

    return (
      <React.Fragment>
        <NavBar />
        <main className="container"></main>
        <Router>
          <>
            <Switch>
              <Route
                exact
                path="/"
                render={props => <Account {...props} account={account} />}
                account={account}
              />
              <Route
                exact
                path="/statement"
                render={props => (
                  <BankStatement
                    {...props}
                    statement={statement}
                    account={account}
                  />
                )}
                statement={statement}
                account={account}
              />
              <Route
                exact
                path="/withdraw"
                render={props => <Withdraw {...props} account={account} />}
                account={account}
              />
              <Route
                exact
                path="/deposit"
                render={props => <Deposit {...props} account={account} />}
                account={account}
              />

              <Route
                exact
                path="/transfer"
                render={props => <Transfer {...props} account={account} />}
                account={account}
              />
              <Route
                exact
                path="/manager-appointment"
                render={props => (
                  <ManagerAppointment {...props} account={account} />
                )}
                account={account}
              />
            </Switch>
          </>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
