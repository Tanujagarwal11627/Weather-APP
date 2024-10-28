document.addEventListener("DOMContentLoaded", () => {
  const containerApp = document.querySelector(".whole-container");
  const conditionShow = document.querySelector(".city-name-time-date-information");
  const temp = document.querySelector(".temp-details");
  const nameShow = document.querySelector(".city-name");
  const dateShow = document.querySelector(".date");
  const timeShow = document.querySelector(".time");
  const iconShow = document.querySelector(".weather-icon-information img");
  const cloudShow = document.querySelector(".cloud");
  const humidityShow = document.querySelector(".humidity");
  const windShow = document.querySelector(".wind");
  const form = document.querySelector(".check-location");
  const search = document.querySelector(".search-here");
  const citiesShow = document.querySelectorAll(".city");

  let cityInput = "Baheri";

  citiesShow.forEach((city) => {
    city.addEventListener("click", (evt) => {
      cityInput = evt.target.innerHTML;
      fetchWeatherData();
    });
  });

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (search.value.length === 0) {
      alert("Please type in a city name");
    } 
    else 
    {
      cityInput = search.value;
      fetchWeatherData();
      search.value = "";
    }
  });

  const fetchWeatherData = () => {
    fetch( `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=e6abf0cb1708e35c09689db4efc1655e&units=metric` )
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((data) => {
        updateWeatherUI(data);
      })
      .catch((error) => {
        alert(error.message);
        clearWeatherUI();
      });
  };

  const updateWeatherUI = (data) => {
    temp.innerHTML = `${data.main.temp}&#176;`;
    conditionShow.querySelector(".condition-of-the-day").innerHTML = data.weather[0].description;

    const date = new Date(data.dt * 1000);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    dateShow.innerHTML = date.toLocaleDateString(undefined, options);
    timeShow.innerHTML = `${hours}:${minutes}:${seconds}`;
    nameShow.innerHTML = data.name;
    iconShow.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    cloudShow.innerHTML = `${data.clouds.all}%`;
    humidityShow.innerHTML = `${data.main.humidity}%`;
    windShow.innerHTML = `${data.wind.speed} km/h`;

    updateBackgroundImage(data);
  };

  const clearWeatherUI = () => {
    temp.innerHTML = "";
    conditionShow.querySelector(".condition-of-the-day").innerHTML = "";
    dateShow.innerHTML = "";
    timeShow.innerHTML = "";
    nameShow.innerHTML = "";
    iconShow.src = "";
    cloudShow.innerHTML = "";
    humidityShow.innerHTML = "";
    windShow.innerHTML = "";
    containerApp.style.backgroundImage = "";
  };

  const updateBackgroundImage = (data) => {
    let timeOfDay = data.sys.sunset * 1000 > Date.now() ? "day" : "night";

    const code = data.weather[0].id;

    if (code === 800) {
      containerApp.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
    } else if (code >= 801 && code <= 804) {
      containerApp.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
    } else if (code >= 500 && code <= 531) {
      containerApp.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
    } else if (code >= 600 && code <= 622) {
      containerApp.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
    }else if(code>=701 && code<=781){
      containerApp.style.backgroundImage = `url(./images/${timeOfDay}/haze.avif`;
    } else if(code>=200 && code<=232){
      containerApp.style.backgroundImage = `url(./images/${timeOfDay}/thunderstorm.webp`;
    } else {
      containerApp.style.backgroundImage = `url(./images/${timeOfDay}/default.jpg)`;
    }
  };

  fetchWeatherData();
});

const colors = ["white", "black"];

let colorIndex = 0;

let color_input = document.querySelectorAll("*");

function changeTextColor() {
  color_input.forEach((element) => {
    element.style.color = colors[colorIndex];
  });

  colorIndex = (colorIndex + 1) % colors.length;
}

setInterval(changeTextColor, 4000);
