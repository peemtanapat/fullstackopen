import { Fragment } from 'react'

const Anecdote = ({ anecdote }) => {
  const { content, votes, info } = anecdote

  return (
    <Fragment>
      <h2>{content}</h2>
      <p>has {votes} </p>
      <p>
        votes for more info see <a href={info}>{info}</a>
      </p>
    </Fragment>
  )
}

export default Anecdote
