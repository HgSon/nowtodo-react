import React from "react";
import { LinkBtns } from "../components/partials/buttons";
import { serverRoutes } from "../../routes";
import styled, { css } from "styled-components";
import Header from "../components/partials/header/header";

const SignupWrap = styled.div`
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
        font-size: 12px;
        font-weight: bold;
        color: ${mode === "day" ? theme[mode].main : theme[mode].text};
        box-sizing: border-box;
        border: 2px solid
          ${mode === "day" ? theme[mode].main : theme[mode].text};
        margin-bottom: 25px;
      }
      & label {
        font-size: 8px;
        font-style: italic;
        font-weight: bold;
        color: ${mode === "day" ? theme[mode].secondary : theme[mode].text};
        margin-bottom: 5px;
      }
    `;
  }}
`;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { state },
    } = this.props;
    this.state = {
      userName: "",
      password: "",
      pwConfirm: "",
      currentError: "",
      currentUser: "",
      mode: (state && state.mode) || "day",
    };
    this.ref = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }
  changeMode(selectedMode) {
    this.setState({ mode: selectedMode });
  }
  handleChange(event) {
    event.persist();
    const userInfo = event.currentTarget.name;
    const infoValue = event.currentTarget.value;
    this.setState({ [userInfo]: infoValue });
    if (userInfo === "userName") {
      this.setState({ currentError: "" });
    }
  }
  async handleSubmit(event) {
    event.persist();
    event.preventDefault();
    const user = this.state;
    if (user.password !== user.pwConfirm) {
      return;
    }
    const url = `http://localhost:3001/api${serverRoutes.signup}`;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => this.setState(res));
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
    const { password, pwConfirm, currentError, mode } = this.state;
    const confirmMessage =
      password === pwConfirm ? "" : "비밀번호가 일치하지 않습니다";
    return (
      <SignupWrap mode={mode}>
        <Header changeMode={this.changeMode} mode={mode} />
        <main>
          <form onSubmit={this.handleSubmit}>
            <h1>Sign up</h1>
            <input
              onChange={this.handleChange}
              name="userName"
              id="userName"
              type="text"
              placeholder="아이디"
            />
            <label htmlFor="userName" hidden={!currentError}>
              {currentError || "아이디"}
            </label>
            <input
              onChange={this.handleChange}
              name="password"
              id="pw"
              type="password"
              placeholder="비밀번호"
            />
            <label htmlFor="pw" hidden={true}>
              비밀번호
            </label>
            <input
              onChange={this.handleChange}
              name="pwConfirm"
              id="pwConfirm"
              type="password"
              placeholder="비밀번호 확인"
            />
            <label htmlFor="pwConfirm">{confirmMessage}</label>
            <input id="submit" type="submit" value="회원가입" />
          </form>
          <LinkBtns
            width="35vw"
            minWidth="200px"
            maxWidth="700px"
            mode={mode}
            links={["main", "login"]}
          />
        </main>
      </SignupWrap>
    );
  }
}

export default Signup;
