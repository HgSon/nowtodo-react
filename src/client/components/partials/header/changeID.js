import React from "react";
import styled, { css } from "styled-components";
import { serverRoutes } from "../../../../routes";

const IDBox = styled.div`
  width: 65px;
  font-size: 10px;
  height: auto;
`;
const CurrentID = styled.div`
  font-weight: bold;
  width: 100%;
  line-height: 20px;
  border-right: 1px dashed;
  box-sizing: border-box;
  text-align: center;
  ${(props) => {
    const { mode, theme } = props;
    return css`
      border-color: ${theme[mode].light};
    `;
  }};
`;
const IDList = styled.ul`
  width: 100%;
  height: auto;
  ${(props) => {
    const { mode, theme } = props;
    return css`
      background-color: ${theme[mode].back};
      color: ${theme[mode].textDisabled};
    `;
  }};
  & li {
    width: 100%;
    height: 20px;
    box-sizing: border-box;
    text-align: center;
    line-height: 19px;
    border-bottom: 1px dashed;
    ${(props) => {
      const { mode, theme } = props;
      return css`
        border-color: ${theme[mode].textDisabled};
      `;
    }};
    &:last-child {
      border: none;
    }
    &:hover {
      font-weight: bold;
      ${(props) => {
        const { mode, theme } = props;
        return css`
          color: ${theme[mode].text};
        `;
      }};
    }
    ${(props) => {
      const { mode, theme } = props;
      return css`
        background-color: ${theme[mode].back};
        color: ${theme[mode].textDisabled};
      `;
    }};
  }
`;

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
    const { currentUser, mode, theme } = this.props;
    const display = showUserList ? "block" : "none";
    const userList = this.state.userList
      .filter((user) => user !== currentUser)
      .sort();
    return (
      <IDBox
        style={{ cursor: "pointer" }}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      >
        <CurrentID mode={mode} theme={theme}>
          ID: {currentUser}
        </CurrentID>
        <IDList style={{ display: display }} mode={mode} theme={theme}>
          {userList.map((user) => (
            <li onClick={this.handleUserClick} id={user} key={user}>
              {user}
            </li>
          ))}
        </IDList>
      </IDBox>
    );
  }
}

export default ChangeID;
