import React from "react";

const TodoUpdater = (props) => {
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
      <input type="text" />
    </form>
  );
};
export default TodoUpdater;
