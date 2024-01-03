import { useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'

const LoginForm = ({ user }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('logging in with', username)

    dispatch(loginUser({ username, password }))
  }

  if (user === null) {
    return (
      <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12} item={true}>
            <Typography fontSize={20}>Log in to application</Typography>
          </Grid>
          <Grid xs={12} item={true}>
            <TextField
              label="Username"
              type="text"
              id="username"
              name="username"
              data-cy="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Grid>
          <Grid xs={12} item={true}>
            <TextField
              type="password"
              label="Password"
              id="password"
              name="password"
              data-cy="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Grid>
          <Grid xs={12} item={true}>
            <Button
              size="small"
              variant="contained"
              type="submit"
              data-cy="login-submit"
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default LoginForm
