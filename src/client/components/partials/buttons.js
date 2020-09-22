import React from "react";
import { clientRoutes } from "../../../routes";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  MdCheckBoxOutlineBlank,
  MdIndeterminateCheckBox,
  MdCheckBox,
  MdAutorenew,
} from "react-icons/md";

const TodoBtn = styled.button`
  all: unset;
  ${(props) => {
    const { mode, theme, btn, isCompleted } = props;
    let textColor = "";
    if (mode === "night") {
      textColor = theme[mode].text;
    } else {
      if (btn === "deleteBtn") {
        textColor = theme[mode].secondaryLight || theme[mode].main;
      } else if (btn === "changeBtn") {
        textColor = theme[mode].light;
      } else if (btn === "completeBtn") {
        textColor = isCompleted ? theme[mode].dark : theme[mode].light;
      }
    }

    return css`
      color: ${textColor};
    `;
  }}
`;
export const LinkBtns = (props) => {
  return (
    <div>
      {props.links.map((link) => (
        <Link key={link} to={clientRoutes[link]}>
          {link}
        </Link>
      ))}
    </div>
  );
};

export function CompleteBtn(props) {
  return (
    <TodoBtn
      isCompleted={props.isCompleted}
      btn={"completeBtn"}
      onClick={props.toggleComplete}
      mode={props.mode}
    >
      {props.isCompleted ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
    </TodoBtn>
  );
}
export function DeleteBtn(props) {
  function handleClick() {
    props.removeList(props.removeTarget);
  }
  return (
    <TodoBtn onClick={handleClick} btn={"deleteBtn"} mode={props.mode}>
      <MdIndeterminateCheckBox />
    </TodoBtn>
  );
}
export const ChangeBtn = (props) => (
  <TodoBtn
    onClick={() => props.toggleChange()}
    mode={props.mode}
    btn={"changeBtn"}
  >
    <MdAutorenew />
  </TodoBtn>
);
