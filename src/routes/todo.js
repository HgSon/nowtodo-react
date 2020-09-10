import React from "react";
import Weather from "../components/partials/weather";
import TodoContainer from "../components/todo/main/container";

class TodoHeader extends React.Component {
  render() {
    return (
      <header>
        <Weather isTodo={true} />
        <ChangeID />
        <ChangeViewMode />
        <Logout />
      </header>
    );
  }
}
function ChangeViewMode() {
  // css 변경
  return null;
}
class ChangeID extends React.Component {
  // db불러오기 -> 저장한 ID만 목록에 -> 선택 -> 로그인 -> todo 재랜더
  render() {
    return null;
  }
}
function Logout() {
  //로그아웃
  //메인으로 리다이렉트
  return null;
}

class Todo extends React.Component {
  render() {
    const currentUser = "tester";
    return (
      <div className="todoWrap">
        <TodoHeader currentUser={currentUser} />
        <TodoContainer isSublist={false} />
      </div>
    );
  }
}
export default Todo;
