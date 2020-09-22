import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Todo from "./client/routes/todo";
import Main from "./client/routes/main";
import Login from "./client/routes/login";
import Signup from "./client/routes/signup";
import { clientRoutes } from "./routes";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <ThemeProvider
      theme={{
        day: {
          paper: "#ffffff",
          back: "#fafafa",
          main: "#2196f3",
          light: "#64b5f6",
          dark: "#1976d2",
          secondary: "#dc004e",
          secondaryLight: "#e33371",
          secondaryDark: "#9a0036",
          text: "rgba(0, 0, 0, 0.87)",
          textDisabled: "rgba(0, 0, 0, 0.38)",
        },
        night: {
          back: "#303030",
          paper: "#424242",
          light: "#6e6e6e",
          main: "#515151",
          dark: "#404040",
          text: "#ffffff",
          textDisabled: "rgba(255, 255, 255, 0.5)",
        },
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path={clientRoutes.login} component={Login} />
          <Route path={clientRoutes.signup} component={Signup} />
          <Route path={`${clientRoutes.todo}/:id`} component={Todo} />
          <Route path={clientRoutes.main} component={Main} />
          <Redirect path="*" to={clientRoutes.main} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
