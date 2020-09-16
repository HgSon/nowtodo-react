import React from "react";
import { serverRoutes } from "../../../../routes";
import ProjectList from "./projectPresenter";

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
  }
  paintList(event) {
    event.preventDefault();
    event.persist();
    const title = event.currentTarget.firstElementChild.value;
    event.currentTarget.firstElementChild.value = "";
    const id = Date.now();
    this.setState((state) => ({
      list: state.list.concat({ title, id }),
    }));
    this.saveList({ title, id });
  }
  saveList({ title, id }) {
    fetch(this.state.url, {
      method: "POST",
      body: JSON.stringify({ title, id }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
  removeList(removeTarget) {
    const { list } = this.state;
    const removedList = list.filter(
      (project) => project["title"] !== removeTarget
    );
    this.setState({ list: removedList });
    this.deleteList(removeTarget);
  }
  deleteList(removeTarget) {
    fetch(this.state.url, { method: "DELETE" });
  }
  changeList(currentTitle, changedTitle) {
    const { list } = this.state;
    const updatedList = list.slice().map((todo) => {
      if (todo["title"] === currentTitle) todo["title"] = changedTitle;
      return todo;
    });
    this.setState({ list: updatedList });
    this.changeTitle(currentTitle, changedTitle);
  }
  changeTitle(currentTitle, changedTitle) {
    fetch(this.state.url, { method: "PATCH" });
  }
  componentDidMount() {
    fetch(this.state.url)
      .then((res) => res.json())
      .then((list) => this.setState({ list }))
      .then(() => console.log("list", this.state.list));
  }

  render() {
    const { list } = this.state;
    return (
      <main>
        <form onSubmit={this.paintList}>
          <input type="text" placeholder="새 프로젝트" />
        </form>
        {list.map((todo) => (
          <ProjectList
            title={todo.title}
            key={todo.id}
            removeList={this.removeList}
            changeList={this.changeList}
          />
        ))}
      </main>
    );
  }
}

export default ProjectContainer;
