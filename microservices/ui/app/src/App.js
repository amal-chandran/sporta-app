import React, { Component } from 'react';
import Normal from "./layout/Normal";
import Public from "./layout/Public";
import { Router, Route, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import { store, configureFakeBackend, history } from './helpers';
import AlertSnackbar from "./components/AlertSnackbar";
// import AuthRoute from "./components/AuthRoute";

// configureFakeBackend();
import { userActions } from "./actions";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <AlertSnackbar />
            <Route exact path="/" name="Index" render={() => { store.dispatch(userActions.checkLogin()); }
              // (<Redirect to={"/public/login"} />)
            } />
            <Route path={"/public"} name="Public" component={Public} />
            <Route path={"/user"} name="User" component={Normal}></Route>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
