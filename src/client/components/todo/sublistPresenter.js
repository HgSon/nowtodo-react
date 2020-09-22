import React from "react";
import { DeleteBtn, CompleteBtn, ChangeBtn } from "../partials/buttons";
import TodoUpdater from "../partials/todoUpdater";
import styled, { css } from "styled-components";

const TodoLi = styled.li`
  display: flex;
  justify-contents: start;
  & button {
    position: relative;
    font-size: 12px;
    top: 3px;
    left: 10px;
  }
`;
const TodoSpan = styled.span`
  cursor: pointer;
  font-size: 12px;
  ${(props) => {
    const { mode, theme } = props;
    return css`
      color: ${theme[mode].text};
    `;
  }}
`;
class TodoSublist extends React.Component {
  constructor(props) {
    super(props);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.state = { isCompleted: this.props.completed, isChanging: false };
    this.ref = React.createRef();
  }
  toggleComplete() {
    const { isCompleted: completed } = this.state;
    this.setState({ isCompleted: !completed });
    const { id: targetId } = this.props;
    fetch(`${this.props.url}/${targetId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetId, completed: !completed }),
    });
  }
  toggleChange() {
    this.setState((state) => ({ isChanging: !state.isChanging }));
  }
  componentDidUpdate() {
    if (this.ref.current) {
      this.ref.current.focus();
    }
  }
  render() {
    const { title, removeList, changeList, id, mode } = this.props;
    const { isCompleted, isChanging } = this.state;
    const listOpacity = isCompleted ? "0.4" : "1";
    return (
      <TodoLi style={{ opacity: listOpacity }}>
        {isChanging ? (
          <TodoUpdater
            toggleChange={this.toggleChange}
            changeTodo={changeList}
            target={id}
            mode={mode}
            ref={this.ref}
          />
        ) : (
          <TodoSpan onClick={this.toggleChange} mode={mode}>
            {title}
          </TodoSpan>
        )}
        <ChangeBtn toggleChange={this.toggleChange} mode={mode} />
        <CompleteBtn
          toggleComplete={this.toggleComplete}
          isCompleted={isCompleted}
          mode={mode}
        />
        <DeleteBtn removeList={removeList} removeTarget={id} mode={mode} />
      </TodoLi>
    );
  }
}

export default TodoSublist;
