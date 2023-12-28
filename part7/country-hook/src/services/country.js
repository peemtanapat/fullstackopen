import axios from 'axios'

const SERVICE_URL = 'https://studies.cs.helsinki.fi/restcountries/api'

export const getCountries = async () => {
  const res = await axios.get(`${SERVICE_URL}/all`)
  return res.data
}

export const getCountryDetail = async ({ countryName }) => {
  try {
    const res = await axios.get(`${SERVICE_URL}/name/${countryName}`)
    return res.data
  } catch (error) {
    return null
  }
}
