import { Fragment } from 'react';
import Header from './Header';

const calAvgScore = ({ good, bad, voteAmount }) => {
  if (voteAmount === 0) return '0';
  const sumGood = good * 1;
  const sumBad = bad * -1;

  return ((sumGood + sumBad) / voteAmount).toFixed(2);
};

const calPositivePercentage = ({ voteAmount, good }) => {
  if (!voteAmount || !good) return '0';
  return ((100 / voteAmount) * good).toFixed(2);
};

const Statistics = ({ good, neutral, bad }) => {
  const voteAmount = good + neutral + bad || 0;
  if (voteAmount === 0) return <p>No feedback given</p>;

  const avgScore = calAvgScore({ voteAmount, good, neutral, bad });
  const positivePercentage = calPositivePercentage({ voteAmount, good });

  return (
    <Fragment>
      <Header text="Statistics" />
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="average" value={avgScore} />
          <StatisticLine
            text="positive"
            value={positivePercentage}
            suffix="%"
          />
        </tbody>
      </table>
    </Fragment>
  );
};

const StatisticLine = ({ text, value, suffix }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>
        {value}
        {suffix || ''}
      </td>
    </tr>
  );
};

export default Statistics;
