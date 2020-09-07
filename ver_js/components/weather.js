const todoWeatherPresenter = (contents, showForecast = false) => {
  if (contents) {
    if (showForecast) {
      contents.forEach((subContent) => {
        const hoursWeather = document.createElement("div");
        const { url, temp, feel, time } = subContent;
        const hoursTime = document.createElement("h6");
        const hoursIcon = document.createElement("img");
        const hoursTemp = document.createElement("span");
        const hoursfeel = document.createElement("span");
        hoursTime.innerHTML = time;
        hoursIcon.src = url;
        hoursTemp.innerHTML = temp;
        hoursfeel.innerHTML = feel;
        weatherBox.append(hoursWeather);
        hoursWeather.append(hoursTime, hoursIcon, hoursTemp, hoursfeel);
        hoursWeather.classList.add("hours-weather");
      });
    } else {
      const { url } = contents;
      const currentIcon = document.createElement("img");
      currentIcon.src = url;
      currentIcon.classList.add("current-icon");
      weatherBox.append(currentIcon);
    }
  }
};

export const mainWeatherPresenter = (contents) => {
  if (contents) {
    const randNum = Math.floor(Math.random() * 4);
    const body = document.querySelector("body");
    const { date, main, ...rest } = contents;
    // body.style = `background-image: url(${`../assets/Clouds_3`})`;
    const mainDate = document.createElement("div");
    mainDate.innerHTML = date;
    const mainClock = document.createElement("div");
    const getTime = () => {
      const current = new Date();
      const hours = current.getHours();
      const minutes = current.getMinutes();
      const seconds = current.getSeconds();
      mainClock.innerHTML = `${
        hours > 9 ? hours : `0${hours}`
      }&nbsp;&nbsp;:&nbsp;&nbsp;${
        minutes > 9 ? minutes : `0${minutes}`
      }&nbsp;&nbsp;:&nbsp;&nbsp;${seconds > 9 ? seconds : `0${seconds}`}`;
    };
    setInterval(getTime, 1000);
    const mainWeather = document.createElement("ul");
    for (let prop in rest) {
      const li = document.createElement("li");
      if (prop === "url") {
        const icon = document.createElement("img");
        icon.src = rest["url"];
        li.append(icon);
      } else {
        li.innerHTML = rest[prop];
      }
      mainWeather.append(li);
    }
    getTime();
    mainWrap.prepend(mainDate, mainClock, mainWeather);
    mainWeather.classList.add("main-weather");
  }
};
export const weatherContainer = async (latitude, longitude, isTodo) => {
  if (!latitude || !longitude) return;
  let showForecast = true;
  let contents;
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const { current, hourly } = await fetch(
    `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=33fb5c0e3003827e079f49cb15c2da51&units=metric`
  ).then((response) => response.json());
  const getCurrentWeather = async () => {
    const {
      dt,
      feels_like: feelTemp,
      wind_speed,
      uvi,
      humidity,
      temp,
      weather: [{ main, icon }],
    } = current;
    const { url } = await fetch(
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
    const now = new Date(dt * 1000);
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = days[now.getDay()];
    const date = now.getDate();

    contents = {
      date: `${year}년 ${month}월 ${date}일 (${day})`,
      url,
      main,
      temp: `${temp}&deg;C`,
      feelTemp: `체감온도 ${feelTemp}&deg;`,
      hum: `습도 ${humidity}%`,
      windSpeed: `풍속 ${wind_speed}m/s`,
      uvi: `자외선지수 ${uvi}`,
    };
  };
  const getWeatherForecast = async () => {
    contents = [];
    for (let i = 0; i <= 24; i += 3) {
      const {
        dt,
        feels_like: feelTemp,
        humidity,
        temp,
        weather: [{ main, icon }],
      } = hourly[i];
      const { url } = await fetch(
        `http://openweathermap.org/img/wn/${icon}@2x.png`
      );
      const now = new Date(dt * 1000);
      const date = now.getDate();
      const hours = now.getHours();
      const subContents = {
        time: `${date}일 ${hours >= 10 ? hours : `0${hours}`}시`,
        temp: `${Math.round(temp)}&deg;`,
        feel: `체감 ${Math.round(feelTemp)}&deg;`,
        url,
      };
      contents.push(subContents);
    }
  };
  const todoPaint = async () => {
    showForecast = !showForecast;
    await (showForecast ? getWeatherForecast() : getCurrentWeather());
    const child = weatherBox.childNodes;
    if (child.length) {
      for (let i = child.length - 1; i >= 0; i--) {
        child[i].remove();
      }
    }
    todoWeatherPresenter(contents, showForecast);
  };
  const mainPaint = async () => {
    await getCurrentWeather();
    mainWeatherPresenter(contents);
  };
  if (isTodo) {
    weatherBox.addEventListener("click", todoPaint);
    todoPaint();
  } else {
    mainPaint();
  }
};
