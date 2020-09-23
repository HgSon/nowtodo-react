import React from "react";
import Header from "../components/partials/header/header";
import ProjectContainer from "../components/todo/projectContainer";
import styled from "styled-components";

const TodoWrap = styled.div`
  margin: 0;
  padding: 0;
  & a {
    text-decoration: none;
  }
  & ul {
    margin: 0;
    padding: 0;
  }
  & li {
    list-style: none;
  }
`;

class Todo extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id },
      },
      location: { state },
    } = this.props;
    this.state = {
      currentUser: id,
      mode: (state && state.mode) || "day",
    };
    this.changeUser = this.changeUser.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }
  changeUser(user) {
    this.props.history.replace(user);
    this.setState({ currentUser: user });
  }
  changeMode(selectedMode) {
    this.setState({ mode: selectedMode });
  }
  render() {
    const { currentUser, mode } = this.state;
    return (
      <TodoWrap mode={mode}>
        <Header
          currentUser={currentUser}
          changeUser={this.changeUser}
          changeMode={this.changeMode}
          mode={mode}
        />
        <ProjectContainer currentUser={currentUser} mode={mode} />
      </TodoWrap>
    );
  }
}
export default Todo;
