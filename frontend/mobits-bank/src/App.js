import React, { Component } from "react";
import NavBar from "./components/navbar";
import Account from "./components/account";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";
import Transfer from "./components/transfer";
import ManagerAppointment from "./components/manager";
import BankStatement from "./components/statement";
import Login from "./components/login";
import PrivateRoute from "./components/privateRoute";
import Footer from "./components/footer";

class App extends Component {
  state = {
    logged: false
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container"></main>
        <Router>
          <>
            <Switch>
              <Route
                exact
                path="/login"
                component={Login}
                history={this.props.history}
              />
              <PrivateRoute exact path="/" component={Account} />
              <PrivateRoute exact path="/statement" component={BankStatement} />
              <PrivateRoute exact path="/withdraw" component={Withdraw} />
              <PrivateRoute exact path="/deposit" component={Deposit} />
              <PrivateRoute exact path="/transfer" component={Transfer} />
              <PrivateRoute
                exact
                path="/manager-appointment"
                component={ManagerAppointment}
              />
            </Switch>
          </>
        </Router>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
