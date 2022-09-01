let now = new Date();
console.log(now.getDate());
let currentTime = document.querySelector("#current-time");

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

currentTime.innerHTML = `${day} ${hour}:${minutes}`;

function currentTemperature(response) {
  let name = Math.round(response.data.main.name);
  let condition = Math.round(response.data.weather[0].main);
  let temperature = Math.round(response.data.main.temp);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);

  console.log(name);
  console.log(condition);
  console.log(wind);
  console.log(humidity);
  console.log(temperature);

  let cityName = `${name}`;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  console.log(cityName);

  let nowCondition = `${condition}`;
  let condi = document.querySelector("#current-condition");
  condi.innerHTML = response.data.weather[0].main;
  console.log(nowCondition);

  let nowTemp = `${temperature}`;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = response.data.main.temp;
  console.log(nowTemp);

  let nowHumid = `${humidity}`;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = response.data.main.humidity;
  console.log(nowHumid);

  let nowWind = `${wind}`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = response.data.wind.speed;
  console.log(nowWind);
}

function searchCity(city) {
  let apiKey = "392231d2951c2560472a32889160d826";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemperature);
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;

  searchCity(cityInput.value);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";

  let apiKey = "392231d2951c2560472a32889160d826";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(currentTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);

let currentPositionButton = document.querySelector("#current-location-button");
currentPositionButton.addEventListener("click", getCurrentPosition);

searchCity("New York");
