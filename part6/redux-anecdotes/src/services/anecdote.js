import axios from 'axios';

export const getAnecdoteList = async () => {
  const url = 'http://localhost:3001/anecdotes';
  const res = await axios.get(url);
  return res.data;
};
