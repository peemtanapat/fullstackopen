import axios from 'axios';

const URL = 'http://localhost:3001/anecdotes';

export const getAnecdoteList = async () => {
  const res = await axios.get(URL);
  return res.data;
};

export const createAnecdote = async (newAnecdote) => {
  const res = await axios.post(URL, newAnecdote);
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
