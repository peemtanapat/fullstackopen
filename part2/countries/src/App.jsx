import { Fragment, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import './index.css';
import countries from './services/countries';
import Header from './components/Header';
import CountryList from './components/CountryList';
import CountrySearch from './components/CountrySearch';

const DEBOUNCE_TIME = 800;

const App = () => {
  const [matchedCountries, setMatchedCountries] = useState([]);
  const [displayCountries, setDisplayCountries] = useState([]);
  const [warning, setWarning] = useState('');
  const [keyword, setKeyword] = useState('');

  const resetSearch = () => {
    setKeyword('');
    setWarning('');
    setDisplayCountries([]);
    setMatchedCountries([]);
  };

  const handleOnSearch = (e) => {
    const keyword = e.target.value;

    if (!keyword) {
      resetSearch();
      return;
    }

    countries.getAll().then((c) => {
      const allCountries = c.data;
      const matchedCountries = allCountries.filter((c) =>
        c.name.common.toLowerCase().includes(keyword.toLowerCase())
      );
      setMatchedCountries(matchedCountries);
      setKeyword(keyword);

      if (matchedCountries.length === 0) {
        setWarning('No matched country');
        setDisplayCountries([]);
      } else if (matchedCountries.length > 10) {
        setWarning('Too many matches, specific another filter');
        setDisplayCountries([]);
      } else {
        setWarning('');
        setDisplayCountries(matchedCountries);
      }
    });
  };

  const debouncedSearch = useMemo(() => {
    return debounce(handleOnSearch, DEBOUNCE_TIME);
  }, []);

  return (
    <div>
      <Header text="Countries" />
      <CountrySearch handleOnChange={debouncedSearch} />
      <MatchedCountryCount
        searchKeyword={keyword}
        matchedCountries={matchedCountries}
      />
      <p className="warning">{warning}</p>
      <CountryList displayCountries={displayCountries} />
    </div>
  );
};

const MatchedCountryCount = ({ searchKeyword, matchedCountries }) => {
  return (
    <Fragment>
      {matchedCountries.length >= 1 && (
        <p>
          '{searchKeyword}' matched {matchedCountries.length} countries
        </p>
      )}
    </Fragment>
  );
};

export default App;
