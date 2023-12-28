import { useEffect, useState } from 'react'
import { getCountryDetail } from '../services/country'

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const getCountriesFn = async () => {
      const foundCountry = await getCountryDetail({ countryName: name })
      setCountry(foundCountry)
    }

    if (name) {
      getCountriesFn()
    }
  }, [name])

  if (!country)
    return {
      data: null,
      found: false,
    }

  return {
    data: country,
    found: true,
  }
}

export default useCountry
