import React, { Fragment } from 'react';

const AnecdoteForm = ({ add, setNewAnecdote }) => {
  return (
    <Fragment>
      <h2>create new</h2>
      <form>
        <div>
          <input onChange={({ target }) => setNewAnecdote(target.value)} />
          {` `}
          <button type="submit" onClick={add}>
            create
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default AnecdoteForm;
