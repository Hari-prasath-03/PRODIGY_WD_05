/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import searchIcon from "./assets/search.png";
import humidityIcon from "./assets/humidity.png";
import windspeedIcon from "./assets/windspeed.png";
import cloudySunIcon from "./assets/cloudySun.png";
import heavyRainIcon from "./assets/heavyRain.png";
import rainyIcon from "./assets/rainy.png";
import snowFallIcon from "./assets/snowFall.png";
import sunnyIcon from "./assets/sunny.png";
import sunnyRainIcon from "./assets/sunnyRain.png";
import "./App.css";

const WeatherApp = ({
  image,
  temp,
  place,
  country,
  lon,
  lan,
  humidity,
  windspeed,
}) => {
  return (
    <>
      <div className="weather-app">
        <div className="image">
          <img src={image} alt="wether-condition" />
        </div>
        <div className="temperature">{temp}ºC</div>
        <div className="location">{place}</div>
        <div className="country">{country}</div>
        <div className="quardinates">
          <div className="lan">
            <span>Longitude</span>
            <span>{lon}</span>
          </div>
          <div className="lon">
            <span>Latitude</span>
            <span>{lan}</span>
          </div>
        </div>
        <div className="wind-conditions">
          <div className="humidity">
            <img src={humidityIcon} alt="Humidity" width="80px" />
            <span>{humidity}%</span>
            <span>Humidity</span>
          </div>
          <div className="windspeed">
            <img src={windspeedIcon} alt="Windspeed" width="80px" />
            <span>{windspeed} km/h</span>
            <span>Wind Speed</span>
          </div>
        </div>
        <footer>
          Developed by <span>Hari prasth</span>
        </footer>
      </div>
    </>
  );
};

function App() {
  const apiKey = `07d48b8138bd8ece70551f198f2d16dc`;

  const [text, setText] = useState("Salem");
  const [wetherImage, setWetherImage] = useState(sunnyIcon);
  const [temperature, setTemperature] = useState(0);
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [lon, setLon] = useState(0);
  const [lan, setLan] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [windspeed, setWindspeed] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);

  const weatherImgMap = {
    "01d": sunnyIcon,
    "02d": cloudySunIcon,
    "03d": cloudySunIcon,
    "04d": sunnyRainIcon,
    "09d": rainyIcon,
    "10d": heavyRainIcon,
    "11d": heavyRainIcon,
    "13d": snowFallIcon,
    "50d": snowFallIcon,
    "01n": sunnyIcon,
    "02n": cloudySunIcon,
    "03n": cloudySunIcon,
    "04n": sunnyRainIcon,
    "09n": rainyIcon,
    "10n": heavyRainIcon,
    "11n": heavyRainIcon,
    "13n": snowFallIcon,
    "50n": snowFallIcon,
  };

  const WeatherSearch = async () => {
    setCityNotFound(false);
    setLoading(true);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;

    try {
      const result = await fetch(url);
      const data = await result.json();

      if (data.cod === "404") {
        console.log("City not Found.");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setTemperature(Math.floor(data.main.temp));
      setWindspeed(data.wind.speed);
      setHumidity(data.main.humidity);
      setCountry(data.sys.country);
      setPlace(data.name);
      setLan(data.coord.lat);
      setLon(data.coord.lon);
      const weatherIcon = data.weather[0].icon;
      setWetherImage(weatherImgMap[weatherIcon]);
      setCityNotFound(false);
    } catch (error) {
      console.log("An error occured ", error);
    } finally {
      setLoading(false);
    }
  };

  function handleSearch(e) {
    if (e.key == "Enter") {
      WeatherSearch();
    }
  }

  useEffect(() => {
    WeatherSearch();
  }, []);

  return (
    <>
      <div className="app-container">
        <div className="search-field">
          <input
            type="text"
            placeholder=" Search "
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyDown={(e) => handleSearch(e)}
          />
          <img src={searchIcon} width="30px" onClick={WeatherSearch} />
        </div>
        {loading && <div className="loading"></div>}
        {cityNotFound && (
          <div className="city-not-found">City not found..!</div>
        )}
        {!loading && !cityNotFound && (
          <WeatherApp
            image={wetherImage}
            temp={temperature}
            place={place}
            country={country}
            lon={lon}
            lan={lan}
            humidity={humidity}
            windspeed={windspeed}
          />
        )}
      </div>
    </>
  );
}

export default App;
