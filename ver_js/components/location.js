import { weatherContainer } from "./weather.js";

export const getLocation = (isTodo = false) => {
  if (navigator.geolocation) {
    const success = (position) => {
      const {
        coords: { latitude, longitude },
      } = position;
      weatherContainer(latitude, longitude, isTodo);
    };
    const error = () => {
      weatherBox.innerHTML = "위치정보를 찾을 수 없습니다";
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }
};
