import { Link } from "react-router-dom";
import { serverRoutes } from "../../../routes";
import Weather from "../partials/weather";
import React from "react";

function TodoHeader(props) {
  const { changeUser, changeMode, currentUser } = props;
  return (
    <header>
      <Weather isTodo={true} />
      <ChangeID changeUser={changeUser} currentUser={currentUser} />
      <ChangeViewMode changeMode={changeMode} />
      <Link to="/">Logout</Link>
    </header>
  );
}

export default TodoHeader;

function ChangeViewMode({ changeMode }) {
  // css 변경
  function handleClick(event) {
    event.persist();
    changeMode(event.currentTarget.id);
  }
  return (
    <div>
      <button id="day" onClick={handleClick}>
        day
      </button>
      <button id="night" onClick={handleClick}>
        night
      </button>
    </div>
  );
}
class ChangeID extends React.Component {
  // db불러오기 -> 저장한 ID만 목록에 -> 선택 -> 로그인 -> todo 재랜더
  constructor(props) {
    super(props);
    this.state = { showUserList: false, userList: [] };
    this.handleHover = this.handleHover.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }
  handleHover() {
    this.setState((state) => ({ showUserList: !state.showUserList }));
  }
  handleUserClick(event) {
    this.props.changeUser(event.target.id);
  }
  componentDidMount() {
    const url = `http://localhost:3001/api${serverRoutes.users}`;
    fetch(url)
      .then((res) => res.json())
      .then((users) => users.map((user) => user["userName"]))
      .then((userList) => this.setState({ userList }));
  }
  componentDidUpdate() {}
  render() {
    const { showUserList } = this.state;
    const { currentUser } = this.props;
    const display = showUserList ? "block" : "none";
    const userList = this.state.userList
      .filter((user) => user !== currentUser)
      .sort();
    return (
      <div
        style={{ cursor: "pointer" }}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      >
        <div>ID: {currentUser}</div>
        <ul style={{ display: display }}>
          {userList.map((user) => (
            <li onClick={this.handleUserClick} id={user} key={user}>
              {user}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
