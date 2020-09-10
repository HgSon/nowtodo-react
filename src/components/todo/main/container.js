import React from "react";
import ProjectList from "./project";
import TodoSublist from "./sublist";

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
  async componentDidMount() {
    // const dbList = !this.props.isSublist
    //   ? await fetch("http://localhost:3001/api/project")
    //   : await fetch("http://localhost:3001/api/sublist");
    // res.json()
    console.log("mount");
  }
  async componentDidUpdate() {
    console.log("update");
    // const dbList
    //if dblist !== list
    //post list
  }
  render() {
    const { list } = this.state;
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
