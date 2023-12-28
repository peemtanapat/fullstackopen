import { Fragment } from 'react'

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <Fragment>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div>
      <br />
      <img
        src={country.data.flags.svg}
        height="100"
        alt={`flag of ${country.data.name.common}`}
      />
    </Fragment>
  )
}

export default Country
