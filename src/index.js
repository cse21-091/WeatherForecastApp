// Define your API key and the base URL for OpenWeather API
const apiKey = "dff5c692192605ee5ed7f95b423ae857";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// Function to fetch weather data for a given city
function fetchWeatherForCity(city) {
  axios
    .get(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`)
    .then(function (response) {
      displayWeatherData(response.data);
    })
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
    });
}

// Function to fetch weather data for the user's current location
function fetchWeatherForCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      axios
        .get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(function (response) {
          displayWeatherData(response.data);
        })
        .catch(function (error) {
          console.error("Error fetching weather data:", error);
        });
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

// Function to display the weather data on the page
function displayWeatherData(data) {
  const city = data.name;
  const temperature = data.main.temp;
  const pressure = data.main.pressure;
  const humidity = data.main.humidity;
  const precipitation = data.weather[0].description;
  const windSpeed = data.wind.speed;

  // Update the page content with the weather information
  document.getElementById("heading-city").textContent = city;
  document.getElementById("temperature").textContent = temperature;
  document.getElementById("pressure").textContent = `Pressure: ${pressure}`;
  document.getElementById("humidity").textContent = `Humidity: ${humidity}`;
  document.getElementById(
    "precipitation"
  ).textContent = `Precipitation: ${precipitation}`;
  document.getElementById("wind").textContent = `Wind: ${windSpeed} m/s`;
}

// Event listener for the search form submission
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchInput = document.getElementById("search-input");
  const city = searchInput.value.trim();
  if (city !== "") {
    fetchWeatherForCity(city);
  }
});

// Event listener for the Current Location button
const currentLocationButton = document.getElementById(
  "current-location-button"
);
currentLocationButton.addEventListener("click", function () {
  fetchWeatherForCurrentLocation();
});

function formatDay(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = time.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
let dayElement = document.querySelector("#day");
let currentTime = new Date();
dayElement.innerHTML = formatDay(currentTime);

function formatDate(date) {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  return `${mm}/${dd}/${yyyy}`;
}
let dateElement = document.querySelector("#date");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);
s