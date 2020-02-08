import React, { Component } from "react";
import NavBar from "./components/navbar";
import Account from "./components/account";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountDataService from "./services/AccountDataService";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";
import Transfer from "./components/transfer";
import ManagerAppointment from "./components/manager";

class App extends Component {
  state = {
    account: {}
  };

  refreshAccount = () => {
    AccountDataService.retriveAccount("98765").then(response => {
      this.setState({ account: response.data });
    });
  };

  componentDidMount() {
    this.refreshAccount();
  }

  render() {
    let account = this.state.account;

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
                path="/deposit"
                render={props => <Deposit {...props} account={account} />}
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
