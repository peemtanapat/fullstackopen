import { Fragment, useEffect, useMemo, useState } from 'react';
import weatherService from '../services/weather';

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  if (!country) return;

  useEffect(() => {
    weatherService
      .getByCountry(country)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        alert('weatherService got error: ' + error);
      });
  }, []);

  return (
    <Fragment>
      <h2>Weather in {country.capital[0]}</h2>
      <WeatherDetail weatherData={weatherData} />
    </Fragment>
  );
};

const WeatherDetail = ({ weatherData }) => {
  if (!weatherData) return;

  return (
    <Fragment>
      <div>
        <strong>Temperature: </strong>
        {new Intl.NumberFormat().format(weatherData.main.temp)} Celsius
      </div>
      <WeatherIcon weatherData={weatherData} />
      <div>
        <strong>Wind: </strong>
        {new Intl.NumberFormat().format(weatherData.wind.speed)} meter/sec
      </div>
    </Fragment>
  );
};

const WeatherIcon = ({ weatherData }) => {
  return (
    <div>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt="Weather Icon"
      />
    </div>
  );
};

export default Weather;
