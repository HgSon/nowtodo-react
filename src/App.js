import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Todo from "./routes/todo";
import Main from "./routes/main";
import Login from "./routes/login";
import Signup from "./routes/signup";
import routes from "./routes"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.main} exact={true} component={Main} />
        <Route path={routes.login} component={Login} />
        <Route path={routes.signup} component={Signup} />
        <Route path={routes.todo} component={Todo} />
        <Redirect path="*" to={routes.main} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
