import React from "react";
import { LinkBtns } from "../components/buttons";
import routes from "../routes";
// 아이디 겹치는경우, 비밀번호 일치하지 않는 경우 label hidden false,  메시지 변경
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    event.persist();
  }
  render() {
    return (
      <div>
        <form action={routes.signup} method="POST" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>회원정보를 입력해주세요</legend>
            <input
              name="newName"
              id="newName"
              type="text"
              placeholder="아이디"
            />
            <label htmlFor="newName" hidden={true}>
              아이디
            </label>
            <input id="pw" type="password" placeholder="비밀번호" />
            <label htmlFor="pw" hidden={true}>
              비밀번호
            </label>
            <input id="pwConfirm" type="password" placeholder="비밀번호 확인" />
            <label htmlFor="pwConfirm" hidden={true}>
              비밀번호 확인
            </label>
            <input type="submit" value="회원가입" />
          </fieldset>
        </form>
        <LinkBtns links={["main", "login"]} />
      </div>
    );
  }
}

export default Signup;
