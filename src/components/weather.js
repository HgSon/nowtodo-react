import React from "react";

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
    const {
      current: {
        weather: [{ icon }],
      },
      hourly,
    } = await fetch(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=33fb5c0e3003827e079f49cb15c2da51&units=metric`
    ).then((response) => response.json());
    this.setState({ currentIcon: icon, hourlyWeather: hourly });
  }
  render() {
    const { currentIcon, hourlyWeather } = this.state;
    return currentIcon && hourlyWeather ? (
      <div className="weatherBox" onClick={this.handleToggle}>
        {this.state.showForecast ? (
          <WeatherForecast hourlyWeather={hourlyWeather} />
        ) : (
          <CurrentWeather currentIcon={currentIcon} />
        )}
      </div>
    ) : null;
  }
}
const WeatherForecast = async (props) => {
  for (let i = 0; i <= 24; i += 3) {
    const {
      dt,
      feels_like: feelTemp,
      temp,
      weather: [{ icon }],
    } = props.hourly[i];
    const { url } = await fetch(
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
    const now = new Date(dt * 1000);
    const date = now.getDate();
    const hours = now.getHours();
    const weather = {
      time: `${date}일 ${hours >= 10 ? hours : `0${hours}`}시`,
      temp: `${Math.round(temp)}&deg;`,
      feelTemp: `체감 ${Math.round(feelTemp)}&deg;`,
    };
    return (
      <div className="hoursWeather" key={dt * 1000}>
        <h6>{weather.time}</h6>
        <img src={url} alt="weather icon" />
        <span>{weather.temp}</span>
        <span>{weather.feeltemp}</span>
      </div>
    );
  }
};
class CurrentWeather extends React.Component {
  state = { url: null };
  async componentDidMount() {
    const { url } = await fetch(
      `http://openweathermap.org/img/wn/${this.props.currentIcon}@2x.png`
    );
    this.setState = { url };
    console.log("mount");
  }
  render() {
    console.log("render");
    const { url } = this.state;
    return url ? <img src={url} alt="current weather icon" /> : null;
  }
}
class MainWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = { weather: null };
  }
  async componentDidMount() {
    const { latitude, longitude } = this.props.location;
    const {
      current: {
        feels_like: feelTemp,
        wind_speed,
        uvi,
        humidity,
        temp,
        weather: [{ main, icon }],
      },
    } = await fetch(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=33fb5c0e3003827e079f49cb15c2da51&units=metric`
    ).then((response) => response.json());
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
      <div>
        <Clock />
        <WeatherDescription weather={weather} />
      </div>
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
    const currentTime = `${hours} : ${minutes} : ${seconds}`;
    this.setState({ currentDate, currentTime });
  }
  componentDidMount() {
    this.getTime();
    setInterval(this.getTime, 1000);
  }
  render() {
    return (
      <div>
        <span>{this.state.currentDate}</span>
        <span>{this.state.currentTime}</span>
      </div>
    );
  }
}
function WeatherDescription(props) {
  const { url, temp, feelTemp, hum, windSpeed, uvi } = props.weather;

  return (
    <div>
      <img src={url} alt="weather icon" />
      <li>{temp}</li>
      <li>{feelTemp}</li>
      <li>{hum}</li>
      <li>{windSpeed}</li>
      <li>{uvi}</li>
    </div>
  );
}

export default LocationToWeather;
