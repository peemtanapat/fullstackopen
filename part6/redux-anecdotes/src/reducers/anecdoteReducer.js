import { createSlice } from '@reduxjs/toolkit';
import { ANECDOTES } from '../constant/constant';
import { logAction } from '../utils/logger';
import { createAnecdote, getAnecdoteList } from '../services/anecdote';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

// ** Change the definition of the filter reducer and action creators
// ** to use the Redux Toolkit's createSlice function.
const anecdoteSlice = createSlice({
  name: ANECDOTES,
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      logAction('voteAnecdote', state, action);
      const selectedId = action.payload;
      return state.map((item) => {
        if (item.id === selectedId) {
          return { ...item, votes: item.votes + 1 };
        }
        return item;
      });
    },
    addNewAnecdote(state, action) {
      logAction('addNewAnecdote', state, action);
      return state.concat(asObject(action.payload));
    },
    setAnecdoteList(state, action) {
      logAction('setAnecdoteList', state, action);
      return action.payload;
    },
  },
});

export const { addNewAnecdote, voteAnecdote, setAnecdoteList } =
  anecdoteSlice.actions;

// ** redux-thunk **
export const initializeAnecdoteList = () => {
  return async (dispatch) => {
    const anecdoteList = await getAnecdoteList();

    dispatch(setAnecdoteList(anecdoteList));
  };
};

export const addNewAnecdoteAction = (newAnecdote) => {
  return async (dispatch) => {
    await createAnecdote(newAnecdote);
    dispatch(addNewAnecdote(newAnecdote));
    dispatch(pushNotification(`Added '${newAnecdote}'`));
  };
};

export const voteAnecdoteAction = (id, content) => {
  console.log('vote', id);

  // TODO: Voting does save changes to the backend

  dispatch(voteAnecdote(id));
  dispatch(pushNotification(`You voted '${content}'`));
};
// ** redux-thunk **

export default anecdoteSlice.reducer;

// ** Traditional Reducer **
// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state);
//   console.log('action', action);
//   switch (action.type) {
//     case VOTE:
//       const selectedId = action.payload.id;
//       return state.map((item) => {
//         if (item.id === selectedId) {
//           return { ...item, votes: item.votes + 1 };
//         }
//         return item;
//       });
//     case ADD:
//       return state.concat(asObject(action.payload.content));
//     default:
//       return state;
//   }
// };

// ** Action creators **
// export const voteAnecdote = (id) => {
//   return {
//     type: `${ANECDOTES}/${VOTE}`,
//     payload: {
//       id,
//     },
//   };
// };
// export const addNewAnecdote = (content) => {
//   return {
//     type: `${ANECDOTES}/${ADD}`,
//     payload: {
//       content,
//     },
//   };
// };
