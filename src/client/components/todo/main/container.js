import React from "react";
import { serverRoutes } from "../../../../routes";
import ProjectList from "./projectPresenter";
import TodoSublist from "./sublistPresenter";

class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
    this.paintList = this.paintList.bind(this);
    this.removeList = this.removeList.bind(this);
    this.changeList = this.changeList.bind(this);
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
  }
  removeList(removeTarget) {
    const { list } = this.state;
    const removedList = list.filter(
      (project) => project["title"] !== removeTarget
    );
    this.setState({ list: removedList });
  }
  changeList(currentTitle, changedTitle) {
    const { list } = this.state;
    const updatedList = list.slice().map((todo) => {
      if (todo["title"] === currentTitle) todo["title"] = changedTitle;
      return todo;
    });
    this.setState({ list: updatedList });
  }
  componentDidMount() {
    const url = `http://localhost:3001/api${serverRoutes.project}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => console.log(res));
    //   // .then()
    //   // .then((list) => this.setState({ list }))
    //   // .then(() => this.state.list);
  }
  async componentDidUpdate() {
    const { list } = this.state;
    console.log(this.state.list);
    // const path =
    // const url = !this.props.isSublist
    // ? "http://localhost:3001/project";
    // console.log(list);
  }
  render() {
    const { list } = this.state;
    console.log("list", list);
    if (!this.props.isSublist) {
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
    } else {
      return (
        <>
          <ul>
            {list.map((todo) => (
              <TodoSublist
                title={todo.title}
                key={todo.id}
                removeList={this.removeList}
                changeList={this.changeList}
              />
            ))}
          </ul>
          <form onSubmit={this.paintList}>
            <input type="text" placeholder="새 할일" />
          </form>
        </>
      );
    }
  }
}

export default TodoContainer;
