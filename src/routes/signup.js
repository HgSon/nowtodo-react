import React from "react";
import { LinkBtns } from "../components/partials/buttons";
import { Link } from "react-router-dom";

// 아이디 겹치는경우, 비밀번호 일치하지 않는 경우 label hidden false,  메시지 변경
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.state = {
      userName: "",
      password: "",
      pwConfirm: "",
      idError: "",
      currentUser: null,
    };
  }
  handleChange(event) {
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
    const url = "http://localhost:3001/api/signup";
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
  handleRedirect() {
    this.ref.click();
  }
  render() {
    const { password, pwConfirm, idError, currentUser } = this.state;
    const confirmMessage =
      password === pwConfirm ? "" : "비밀번호가 일치하지 않습니다";
    if (currentUser) {
      this.handleRedirect();
    }
    return (
      <div>
        <Link
          to={{ pathname: "/todo", state: { currentUser } }}
          ref={this.ref}
        />
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
            <label htmlFor="userName" hidden={!idError}>
              {idError || "아이디"}
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
