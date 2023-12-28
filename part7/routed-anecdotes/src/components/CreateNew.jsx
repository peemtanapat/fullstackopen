import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addNew, setNotification }) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

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
          <input
            name="content"
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          <label htmlFor="author">author </label>
          <input
            name="author"
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          <label htmlFor="info">url for more info </label>
          <input name="info" value={info.value} onChange={info.onChange} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateNew
