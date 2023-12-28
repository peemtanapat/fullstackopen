import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addNew, setNotification }) => {
  const navigate = useNavigate()
  const content = useField('text', 'content')
  const author = useField('text', 'author')
  const info = useField('text', 'info')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    setNotification(`Added '${content.value}'`)
    navigate('/anecdotes')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">content </label>
          <input {...content} />
        </div>
        <div>
          <label htmlFor="author">author </label>
          <input {...author} />
        </div>
        <div>
          <label htmlFor="info">url for more info </label>
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="reset">reset</button>
      </form>
    </div>
  )
}

export default CreateNew
