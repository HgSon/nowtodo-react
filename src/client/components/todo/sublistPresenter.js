import React from "react";
import { DeleteBtn, CompleteBtn } from "../partials/buttons";
import TodoUpdater from "../partials/todoUpdater";

class TodoSublist extends React.Component {
  constructor(props) {
    super(props);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.state = { isCompleted: this.props.completed, isChanging: false };
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
  render() {
    const { title, removeList, changeList, id } = this.props;
    const { isCompleted, isChanging } = this.state;
    const listOpacity = isCompleted ? "0.4" : "1";
    return (
      <li style={{ opacity: listOpacity }}>
        <CompleteBtn
          toggleComplete={this.toggleComplete}
          isCompleted={isCompleted}
        />
        <DeleteBtn removeList={removeList} removeTarget={id} />
        {isChanging ? (
          <TodoUpdater
            toggleChange={this.toggleChange}
            changeTodo={changeList}
            target={id}
          />
        ) : (
          <span style={{ cursor: "pointer" }} onClick={this.toggleChange}>
            {title}
          </span>
        )}
      </li>
    );
  }
}

export default TodoSublist;
