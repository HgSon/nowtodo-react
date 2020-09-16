import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Todo from "./client/routes/todo";
import Main from "./client/routes/main";
import Login from "./client/routes/login";
import Signup from "./client/routes/signup";
import { clientRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={clientRoutes.login} component={Login} />
        <Route path={clientRoutes.signup} component={Signup} />
        <Route path={`${clientRoutes.todo}/:id`} component={Todo} />
        <Route path={clientRoutes.main} component={Main} />
        <Redirect path="*" to={clientRoutes.main} />
      </Switch>
    </BrowserRouter>
  );
}

// state = {currentUser: ""}
// login, signup에 currentuser넘기고 currentuser 있으면 todo/currentuser ?
// signup, login에서 link click()말고 redirect바로 쓸수있나?
export default App;
