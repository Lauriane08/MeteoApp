import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "latitude") {
      setLatitude(value);
    } else if (name === "longitude") {
      setLongitude(value);
    }
  };

  const handleSubmit = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e8e882d78391c3c9834239a6427948b5&units=metric`
    )
      .then((result) => result.json())
      .then((jsonresult) => {
        setWeatherData(jsonresult);
      })
      .catch((err) => console.error(err));
  };

  const getThemeColor = (temperature) => {
    if (temperature < 10) {
      return "#3498db"; // Bleu
    } else if (temperature >= 10 && temperature < 20) {
      return "#2ecc71"; // Vert
    } else {
      return "#e67e22"; // Orange
    }
  };

  useEffect(() => {
    if (weatherData) {
      const themeColor = getThemeColor(weatherData.main.temp);
      document.body.style.backgroundColor = themeColor;
    }
  }, [weatherData]);

  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <h1>MY WEATHER APP</h1>
          <div className="input-container">
            <h2>PUT COORDINATES</h2>
            <input
              type="text"
              name="latitude"
              placeholder="Latitude"
              value={latitude}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="longitude"
              placeholder="Longitude"
              value={longitude}
              onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>Get Weather</button>
          </div>
        </div>
        <div className="right">
          <div className="weather-info">
            {weatherData && (
              <>
                <p>City: {weatherData.name}</p>
                <p>Temperature: {weatherData.main.temp} °C</p>
                <p>Main: {weatherData.weather[0].main}</p>
                <p>Description: {weatherData.weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt="Weather icon"
                  className="weather-icon"
                />
                <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
