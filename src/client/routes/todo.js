import React from "react";
import TodoHeader from "../components/todo/todoHeader";
import ProjectContainer from "../components/todo/projectContainer";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.location.pathname.split("/todo/")[1],
      mode: "day",
    };
    this.changeUser = this.changeUser.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }
  changeUser(user) {
    this.props.location.pathname = `/todo/${user}`;
    this.setState({ currentUser: user });
  }
  changeMode(selectedMode) {
    this.setState({ mode: selectedMode });
  }
  render() {
    const { currentUser } = this.state;
    // console.log(this.state.mode); //두번 눌리는 이유
    return (
      <div className="todoWrap">
        <TodoHeader
          currentUser={currentUser}
          changeUser={this.changeUser}
          changeMode={this.changeMode}
        />
        <ProjectContainer currentUser={currentUser} />
      </div>
    );
  }
}
export default Todo;
