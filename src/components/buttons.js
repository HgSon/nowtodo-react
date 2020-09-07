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

export function CompleteBtn() {
  return (
    <button>
      <i className="fas fa-check" />
    </button>
  );
}
export function DeleteBtn() {
  return (
    <button>
      <i className="far fa-trash-alt" />
    </button>
  );
}
