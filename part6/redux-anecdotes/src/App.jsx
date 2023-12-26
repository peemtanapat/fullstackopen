import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import {
  addNewAnecdoteAction,
  initializeAnecdoteList,
  voteAnecdoteAction,
} from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';

// ordered by the number of votes
const sortAnecdoteFn = (a, b) => {
  return b.votes - a.votes;
};

const App = () => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const dispatch = useDispatch();
  const rawAnecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(initializeAnecdoteList());
  }, []);

  const finalAnecdotes = useMemo(() => {
    if (!rawAnecdotes) return [];

    let anecdoteList = [...rawAnecdotes];

    if (filter) {
      anecdoteList = anecdoteList.filter((item) =>
        item.content.toLowerCase().includes(filter.toLowerCase())
      );
    }

    anecdoteList.sort(sortAnecdoteFn);
    return anecdoteList;
  }, [rawAnecdotes, filter]);

  const vote = (anecdote) => {
    dispatch(voteAnecdoteAction(anecdote));
  };

  const add = async (event) => {
    event.preventDefault();

    dispatch(addNewAnecdoteAction(newAnecdote));
  };

  return (
    <div>
      <h2>Anecdotes</h2>

      <Notification />

      <br />

      <Filter />

      <AnecdoteList anecdotes={finalAnecdotes} vote={vote} />

      <AnecdoteForm add={add} setNewAnecdote={setNewAnecdote} />
    </div>
  );
};

export default App;
