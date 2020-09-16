import React from "react";
import { DeleteBtn, CompleteBtn } from "../../partials/buttons";
import TodoUpdater from "../../partials/todoUpdater";

class TodoSublist extends React.Component {
  constructor(props) {
    super(props);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.state = { isCompleted: false, isChanging: false };
    this.removeTarget = React.createRef();
  }
  toggleComplete() {
    this.setState((state) => ({ isCompleted: !state.isCompleted }));
  }
  toggleChange() {
    this.setState((state) => ({ isChanging: !state.isChanging }));
  }
  render() {
    const { title, removeList, changeList } = this.props;
    const { isCompleted, isChanging } = this.state;
    const listOpacity = isCompleted ? "0.4" : "1";
    return (
      <li>
        <CompleteBtn
          toggleComplete={this.toggleComplete}
          isCompleted={isCompleted}
        />
        <DeleteBtn removeList={removeList} removeTarget={this.removeTarget} />
        {isChanging ? (
          <TodoUpdater
            toggleChange={this.toggleChange}
            changeTodo={changeList}
            currentName={title}
          />
        ) : (
          <span
            style={{ opacity: listOpacity, cursor: "pointer" }}
            onClick={this.toggleChange}
            ref={this.removeTarget}
          >
            {title}
          </span>
        )}
      </li>
    );
  }
}

export default TodoSublist;
