import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdoteList, upVoteAnecdote } from './services/anecdote'
import NotificationContext from './contexts/NotificationContext'
import { ANECDOTES, RETRY_QUERY_TIMES } from './constant'

const App = () => {
  const [_, noticeDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({
    mutationFn: upVoteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ANECDOTES] })
    },
  })

  const handleVote = async (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote)
    noticeDispatch({ payload: `anecdote '${anecdote.content}' voted` })
  }

  const { isLoading, isError, fetchStatus, data } = useQuery({
    queryKey: [ANECDOTES],
    queryFn: getAnecdoteList,
    retry: RETRY_QUERY_TIMES,
    refetchOnWindowFocus: false,
  })

  const toDisplayLoading = isLoading && fetchStatus !== 'idle'

  if (toDisplayLoading) {
    return <div>Loading data...</div>
  }

  if (isError) {
    return (
      <div>anecdote service not available due to problems in server side</div>
    )
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />

      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
