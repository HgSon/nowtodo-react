import React from "react";
import TodoUpdater from "../partials/todoUpdater";
import { CompleteBtn, DeleteBtn } from "../partials/buttons";
import SublistContainer from "./sublistContainer";
class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.state = {
      isCompleted: this.props.completed,
      isChanging: false,
      url: `http://localhost:3001/api/${this.props.currentUser}/projects`,
    };
  }
  toggleComplete() {
    const { isCompleted: completed } = this.state;
    this.setState({ isCompleted: !completed });
    const { id: targetId } = this.props;
    fetch(`${this.state.url}/${targetId}`, {
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
    const { title, id, removeList, changeList } = this.props;
    const { isCompleted, isChanging } = this.state;
    const projectOpacity = isCompleted ? "0.4" : "1";
    return (
      <div style={{ opacity: projectOpacity }}>
        {isChanging ? (
          <TodoUpdater
            toggleChange={this.toggleChange}
            changeTodo={changeList}
            target={id}
          />
        ) : (
          <>
            <h1 style={{ cursor: "pointer" }} onClick={this.toggleChange}>
              {title}
            </h1>
            <CompleteBtn
              toggleComplete={this.toggleComplete}
              isCompleted={isCompleted}
            />
            <DeleteBtn removeList={removeList} removeTarget={this.props.id} />
          </>
        )}
        <SublistContainer projectId={id} currentUser={this.props.currentUser} />
      </div>
    );
  }
}
export default ProjectList;
