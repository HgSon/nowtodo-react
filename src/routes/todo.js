import React from "react";
import Weather from "../components/weather";

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

function CompleteBtn() {
  return (
    <button>
      <i className="fas fa-check" />
    </button>
  );
}
function DeleteBtn() {
  return (
    <button>
      <i className="far fa-trash-alt" />
    </button>
  );
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
        <dd>
          <CompleteBtn />
          <DeleteBtn />
          todo
        </dd>
        <form>
          <input type="text" placeholder="todo"></input>
        </form>
      </dl>
    );
  }
}
class TodoLists extends React.Component {
  render() {
    let projectList = [];
    let creator = null;
    return (
      <main>
        <form id="newProjectForm">
          <input type="text" id="newProjectText" placeholder="새 프로젝트" />
        </form>
        <TodoProject />
      </main>
    );
  }
}
class Todo extends React.Component {
  render() {
    return (
      <div className="todoWrap">
        <TodoHeader />
        <TodoLists />
      </div>
    );
  }
}
export default Todo;
