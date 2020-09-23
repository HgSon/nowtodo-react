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
const BtnBox = styled.div`
  margin: 0 auto;
  ${(props) => {
    const { mode, theme, width, minWidth, maxWidth } = props;
    const color = {
      day: {
        text: theme[mode].paper,
        back: [theme[mode].secondaryLight, theme[mode].dark, theme[mode].light],
      },
      night: {
        text: theme[mode].text,
        back: [theme[mode].light, theme[mode].dark, theme[mode].main],
      },
    };
    return css`
      width: ${width};
      min-width: ${minWidth || width};
      max-width: ${maxWidth || width};
      & a {
        color: ${color[mode].text};
        display: block;
        width: 100%;
        text-decoration: none;
        text-align: center;
        font-size: 14px;
        height: 25px;
        line-height: 25px;
        margin-bottom: 8px;
      }
      .signup {
        background: ${color[mode].back[0]};
      }
      .login {
        background: ${color[mode].back[1]};
      }
      .main {
        background: ${color[mode].back[2]};
      }
    `;
  }}
`;
export const LinkBtns = (props) => {
  return (
    <BtnBox
      mode={props.mode}
      width={props.width}
      minWidth={props.minWidth}
      maxWidth={props.maxWidth}
    >
      {props.links.map((link) => (
        <Link
          key={link}
          className={link}
          to={{ pathname: clientRoutes[link], state: { mode: props.mode } }}
        >
          {link}
        </Link>
      ))}
    </BtnBox>
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
