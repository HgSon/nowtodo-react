import React from "react";
import Weather from "../components/weather";
import { CompleteBtn, DeleteBtn } from "../components/buttons";
import TodoUpdater from "../components/todoUpdater";

class TodoHeader extends React.Component {
  render() {
    return (
      <header>
        <Weather isTodo={true} />
        {/* login/logout, changeID, day/night */}
      </header>
    );
  }
}

class TodoLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { projectList: [] };
    this.paintProject = this.paintProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.changeProject = this.changeProject.bind(this);
  }
  paintProject(event) {
    event.preventDefault();
    event.persist();
    const projectName = event.currentTarget.firstElementChild.value;
    event.currentTarget.firstElementChild.value = "";
    const id = Date.now();
    this.setState((state) => ({
      projectList: state.projectList.concat({ projectName, id }),
    }));
  }
  deleteProject(event) {
    event.persist();
    const projectName =
      event.currentTarget.parentNode.firstElementChild.innerHTML;
    const { projectList } = this.state;
    const deletedList = projectList.filter(
      (project) => project["projectName"] !== projectName
    );
    this.setState({ projectList: deletedList });
  }
  changeProject(currentName, changedName) {
    const { projectList } = this.state;
    const updatedProjectList = projectList.slice().map((project) => {
      if (project["projectName"] === currentName)
        project["projectName"] = changedName;
      return project;
    });
    this.setState({ projectList: updatedProjectList });
  }
  render() {
    const { projectList } = this.state;
    return (
      <main>
        <form id="newProjectForm" onSubmit={this.paintProject}>
          <input type="text" id="newProjectText" placeholder="새 프로젝트" />
        </form>
        {projectList.map((project) => {
          return (
            <TodoProject
              key={project.id}
              projectName={project.projectName}
              deleteProject={this.deleteProject}
              changeProject={this.changeProject}
            />
          );
        })}
      </main>
    );
  }
}
class TodoProject extends React.Component {
  constructor(props) {
    super(props);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.saveSubTodo = this.saveSubTodo.bind(this);
    this.state = { isCompleted: false, subList: [], isChanging: false };
  }
  toggleComplete() {
    this.setState((state) => ({ isCompleted: !state.isCompleted }));
  }
  toggleChange() {
    this.setState((state) => ({ isChanging: !state.isChanging }));
  }
  saveSubTodo(event) {
    event.preventDefault();
    event.persist();
    const subTodo = event.currentTarget.value;
    this.setState((state) => ({ subList: state.subList.push(subTodo) }));
  }
  deleteSubTodo() {}
  changeSubTodo() {}
  render() {
    const { deleteProject, projectName, changeProject } = this.props;
    const { isCompleted, isChanging, subList } = this.state;
    const projectOpacity = isCompleted ? "0.4" : "1";
    return (
      <div className="subList" style={{ opacity: projectOpacity }}>
        <ProjectTitle
          changeProject={changeProject}
          isCompleted={isCompleted}
          isChanging={isChanging}
          deleteProject={deleteProject}
          projectName={projectName}
          toggleChange={this.toggleChange}
        />
        <ul>
          {subList.map((subTodo) => (
            <SubTodoList
              key={subTodo}
              // 아이디만들어서 JSON으로.
              changeSubTodo={this.changeSubTodo}
              deleteSubTodo={this.deleteSubTodo}
            >
              {subTodo}
            </SubTodoList>
          ))}
        </ul>
        <form>
          <input
            onSubmit={this.saveSubTodo}
            type="text"
            placeholder="todo"
          ></input>
        </form>
      </div>
    );
  }
}

class ProjectTitle extends React.Component {
  render() {
    const {
      isChanging,
      isCompleted,
      projectName,
      toggleComplete,
      deleteProject,
      toggleChange,
      changeProject,
    } = this.props;
    return isChanging ? (
      <TodoUpdater
        toggleChange={toggleChange}
        changeTodo={changeProject}
        projectName={projectName}
      />
    ) : (
      <>
        <h2 className="projectName" onClick={toggleChange}>
          {projectName}
        </h2>
        <CompleteBtn onClick={toggleComplete} isCompleted={isCompleted} />
        <DeleteBtn onClick={deleteProject} />
      </>
    );
  }
}
class SubTodoList extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSubComplete = this.toggleSubComplete.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.state = { isCompleted: false, isChanging: false };
  }
  toggleSubComplete() {
    this.setState((state) => ({ isCompleted: state.isCompleted }));
  }
  toggleChange() {
    this.setState((state) => ({ isChanging: !state.isChanging }));
  }
  render() {
    const { isCompleted, isChanging } = this.state;
    const itemColor = isCompleted ? "rgba(255,255,255,0.4)" : "white";
    return (
      <li>
        <CompleteBtn
          onClick={this.toggleSubComplete}
          isCompleted={isCompleted}
        />
        <DeleteBtn onClick={this.props.deleteSubTodo} />
        {isChanging ? (
          <todoUpdater
            toggleChange={this.toggleChange}
            changeTodo={this.props.changeSubTodo}
          />
        ) : (
          <span style={{ color: itemColor }} onClick={this.toggleChange}>
            {this.props.children}
          </span>
        )}
      </li>
    );
  }
}

class Todo extends React.Component {
  render() {
    const currentUser = "tester";
    return (
      <div className="todoWrap">
        <TodoHeader currentUser={currentUser} />
        <TodoLists currentUser={currentUser} />
      </div>
    );
  }
}
export default Todo;
