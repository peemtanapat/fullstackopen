require('dotenv').config({ path: __dirname + '/.env' })

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')

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

beforeAll(async () => {
  await blog.deleteMany({})
  let firstBlog = new blog(initialBlogs[0])
  await firstBlog.save()
  let secondBlog = new blog(initialBlogs[1])
  secondBlog.save()
})

describe('Blog List API Tests', () => {
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
    }

    test('successfully creates a new blog post', async () => {
      const res = await api.post('/api/blogs').send(newBlog).expect(201)
      const savedBlog = res.body
      delete savedBlog.id

      expect(res.body).toEqual(newBlog)

      const resGetAll = await api.get('/api/blogs')

      expect(resGetAll.body.length).toBe(initialBlogs.length + 1)
    })

    test('if the title is missing from the request data, return 400', async () => {
      const newBlogWithoutTitle = { ...newBlog }
      delete newBlogWithoutTitle.title

      const res = await api
        .post('/api/blogs')
        .send(newBlogWithoutTitle)
        .expect(400)

      const resError = res.body.error
      expect(resError).toContain('`title` is required')

      const newBlogWithoutUrl = { ...newBlog }
      delete newBlogWithoutUrl.url

      await api.post('/api/blogs').send(newBlogWithoutUrl).expect(400)
    })

    test('if url property is missing, return 400', async () => {
      const newBlogWithoutUrl = { ...newBlog }
      delete newBlogWithoutUrl.url

      const res = await api
        .post('/api/blogs')
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
        .send(newBlogWithoutLikes)
        .expect(201)
      expect(JSON.stringify(res.body)).toContain(`\"likes\":0`)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
