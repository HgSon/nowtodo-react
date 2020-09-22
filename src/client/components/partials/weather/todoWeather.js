import React from "react";
import styled, { css } from "styled-components";

const WeatherBox = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  cursor: pointer;
`;
const CurrentIcon = styled.img`
  width: 50px;
  margin-left: 15px;
`;
const Temp = styled.span`
  top: 20px;
`;
const FeelTemp = styled.span`
  top: 30px;
`;
const HoursWeather = styled.div`
  width: 60px;
  height: 100%;
  margin-left: 15px;
  position: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    position: relative;
    & img {
      opacity: 0.4;
    }
    & h6,
    span {
      display: block;
      font-size: 10px;
      position: absolute;
      font-weight: bold;
      width: 100%;
      text-align: center;
    }
    & h6 {
      top: -15px;
    }
  }
  & h6,
  span {
    display: none;
  }
  & img {
    width: 50px;
  }
`;

class TodoWeather extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      showForecast: false,
      currentIcon: null,
      hourlyWeather: null,
    };
  }
  handleToggle() {
    this.setState((state) => ({ showForecast: !state.showForecast }));
  }
  async componentDidMount() {
    const { latitude, longitude } = this.props.location;
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=33fb5c0e3003827e079f49cb15c2da51&units=metric`
    );
    const {
      current: {
        weather: [{ icon }],
      },
      hourly,
    } = await response.json();
    this.setState({ currentIcon: icon, hourlyWeather: hourly });
  }
  render() {
    const { currentIcon, hourlyWeather } = this.state;
    return currentIcon && hourlyWeather ? (
      <WeatherBox onClick={this.handleToggle}>
        {this.state.showForecast ? (
          <WeatherForecast hourlyWeather={hourlyWeather} />
        ) : (
          <CurrentWeather currentIcon={currentIcon} />
        )}
      </WeatherBox>
    ) : null;
  }
}
class WeatherForecast extends React.Component {
  state = { weather: null };
  async componentDidMount() {
    let weathers = [];
    for (let i = 0; i <= 24; i += 3) {
      const {
        dt,
        feels_like: feelTemp,
        temp,
        weather: [{ icon }],
      } = this.props.hourlyWeather[i];
      const { url } = await fetch(
        `http://openweathermap.org/img/wn/${icon}@2x.png`
      );
      const now = new Date(dt * 1000);
      const date = now.getDate();
      const hours = now.getHours();
      const weather = {
        time: `${date}일 ${hours >= 10 ? hours : `0${hours}`}시`,
        temp: `${Math.round(temp)}\u00B0`,
        feelTemp: `체감 ${Math.round(feelTemp)}\u00B0`,
        url,
        dt,
      };
      weathers.push(weather);
    }
    this.setState({ weather: weathers });
  }
  render() {
    const { weather } = this.state;
    return weather
      ? weather.map((value) => {
          const { time, temp, feelTemp, url, dt } = value;
          return (
            <HoursWeather key={dt * 1000}>
              <h6>{time}</h6>
              <img src={url} alt="weather icon" />
              <Temp>{temp}</Temp>
              <FeelTemp>{feelTemp}</FeelTemp>
            </HoursWeather>
          );
        })
      : null;
  }
}

class CurrentWeather extends React.Component {
  state = { url: null };
  async componentDidMount() {
    const { url } = await fetch(
      `http://openweathermap.org/img/wn/${this.props.currentIcon}@2x.png`
    );
    this.setState({ url });
  }
  render() {
    const { url } = this.state;
    return url ? <CurrentIcon src={url} alt="current weather icon" /> : null;
  }
}
export default TodoWeather;
