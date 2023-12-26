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
