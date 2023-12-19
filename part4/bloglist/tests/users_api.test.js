require('dotenv').config({ path: __dirname + '/.env' })

const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('../utils/test_helper')

const api = supertest(app)

mongoose.set('bufferTimeoutMS', 30000)

describe('User List API Tests', () => {
  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await helper.initFirstUser()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 's1234',
      }

      await api.post('/api/users').send(newUser).expect(201)

      const usersAtEnd = await helper.usersInDb()

      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map((user) => user.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails if username already taken', async () => {
      const newUserWithDuplicatedUsername = {
        username: 'peemtanapat',
        name: 'Ponsawan Donpraiwan',
        password: 's1234',
      }

      const res = await api
        .post('/api/users')
        .send(newUserWithDuplicatedUsername)
        .expect(400)

      expect(res.body.error).toContain('`username` to be unique')
    })

    test('creation fails if username not match the pattern', async () => {
      const newUserWithDuplicatedUsername = {
        username: 'peemt@napat',
        name: 'Ponsawan Donpraiwan',
        password: 's1234',
      }

      const res = await api
        .post('/api/users')
        .send(newUserWithDuplicatedUsername)
        .expect(400)
      // "User validation failed: username: Validator failed for path `username` with value `peemt@napat`"
      expect(res.body.error).toContain('Validator failed for path `username`')
    })

    test('creation fails when password has less than 3 characters', async () => {
      const newUserWithWrongPassword = {
        username: 'root',
        name: 'Superuser',
        password: 's1',
      }

      const res = await api
        .post('/api/users')
        .send(newUserWithWrongPassword)
        .expect(400)

      console.log('%c⧭', 'color: #d90000', { body: res.body })

      expect(res.body.error).toContain('3 characters')
    })
  })
})
