import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import store from "./store";
import Login from "./views/auth/login";
import Admin from "./views/Admin";
import AppSetting from "./views/setting";
import history from "./history";

class App extends Component {
  componentDidMount = () => {
    document.body.classList.add("notofont");
  };

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route
              path="/login"
              exact={true}
              render={(props) => {
                if (localStorage.getItem("access_token")) {
                  return <Redirect to="/admin/monitor" />;
                } else {
                  return <Login {...props} />;
                }
              }}
            />
            <Route path="/admin" component={Admin} />
            {/* <Route component={Err404Page} /> */}
            <Route path="/setting" component={AppSetting} />
            <Redirect to="/login" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
