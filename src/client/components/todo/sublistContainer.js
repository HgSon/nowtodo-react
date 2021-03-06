import React from "react";
import TodoSublist from "./sublistPresenter";
import styled, { css } from "styled-components";
const InputText = styled.input`
  all: unset;
  caret-color: transparent;
  // border-bottom: 0.1em dashed;
  padding: 0 10px 0 0;
  font-size: 12px;
  font-style: italic;
  width: 100%;
  ${(props) => {
    const { mode, theme } = props;
    return css`
      color: ${theme[mode].textDisabled};
      // background: ${theme[mode].back};
      // border-color: ${theme[mode].back};
    `;
  }};
`;
class SublistContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      url: `http://localhost:3001/api/${this.props.projectId}/sublists`,
    };
    this.paintList = this.paintList.bind(this);
    this.removeList = this.removeList.bind(this);
    this.changeList = this.changeList.bind(this);
    this.saveList = this.saveList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
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
    const removedList = list.filter((todo) => todo["id"] !== removeTarget);
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
    const { list, url } = this.state;
    return (
      <>
        <ul>
          {list.map((todo) => (
            <TodoSublist
              title={todo.title}
              key={todo.id}
              id={todo.id}
              removeList={this.removeList}
              changeList={this.changeList}
              deleteList={this.deleteList}
              url={url}
              completed={todo.completed}
              mode={this.props.mode}
            />
          ))}
        </ul>
        <form style={{ width: "70%" }} onSubmit={this.paintList}>
          <InputText type="text" placeholder=">" mode={this.props.mode} />
        </form>
      </>
    );
  }
}

export default SublistContainer;
