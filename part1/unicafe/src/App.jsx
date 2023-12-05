import { Fragment, useState } from 'react';
import Header from './Header';
import Statistics from './Statistics';
import Button from './Button';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <Fragment>
      <Header text={'Give Feedback'} />
      <Button text={'Good'} onClick={() => setGood(good + 1)} />
      <Button text={'Neutral'} onClick={() => setNeutral(neutral + 1)} />
      <Button text={'Bad'} onClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </Fragment>
  );
}

export default App;
