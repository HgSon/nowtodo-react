import React from "react";
import ProjectList from "./projectPresenter";
import styled, { css } from "styled-components";
import { MdAddBox } from "react-icons/md";
const Main = styled.main`
  width: 100%;
  box-sizing: border-box;
  padding: 20px 10%;
  min-height: calc(100vh - 50px);
  ${(props) => {
    const { mode, theme } = props;
    return css`
      color: ${theme[mode].text};
      background: ${theme[mode].back};
    `;
  }}
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputText = styled.input`
  all: unset;
  caret-color: transparent;
  border-bottom: 0.1em dashed;
  padding: 0 10px;
  font-size: 14px;
  font-style: italic;
  // background: rgba(0, 0, 0, 0.03);
  // background: rgba(255, 255, 255, 0.3);
  ${(props) => {
    const { mode, theme } = props;
    return css`
      color: ${theme[mode].textDisabled};
      // background: ${theme[mode].textDisabled};
      border-color: ${theme[mode].textDisabled};
    `;
  }};
`;
const InputButton = styled.button`
  all: unset;
  font-size: 20px;
  position: relative;
  left: 5px;
  ${(props) => {
    const { mode, theme } = props;
    return css`
      color: ${theme[mode].main};
    `;
  }};
`;

class ProjectContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      url: `http://localhost:3001/api/${this.props.currentUser}/projects`,
    };
    this.paintList = this.paintList.bind(this);
    this.removeList = this.removeList.bind(this);
    this.changeList = this.changeList.bind(this);
    this.saveList = this.saveList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
  }
  async componentDidUpdate() {
    const prevUser = this.state.url.split("/")[4];
    if (this.props.currentUser !== prevUser) {
      const url = `http://localhost:3001/api/${this.props.currentUser}/projects`;
      const response = await fetch(url);
      const list = await response.json();
      this.setState({ url, list });
    }
  }
  paintList(event) {
    event.preventDefault();
    event.persist();
    const title = event.currentTarget.firstElementChild.value;
    event.currentTarget.firstElementChild.value = "";
    const id = Date.now();
    const completed = false;
    this.setState((state) => ({
      list: state.list.concat({ title, id, completed }),
    }));
    this.saveList({ title, id, completed });
  }
  saveList({ title, id, completed }) {
    fetch(this.state.url, {
      method: "POST",
      body: JSON.stringify({ title, id, completed }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
  removeList(removeTarget) {
    const { list } = this.state;
    const removedList = list.filter(
      (project) => project["id"] !== removeTarget
    );
    this.setState({ list: removedList });
    this.deleteList(removeTarget);
  }
  deleteList(removeTarget) {
    fetch(`${this.state.url}/${removeTarget}`, { method: "DELETE" });
  }
  changeList(target, changedTitle) {
    const { list } = this.state;
    const updatedList = list.slice().map((todo) => {
      if (todo["id"] === target) todo["title"] = changedTitle;
      return todo;
    });
    this.setState({ list: updatedList });
    this.changeTitle(target, changedTitle);
  }
  changeTitle(targetId, changedTitle) {
    fetch(`${this.state.url}/${targetId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetId, changedTitle }),
    });
  }
  componentDidMount() {
    fetch(this.state.url)
      .then((res) => res.json())
      .then((list) => this.setState({ list }));
  }
  render() {
    const { list } = this.state;
    const { currentUser, mode, theme } = this.props;
    return (
      <Main theme={theme} mode={mode}>
        <Form onSubmit={this.paintList}>
          <InputText type="text" mode={mode} placeholder="할일 추가하기" />
          <InputButton mode={mode}>
            <MdAddBox />
          </InputButton>
        </Form>
        {list.map((todo) => (
          <ProjectList
            title={todo.title}
            key={todo.id}
            id={todo.id}
            completed={todo.completed}
            removeList={this.removeList}
            changeList={this.changeList}
            currentUser={currentUser}
            mode={mode}
          />
        ))}
      </Main>
    );
  }
}

export default ProjectContainer;
