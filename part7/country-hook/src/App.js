import React, { useState, Fragment } from 'react'
import useCountry from './hooks/useCountry'
import Country from './components/Country'
import useField from './hooks/useField'

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <Fragment>
      <form onSubmit={fetch}>
        <input {...nameInput} />

        <button>find</button>
      </form>

      <Country country={country} />
    </Fragment>
  )
}

export default App
