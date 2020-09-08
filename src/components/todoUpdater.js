import React from "react";

class todoUpdater extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    this.props.toggleChange();
    this.props.changeTodo();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" />
      </form>
    );
  }
}
export default todoUpdater;
