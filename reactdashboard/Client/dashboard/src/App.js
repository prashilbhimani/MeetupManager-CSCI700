import React, { Component } from "react";
import Dashboard from "./views/Dashboard/Dashboard";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';
import "typeface-roboto"; // Roboto font required by material-ui


class App extends Component {
  render() {
// look at this for nested routing: https://www.youtube.com/watch?v=sfvrjwVihFY
// better series: https://www.youtube.com/watch?v=rIoflwHFd6ols
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
