import { Link } from 'react-router-dom'
import Notification from './Notification'

const AnecdoteList = ({ anecdotes, notification, setNotification }) => {
  return (
    <div>
      <br />
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
            <li>{anecdote.content}</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default AnecdoteList
