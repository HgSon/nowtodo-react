import React from "react";
import { LinkBtns } from "../components/partials/buttons";
import { Link } from "react-router-dom";
import { serverRoutes } from "../../routes";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      userName: "",
      password: "",
      pwConfirm: "",
      currentError: "",
      currentUser: "",
    };
  }
  handleChange(event) {
    event.persist();
    const userInfo = event.currentTarget.name;
    const infoValue = event.currentTarget.value;
    this.setState({ [userInfo]: infoValue });
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
    if (this.state.currentUser) {
      this.ref.current.click();
    }
  }
  render() {
    const { password, pwConfirm, currentError, currentUser } = this.state;
    const confirmMessage =
      password === pwConfirm ? "" : "비밀번호가 일치하지 않습니다";
    return (
      <div>
        <Link ref={this.ref} to={{ pathname: `/todo/${currentUser}` }} />
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>회원정보를 입력해주세요</legend>
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
            <input type="submit" value="회원가입" />
          </fieldset>
        </form>
        <LinkBtns links={["main", "login"]} />
      </div>
    );
  }
}

export default Signup;
