import React from "react";
import styled, { css } from "styled-components";

const InputText = styled.input`
  all: unset;
  // border-bottom: 0.1em dashed;
  padding: 0 10px 0 0;
  font-size: 12px;
  font-style: italic;
  // width: 100%;
  ${(props) => {
    const { mode, theme } = props;
    return css`
      color: ${theme[mode].textDisabled};
      background: ${theme[mode].back};
      // border-color: ${theme[mode].back};
    `;
  }};
`;
const TodoUpdater = React.forwardRef((props, ref) => {
  function handleSubmit(event) {
    event.preventDefault();
    event.persist();
    const { toggleChange, changeTodo, target } = props;
    const changedName = event.currentTarget.firstElementChild.value;
    toggleChange();
    changeTodo(target, changedName);
    event.currentTarget.firstElementChild.value = "";
  }
  return (
    <form onSubmit={handleSubmit}>
      <InputText type="text" ref={ref} mode={props.mode} />
    </form>
  );
});
export default TodoUpdater;
