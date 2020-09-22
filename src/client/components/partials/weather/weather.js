import React from "react";
import TodoWeather from "./todoWeather";
import MainWeather from "./mainWeather";

class LocationToWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: null };
    this.success = this.success.bind(this);
  }
  success(position) {
    const {
      coords: { latitude, longitude },
    } = position;
    this.setState({ location: { latitude, longitude } });
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.success);
    }
  }
  render() {
    if (this.state.location) {
      if (this.props.isTodo)
        return <TodoWeather location={this.state.location} />;
      else return <MainWeather location={this.state.location} />;
    }
    return <></>;
  }
}

export default LocationToWeather;
