import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { asObject, createAnecdote } from '../services/anecdote'
import NotificationContext from '../contexts/NotificationContext'
import { ANECDOTES } from '../constant'

const AnecdoteForm = () => {
  const [_, noticeDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData([ANECDOTES])
      queryClient.setQueryData([ANECDOTES], anecdotes.concat(newAnecdote))
    },
    onError: (error, vars) => {
      noticeDispatch({
        payload: `'${vars.content}' : ${error.response?.data?.error || ''}`,
      })
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(asObject(content))
    noticeDispatch({ payload: `Added '${content}'` })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
