import React from "react";
import Buttons from "../components/buttons";

class Login extends React.Component {
  onSubmit() {}
  render() {
    return (
      <div>
        <fieldset>
          <legend>로그인</legend>
          <input id="myName" type="text" placeholder="아이디" />
          <label htmlFor="myName" hidden={true}>
            아이디
          </label>
          <input id="pw" type="password" placeholder="비밀번호" />
          <label htmlFor="pw" hidden={true}>
            비밀번호
          </label>
          <input type="submit" value="로그인" />
        </fieldset>
        <Buttons links={["main", "signup"]} />
      </div>
    );
  }
}

export default Login;
