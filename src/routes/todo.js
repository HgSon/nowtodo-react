import React from "react";
import Weather from "../components/weather";
import { CompleteBtn, DeleteBtn } from "../components/buttons";

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
    this.saveProject = this.saveProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.changeProject = this.changeProject.bind(this);
  }
  saveProject(event) {
    event.preventDefault();
    const newPrject = document.getElementById("newProjectText");
    this.setState((state) => ({
      projectList: state.projectList.push(newPrject.value),
    }));
  }
  deleteProject(event) {
    event.persist();
    const project = event.currentTarget.parentNode().value;
    this.setState((state) => ({
      projectList: state.projectList.filter((v) => v !== project),
    }));
  }
  changeProject(event) {
    const project = event.currentTarget.value;
    // this.setState(state=>()) input 받아서 splice
  }
  render() {
    const { projectList } = this.state;
    if (!projectList) return null;
    return (
      <main>
        <form id="newProjectForm" onSubmit={this.saveProject}>
          <input type="text" id="newProjectText" placeholder="새 프로젝트" />
        </form>
        {projectList.map((project) => {
          return (
            <TodoProject
              projectName={project}
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
  render() {
    return (
      <dl className="subList">
        <dt>
          project name
          <CompleteBtn />
          <DeleteBtn />
        </dt>
        <SubTodoList />
      </dl>
    );
  }
}
class SubTodoList extends React.Component {
  render() {
    return (
      <>
        <dd>
          <CompleteBtn />
          <DeleteBtn />
          todo
        </dd>
        <form>
          <input type="text" placeholder="todo"></input>
        </form>
      </>
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
