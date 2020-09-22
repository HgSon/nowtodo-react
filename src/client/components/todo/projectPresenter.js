import React from "react";
import TodoUpdater from "../partials/todoUpdater";
import { CompleteBtn, DeleteBtn, ChangeBtn } from "../partials/buttons";
import SublistContainer from "./sublistContainer";
import styled, { css } from "styled-components";

const TodoBox = styled.div`
  width: 100%;
  height: auto;
  margin: 20px 0;
  padding: 15px 20px;
  box-sizing: border-box;
  ${(props) => {
    const { mode, theme } = props;
    return css`
      background: ${theme[mode].paper};
    `;
  }}
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & h1 {
    text-align: center;
    font-size: 14px;
    margin: 0;
    cursor: pointer;
  }
  & button {
    font-size: 14px;
    position: relative;
    top: 2px;
    left: 4px;
  }
`;
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
    this.ref = React.createRef();
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
  componentDidUpdate() {
    if (this.ref.current) {
      this.ref.current.focus();
    }
  }
  render() {
    const { title, id, removeList, changeList, mode } = this.props;
    const { isCompleted, isChanging } = this.state;
    const projectOpacity = isCompleted ? "0.4" : "1";
    return (
      <TodoBox style={{ opacity: projectOpacity }} mode={mode}>
        <TitleBox>
          {isChanging ? (
            <TodoUpdater
              toggleChange={this.toggleChange}
              changeTodo={changeList}
              target={id}
              mode={mode}
              ref={this.ref}
            />
          ) : (
            <h1 onClick={this.toggleChange}>{title}</h1>
          )}
          <ChangeBtn toggleChange={this.toggleChange} mode={mode} />
          <CompleteBtn
            mode={mode}
            toggleComplete={this.toggleComplete}
            isCompleted={isCompleted}
          />
          <DeleteBtn
            mode={mode}
            removeList={removeList}
            removeTarget={this.props.id}
          />
        </TitleBox>

        <SublistContainer
          projectId={id}
          currentUser={this.props.currentUser}
          mode={mode}
        />
      </TodoBox>
    );
  }
}
export default ProjectList;
