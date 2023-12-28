import axios from 'axios'
import { ID_RANDOM_SCOPE, BACKEND_URL } from '../constant'

export const getAnecdoteList = async () => {
  const res = await axios.get(BACKEND_URL)

  return res.data
}

export const createAnecdote = async (newAnecdote) => {
  const res = await axios.post(BACKEND_URL, newAnecdote)

  return res.data
}

export const upVoteAnecdote = async (anecdote) => {
  const upVotedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  }

  const res = await axios.patch(`${BACKEND_URL}/${anecdote.id}`, upVotedAnecdote)

  return res.data
}

const getId = () => (ID_RANDOM_SCOPE * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}
