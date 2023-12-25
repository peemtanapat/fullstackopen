import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addNewAnecdote, voteAnecdote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';

// ordered by the number of votes
const sortAnecdoteFn = (a, b) => {
  return b.votes - a.votes;
};

const App = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    let anecdoteList = anecdotes;

    if (filter) {
      anecdoteList = anecdotes.filter((item) =>
        item.content.toLowerCase().includes(filter.toLowerCase())
      );
    }

    return anecdoteList.sort(sortAnecdoteFn);
  });
  const [newAnecdote, setNewAnecdote] = useState('');
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteAnecdote(id));
  };

  const add = (event) => {
    event.preventDefault();

    dispatch(addNewAnecdote(newAnecdote));
  };

  return (
    <div>
      <h2>Anecdotes</h2>

      <Filter />

      <AnecdoteList anecdotes={anecdotes} vote={vote} />

      <AnecdoteForm add={add} setNewAnecdote={setNewAnecdote} />
    </div>
  );
};

export default App;
