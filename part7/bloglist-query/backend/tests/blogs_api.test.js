require('dotenv').config({ path: __dirname + '/.env' })

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/test_helper')

const api = supertest(app)

mongoose.set('bufferTimeoutMS', 30000)

const initialBlogs = [
  {
    title: 'Java Classpath, know it, and use it correctly!',
    author: 'peemtanapat',
    url: 'https://medium.datadriveninvestor.com/java-classpath-know-it-and-use-it-correctly-2cf6e4dc87ee',
    likes: 2,
  },
  {
    title: 'Java Object!',
    author: 'peemtanapat',
    url: 'https://medium.com/java-object',
    likes: 3,
  },
]

describe('Blog List API Tests', () => {
  let token = ''

  beforeAll(async () => {
    await helper.clearUsers()
    await Blog.deleteMany({})

    const user = await helper.createMockUser()

    const resLogin = await api
      .post('/api/login')
      .send({ username: helper.INIT_USERNAME, password: helper.INIT_PASSWORD })

    token = resLogin.body.token

    const initialBlogsWithUserId = initialBlogs.map((blog) => {
      return { ...blog, user: user.id }
    })

    let firstBlog = new Blog(initialBlogsWithUserId[0])
    await firstBlog.save()
    let secondBlog = new Blog(initialBlogsWithUserId[1])
    secondBlog.save()
  })

  describe('GET All', () => {
    test('return JSON', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('a blog has property id', async () => {
      const res = await api.get('/api/blogs')

      const firstBlogId = res.body[0].id

      expect(firstBlogId).toBeDefined()
    })

    test('there are correct amount of blogs', async () => {
      const res = await api.get('/api/blogs')

      expect(res.body).toHaveLength(initialBlogs.length)
    })

    test('the first blog is about Java Class Path', async () => {
      const res = await api.get('/api/blogs')

      expect(res.body[0].title).toMatch(/^Java Classpath.*/)
    })
  })

  describe('GET Single Id', () => {})

  describe('Create a blog', () => {
    const newBlog = {
      title: 'Road to 80K Subscribers',
      author: 'peemtanapat',
      url: 'https://medium.com/peemtanapat/road-to-80k-subscriber',
      likes: 22,
      userId: '',
    }

    test('fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
      await api.post('/api/blogs').send(newBlog).expect(401)
    })

    test('successfully creates a new blog post', async () => {
      const initUser = await helper.getInitUserId()
      newBlog.userId = initUser._id.toString()

      const res = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)

      const savedBlog = res.body
      delete savedBlog.id
      delete newBlog.userId

      expect(savedBlog).toEqual({
        ...newBlog,
        user: {
          username: initUser.username,
          name: initUser.name,
        },
      })

      const resGetAll = await api.get('/api/blogs')

      expect(resGetAll.body.length).toBe(initialBlogs.length + 1)
    }, 30000)

    test('if the title is missing from the request data, return 400', async () => {
      const newBlogWithoutTitle = { ...newBlog }
      delete newBlogWithoutTitle.title

      const res = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogWithoutTitle)
        .expect(400)

      const resError = res.body.error
      expect(resError).toContain('`title` is required')

      const newBlogWithoutUrl = { ...newBlog }
      delete newBlogWithoutUrl.url

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogWithoutUrl)
        .expect(400)
    }, 30000)

    test('if url property is missing, return 400', async () => {
      const newBlogWithoutUrl = { ...newBlog }
      delete newBlogWithoutUrl.url

      const res = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogWithoutUrl)
        .expect(400)

      const resError = res.body.error
      expect(resError).toContain('`url` is required')
    })

    test('if likes property is missing, created blog likes will be default to 0', async () => {
      const newBlogWithoutLikes = { ...newBlog }
      delete newBlogWithoutLikes.likes

      const res = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogWithoutLikes)
        .expect(201)
      expect(JSON.stringify(res.body)).toContain(`\"likes\":0`)
    })
  })

  describe('Delete a blog', () => {
    test('fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
      const allBlogs = await api.get('/api/blogs').expect(200)
      const fistBlogId = allBlogs.body[0].id

      await api.delete(`/api/blogs/${fistBlogId}`).expect(401)
    }, 30000)

    test('successful delete a blog', async () => {
      const allBlogs = await api.get('/api/blogs').expect(200)
      const fistBlogId = allBlogs.body[0].id
      const beforeDeleteCount = allBlogs.body.length

      const res = await api
        .delete(`/api/blogs/${fistBlogId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
      expect(JSON.stringify(res.body)).toContain(fistBlogId)

      const afterAllBlogs = await api.get('/api/blogs').expect(200)
      const afterDeleteCount = afterAllBlogs.body.length
      expect(afterDeleteCount).toBe(beforeDeleteCount - 1)
    }, 30000)

    test('fail if request is not the blog creator', async () => {
      // get blog id
      const allBlogs = await api.get('/api/blogs').expect(200)
      const fistBlogId = allBlogs.body[0].id
      // mock a new user
      const user = await helper.createMockUser('user001', 'passw0rd', 'USER001')
      const resLogin = await api
        .post('/api/login')
        .send({ username: 'user001', password: 'passw0rd' })

      token = resLogin.body.token

      const res = await api
        .delete(`/api/blogs/${fistBlogId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(401)
      expect(JSON.stringify(res.body)).toContain('Unauthorized')
    }, 30000)
  }, 500000)
}, 500000)

afterAll(async () => {
  await mongoose.connection.close()
})
