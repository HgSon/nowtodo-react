import React from "react";
import styled, { css } from "styled-components";

const WeatherBox = styled.div`
  & li {
    list-style: none;
  }
  & a {
    text-decoration: none;
    color: inherit;
  }
`;
const ClockBox = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  height: 80px;
  // background: red;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const DateSpan = styled.span`
  font-size: 16px;
`;
const TimeSpan = styled.span`
  font-size: 42px;
`;

const DescBox = styled.div`
  display: grid;
  width: 100%;
  height: 100px;
  grid-template-columns: 100px 1fr 1fr;
  grid-template-rows: repeat(7,1fr)
  position: relative;
  & img {
    // position: relative;
    // top: -50px;
    grid-row: 1/8;
  }
  & ul {
    margin: 0;
    box-sizing: border-box;
    padding: 20px 0 0 6px;
  }
  & li {
    font-size: 10px;
  }
`;
const Temp = styled.div`
  font-size: 44px;
  text-align: center;
  line-height: 100px;
`;

//main
class MainWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = { weather: null };
  }
  async componentDidMount() {
    const { latitude, longitude } = this.props.location;
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=33fb5c0e3003827e079f49cb15c2da51&units=metric`
    );
    const {
      current: {
        feels_like: feelTemp,
        wind_speed,
        uvi,
        humidity,
        temp,
        weather: [{ main, icon }],
      },
    } = await response.json();
    const { url } = await fetch(
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
    const weather = {
      url,
      main,
      temp: `${temp}\u00B0C`,
      feelTemp: `체감온도 ${feelTemp}\u00B0`,
      hum: `습도 ${humidity}%`,
      windSpeed: `풍속 ${wind_speed}m/s`,
      uvi: `자외선지수 ${uvi}`,
    };
    this.setState({ weather });
  }
  render() {
    const randNum = Math.floor(Math.random() * 4);
    const { weather } = this.state;
    if (!weather) return null;
    const bgImg = `${weather.main}_${randNum}`;
    const body = document.querySelector("body");
    body.style.backgroundImage = `url(../../assets/bgImg/${bgImg}.jpg)`;
    return (
      <WeatherBox>
        <Clock />
        <WeatherDescription weather={weather} />
      </WeatherBox>
    );
  }
}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.getTime = this.getTime.bind(this);
    this.state = { currentDate: "", currentTime: "" };
  }
  getTime() {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const current = new Date();
    const years = current.getFullYear();
    const month = current.getMonth() + 1;
    const date = current.getDate();
    const day = days[current.getDay()];
    const hours = current.getHours();
    const minutes = current.getMinutes();
    const seconds = current.getSeconds();
    const currentDate = `${years}년 ${month}월 ${date}일 (${day})`;
    const currentTime = `${hours > 9 ? hours : `0${hours}`} : ${
      minutes > 9 ? minutes : `0${minutes}`
    } : ${seconds > 9 ? seconds : `0${seconds}`}`;
    this.setState({ currentDate, currentTime });
  }
  componentDidMount() {
    this.getTime();
    setInterval(this.getTime, 1000);
  }
  render() {
    return (
      <ClockBox>
        <DateSpan>{this.state.currentDate}</DateSpan>
        <TimeSpan>{this.state.currentTime}</TimeSpan>
      </ClockBox>
    );
  }
}
function WeatherDescription(props) {
  const { url, temp, feelTemp, hum, windSpeed, uvi } = props.weather;

  return (
    <DescBox>
      <img src={url} alt="weather icon" />
      <Temp>{temp}</Temp>
      <ul>
        <li>{feelTemp}</li>
        <li>{hum}</li>
        <li>{windSpeed}</li>
        <li>{uvi}</li>
      </ul>
    </DescBox>
  );
}

export default MainWeather;
