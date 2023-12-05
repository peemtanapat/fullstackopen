import { Fragment, useState } from 'react';
import { getRandomInt } from './utils';

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.',
];

const App = () => {
  const onRandom = () => {
    const randomNumber = getRandomInt(anecdotes.length);
    setSelected(randomNumber);
  };

  const onVote = (selected) => () => {
    const voteAmount = voteMapper[selected] ? voteMapper[selected] + 1 : 1;
    if (voteAmount > mostVoteAmount) {
      setMostVoteAmount(voteAmount);
      setMostVoteList([selected]);
    } else if (voteAmount === mostVoteAmount) {
      setMostVoteList(mostVoteList.concat(selected));
    }

    setVoteMapper({ ...voteMapper, [selected]: voteAmount });
  };

  const [mostVoteList, setMostVoteList] = useState([]);
  const [mostVoteAmount, setMostVoteAmount] = useState(0);
  const [voteMapper, setVoteMapper] = useState({});
  const [selected, setSelected] = useState(0);

  return (
    <Fragment>
      <AnecdoteBody
        anecdotes={anecdotes}
        selected={selected}
        onVote={onVote}
        onRandom={onRandom}
        voteMapper={voteMapper}
      />
      <AnecdoteMostVote
        anecdotes={anecdotes}
        mostVoteAmount={mostVoteAmount}
        mostVoteList={mostVoteList}
      />
    </Fragment>
  );
};

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const AnecdoteBody = ({
  anecdotes,
  selected,
  voteMapper,
  onVote,
  onRandom,
}) => {
  return (
    <Fragment>
      <Header text="Anecdote of The Day" />
      <p>{anecdotes[selected]}</p>
      <p>has {voteMapper[selected] || 0} votes</p>
      <Button text="vote" onClick={onVote(selected)}></Button>
      <Button text="next anecdote" onClick={onRandom}></Button>
    </Fragment>
  );
};

const AnecdoteMostVote = ({ anecdotes, mostVoteAmount, mostVoteList }) => {
  if (mostVoteList.length === 0) return <></>;

  return (
    <Fragment>
      <Header text="Anecdote with Most Votes" />
      <p>{anecdotes[mostVoteList[0]]}</p>
      <p>has {mostVoteAmount} votes</p>
    </Fragment>
  );
};

export default App;
