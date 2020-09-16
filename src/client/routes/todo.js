import React from "react";
import { Link } from "react-router-dom";
import Weather from "../components/partials/weather";
import TodoContainer from "../components/todo/main/container";
import ProjectContainer from "../components/todo/main/projectContainer";

class TodoHeader extends React.Component {
  render() {
    return (
      <header>
        <Weather isTodo={true} />
        {/* <ChangeID /> */}
        <ChangeViewMode />
        <Logout currentUser={this.props.currentUser} />
      </header>
    );
  }
}
function Logout(props) {
  // let currentUser = props.cu
  // const handleClick = () => {
  //   currentUser = "";
  // };
  return (
    <button>
      <Link to="/">Logout</Link>
    </button>
  );
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

class Todo extends React.Component {
  state = {
    currentUser: this.props.location.pathname.split("/todo/")[1],
  };
  render() {
    console.log(this.state.currentUser);
    return (
      <div className="todoWrap">
        <TodoHeader currentUser={this.state.currentUser} />
        <ProjectContainer currentUser={this.state.currentUser} />
        {/* <TodoContainer isSublist={false} currentUser={this.state.currentUser} /> */}
      </div>
    );
  }
}
export default Todo;
