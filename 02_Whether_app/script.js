document.addEventListener("DOMContentLoaded", () => {
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const cityInputput = document.getElementById("city-input");
  const displayWeatherInfo = document.getElementById("weather-info");
  const dislayErrorMsg = document.getElementById("error-message");
  const cityName = document.getElementById("city-name");
  const cityTempreture = document.getElementById("temperature");
  const weatherDes = document.getElementById("description");
  const API_KEY = "b25aecffba9072f31ba672ce67731613";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInputput.value.trim();
    if (city === "") {
      alert("please enter city name");
      return;
    }
    //server may throw error
    //server is always in different continent
    try {
      const data = await fetchWeatherData(city);
      displayWeatherData(data);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const response = await fetch(url);
    //since fetched data is a Response Object it needs to converted to Javascript object
    //alternative method
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));
    console.log(typeof response);
    console.log("Response : ", response);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = response.json();
    return data;
  }

  function showError() {
    dislayErrorMsg.classList.remove("hidden");
    displayWeatherInfo.classList.add("hidden");
  }

  function displayWeatherData(data) {
    console.log(data);
    //object destructuring
    displayWeatherInfo.classList.remove("hidden");
    dislayErrorMsg.classList.add("hidden");
    const { name, main, weather } = data;
    // name.textContent = data.name;
    // tempreture.textContent = data.main.temp;
    cityName.textContent = name;
    cityTempreture.textContent = main.temp;
    weatherDes.textContent = weather[0].description;
  }
});
