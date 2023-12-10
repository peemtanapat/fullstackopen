import axios from 'axios';

const COUNTRIES_API = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const getAll = async () => {
  return await axios.get(COUNTRIES_API);
};

export default { getAll };
