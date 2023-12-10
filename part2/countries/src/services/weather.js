import axios from 'axios';

const WEATHER_API =
  'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units={UNIT}';

const getByCountry = async (country) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const url = getWeatherAPI({
    apiKey: API_KEY,
    lat: country.capitalInfo.latlng[0],
    lon: country.capitalInfo.latlng[1],
  });

  const res = await axios.get(url);

  return res.data;
};

const getWeatherAPI = ({ lat, lon, apiKey }) => {
  let finalUrl = WEATHER_API;
  finalUrl = finalUrl.replace('{lat}', lat);
  finalUrl = finalUrl.replace('{lon}', lon);
  finalUrl = finalUrl.replace('{API_KEY}', apiKey);
  finalUrl = finalUrl.replace('{UNIT}', 'metric');

  return finalUrl;
};

export default {
  getByCountry,
};
