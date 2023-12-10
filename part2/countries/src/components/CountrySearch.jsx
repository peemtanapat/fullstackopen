const CountrySearch = ({ handleOnChange }) => {
  return (
    <span>
      Find countries <input type="text" onChange={handleOnChange} />
    </span>
  );
};

export default CountrySearch;
