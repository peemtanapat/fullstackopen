import axios from 'axios';
import { asObject } from '../reducers/anecdoteReducer';

const URL = 'http://localhost:3001/anecdotes';

export const getAnecdoteList = async () => {
  const res = await axios.get(URL);
  return res.data;
};

export const createAnecdote = async (newAnecdote) => {
  const newAnecdoteObj = asObject(newAnecdote);
  const res = await axios.post(URL, newAnecdoteObj);
  return res.data;
};

export const upVoteAnecdote = async (anecdote) => {
  const upVotedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };

  const res = await axios.patch(`${URL}/${anecdote.id}`, upVotedAnecdote);

  return res.data;
};
