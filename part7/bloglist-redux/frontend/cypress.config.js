import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
    env: {
      RESET_API: '/api/testing/reset',
      CREATE_USER_API: '/api/users',
      CREATE_BLOG_API: '/api/blogs',
      LOGIN_API: '/api/login',
      LOCAL_TOKEN_KEY: 'loggedBlogAppUser',
      USERNAME: 'peemtanapat-test',
      PASSWORD: 'pass1234',
      NAME: 'Tanapat Choochot',
    },
  },
})
