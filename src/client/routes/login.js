import React from "react";
import { LinkBtns } from "../components/partials/buttons";
import { serverRoutes } from "../../routes";
import styled, { css } from "styled-components";
import Header from "../components/partials/header/header";

const LoginWrap = styled.div`
  ${(props) => {
    const { theme, mode } = props;
    return css`
      width: 100%;
      height: 100vh;
      background: ${theme[mode].back};
      & main {
        width: 80%;
        min-width: 400px;
        max-width: 800px;
        background: ${theme[mode].paper};
        padding: 15px;
        position: relative;
        top: 50%;
        margin: -179px auto 0 auto;
      }
      & h1 {
        font-size: 16px;
        text-align: center;
        color: ${theme[mode].textDisabled};
      }
      & form {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      & input {
        all: unset;
        width: 35vw;
        min-width: 200px;
        max-width: 700px;
        height: 25px;
        margin-bottom: 5px;
        font-size: 10px;
        color: ${theme[mode].text};
      }
      & #submit {
        text-align: center;
        font-size: 14px;
        color: ${mode === "day" ? theme[mode].main : theme[mode].text};
        box-sizing: border-box;
        border: 2px solid
          ${mode === "day" ? theme[mode].main : theme[mode].text};
        margin-bottom: 25px;
      }
      & span {
        font-size: 10px;
        font-style: italic;
        font-weight: bold;
        color: ${mode === "day" ? theme[mode].secondary : theme[mode].text};
        margin-bottom: 5px;
      }
    `;
  }}
`;
class Login extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { state },
    } = this.props;
    this.state = {
      currentError: "",
      currentUser: "",
      mode: (state && state.mode) || "day",
    };
    this.ref = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }
  changeMode(selectedMode) {
    this.setState({ mode: selectedMode });
  }
  handleSubmit(event) {
    this.setState({
      currentError: "",
      currentUser: "",
    });
    event.preventDefault();
    const { userName, password } = event.target;
    const url = `http://localhost:3001/api${serverRoutes.login}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        userName: userName.value,
        password: password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => this.setState(data));
    userName.value = "";
    password.value = "";
  }
  componentDidUpdate() {
    const { currentUser, mode } = this.state;
    if (currentUser) {
      this.props.history.push({
        pathname: `/todo/${currentUser}`,
        state: { mode },
      });
    }
  }
  render() {
    return (
      <LoginWrap mode={this.state.mode}>
        <Header changeMode={this.changeMode} mode={this.state.mode} />
        <main>
          <form onSubmit={this.handleSubmit}>
            <h1>Log in</h1>
            <input
              name="userName"
              id="userName"
              type="text"
              placeholder="아이디"
            />
            <label htmlFor="userName" hidden={true}>
              아이디
            </label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="비밀번호"
            />
            <label htmlFor="password" hidden={true}>
              비밀번호
            </label>
            <span>{this.state.currentError}</span>
            <input id="submit" type="submit" value="login" />
          </form>
          <LinkBtns
            width="35vw"
            minWidth="200px"
            maxWidth="700px"
            mode={this.state.mode}
            links={["main", "signup"]}
          />
        </main>
      </LoginWrap>
    );
  }
}

export default Login;
