import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  addNewAnecdote,
  setAnecdoteList,
  voteAnecdote,
} from './reducers/anecdoteReducer';
import { pushNotification } from './reducers/notificationReducer';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { createAnecdote, getAnecdoteList } from './services/anecdote';

// ordered by the number of votes
const sortAnecdoteFn = (a, b) => {
  return b.votes - a.votes;
};

const App = () => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const getAnecdoteListFn = async () => {
      const anecdoteList = await getAnecdoteList();

      dispatch(setAnecdoteList(anecdoteList));
    };

    getAnecdoteListFn();
  }, []);

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    let anecdoteList = [...anecdotes];

    if (filter) {
      anecdoteList = anecdoteList.filter((item) =>
        item.content.toLowerCase().includes(filter.toLowerCase())
      );
    }

    anecdoteList.sort(sortAnecdoteFn);
    return anecdoteList;
  });

  const resetNotification = () => {
    setTimeout(() => {
      dispatch(pushNotification(''));
    }, 5000);
  };

  const vote = (id, content) => {
    console.log('vote', id);
    dispatch(voteAnecdote(id));
    dispatch(pushNotification(`You voted '${content}'`));
    resetNotification();
  };

  const add = async (event) => {
    event.preventDefault();

    await createAnecdote(newAnecdote);
    dispatch(addNewAnecdote(newAnecdote));
    dispatch(pushNotification(`Added '${newAnecdote}'`));
    resetNotification();
  };

  return (
    <div>
      <h2>Anecdotes</h2>

      <Notification />

      <br />

      <Filter />

      <AnecdoteList anecdotes={anecdotes} vote={vote} />

      <AnecdoteForm add={add} setNewAnecdote={setNewAnecdote} />
    </div>
  );
};

export default App;
