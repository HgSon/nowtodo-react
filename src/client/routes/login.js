import React from "react";
import { LinkBtns } from "../components/partials/buttons";
import { serverRoutes } from "../../routes";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      currentError: "",
      currentUser: "",
    };
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
  }
  componentDidUpdate() {
    if (this.state.currentUser) {
      this.ref.current.click();
    }
  }
  render() {
    return (
      <div>
        <Link
          ref={this.ref}
          to={{ pathname: `/todo/${this.state.currentUser}` }}
        />
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>로그인</legend>
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
            <input type="submit" value="로그인" />
            <span>{this.state.currentError}</span>
          </fieldset>
        </form>
        <LinkBtns links={["main", "signup"]} />
      </div>
    );
  }
}

export default Login;
