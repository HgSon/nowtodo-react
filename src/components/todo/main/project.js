import React from "react";
import TodoUpdater from "../../partials/todoUpdater";
import { CompleteBtn, DeleteBtn } from "../../partials/buttons";
import TodoContainer from "./container";
class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.state = { isCompleted: false, isChanging: false };
  }
  toggleComplete() {
    this.setState((state) => ({ isCompleted: !state.isCompleted }));
  }
  toggleChange() {
    this.setState((state) => ({ isChanging: !state.isChanging }));
  }
  render() {
    const { title, removeList, changeList } = this.props;
    const { isCompleted, isChanging } = this.props;
    const projectOpacity = isCompleted ? "0.4" : "1";
    return (
      <div style={{ opacity: projectOpacity }}>
        {isChanging ? (
          <TodoUpdater
            toggleChange={this.toggleChange}
            changeTodo={changeList}
            currentName={title}
          />
        ) : (
          <>
            <h1 onClick={this.toggleChange}>{title}</h1>
            <CompleteBtn
              toggleComplete={this.toggleComplete}
              isCompleted={isCompleted}
            />
            <DeleteBtn removeList={removeList} />
          </>
        )}
        <TodoContainer isSublist={true} />
      </div>
    );
  }
}
export default ProjectList;
