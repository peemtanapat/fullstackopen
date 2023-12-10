import { Fragment, useState } from 'react';
import Weather from './Weather';

const CountryList = ({ displayCountries }) => {
  if (displayCountries.length === 1) {
    return <FullCountry country={displayCountries[0]} />;
  }

  return (
    <ol>
      {displayCountries.map((country) => (
        <Country key={country.ccn3} country={country} />
      ))}
    </ol>
  );
};

const FullCountry = ({ country }) => {
  return (
    <Fragment>
      <h2>{country.name.common}</h2>
      <div>
        <strong>Capital: </strong>
        {country.capital[0]}
      </div>
      <div>
        <strong>Area: </strong>
        {new Intl.NumberFormat().format(country.area)}
      </div>
      <div>
        <strong>Languages: </strong>
        <Languages languages={country.languages} />
      </div>
      <div className="flag">{country.flag}</div>
      <Weather country={country} />
    </Fragment>
  );
};

const Languages = ({ languages }) => {
  return (
    <ul>
      {Object.entries(languages).map(([key, value]) => {
        return <li key={key}>{value}</li>;
      })}
    </ul>
  );
};

const Country = ({ country }) => {
  const [showDetail, setShowDetail] = useState(false);
  const buttonText = showDetail ? 'hide' : 'show';

  return (
    <li key={country.ccn3}>
      {country.flag} {country.name.common}{' '}
      <button onClick={() => setShowDetail(!showDetail)}>{buttonText}</button>
      {showDetail && <FullCountry country={country} />}
    </li>
  );
};

export default CountryList;
