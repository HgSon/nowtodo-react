import React from "react";
import routes from "../routes";
import { Link } from "react-router-dom";

export const LinkBtns = (props) => {
  return (
    <div>
      {props.links.map((link) => (
        <Link key={link} to={routes[link]}>
          {link}
        </Link>
      ))}
    </div>
  );
};

export function CompleteBtn(props) {
  return (
    <button onClick={props.onClick}>
      {props.isCompleted ? <i className="fas fa-check" /> : null}
    </button>
  );
}
export function DeleteBtn(props) {
  return (
    <button onClick={props.onClick}>
      {/* <i className="far fa-trash-alt" /> */}
    </button>
  );
}
