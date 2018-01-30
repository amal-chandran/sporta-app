import React, { Component } from 'react';
import Normal from "./layout/Normal";
import Public from "./layout/Public";
import { Router, Route, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import { store, configureFakeBackend, history } from './helpers';

configureFakeBackend();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Route exact path="/" name="Index" render={() => (<Redirect to={"/public/login"} />)} />
            <Route path={"/public"} name="Public" component={Public} />
            <Route path={"/user"} name="User" component={Normal} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
