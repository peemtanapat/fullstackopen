describe('BlogList App', function () {
  describe('First Page', function () {
    beforeEach(function () {
      cy.request('POST', Cypress.env('RESET_API'))

      const user = {
        username: Cypress.env('USERNAME'),
        password: Cypress.env('PASSWORD'),
        name: Cypress.env('NAME'),
      }
      cy.request('POST', Cypress.env('CREATE_USER_API'), user)

      // start journey
      cy.visit('')
    })

    it.only('Login form is shown by default', function () {
      cy.contains('Log in to application')
      cy.contains('Username')
      cy.contains('Password')
      cy.contains('Login')
    })

    describe('Login', function () {
      it('succeeds with correct credentials', function () {
        cy.get('[data-cy="username"]').type(Cypress.env('USERNAME'))
        cy.get('[data-cy="password"]').type(Cypress.env('PASSWORD'))
        cy.get('[data-cy="login-submit"]').click()

        cy.contains(`Blog's ${Cypress.env('NAME')}`)
        cy.contains(`${Cypress.env('NAME')} logged in`)
      })

      it('fails with wrong credentials', function () {
        // Optional bonus exercise:
        // Check that the notification shown with unsuccessful login is displayed red.
        cy.get('[data-cy="username"]').type(Cypress.env('USERNAME'))
        cy.get('[data-cy="password"]').type('pass4321')
        cy.get('[data-cy="login-submit"]').click()

        cy.get('.error')
          .should('contain', 'Wrong Username or Password')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
          .and('have.css', 'border-style', 'none')
        cy.contains('Log in to application')
        cy.get('html').should('not.contain', `${Cypress.env('NAME')} logged in`)
      })
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({
          username: Cypress.env('USERNAME'),
          password: Cypress.env('PASSWORD'),
        })
      })

      const TITLE_1 = 'Why FullStackOpen is the Best?'
      const TITLE_2 = 'Thailand is the most Beautiful Country'
      const TITLE_3 = 'Bangkok, Good Life for You'
      const AUTHOR_1 = 'peemtanapat'
      const AUTHOR_2 = 'pichu'
      const AUTHOR_3 = 'panama'
      const URL_1 =
        'https://medium.com/peemtanapat/why-fullstackopen-is-the-best'
      const URL_2 =
        'https://medium.com/pichu/thailand-is-the-most-beautiful-country'
      const URL_3 = 'https://medium.com/panama/bangkok-good-life-for-you'

      it('A blog can be created', function () {
        // The test has to ensure that a new blog is added to the list of all blogs.
        cy.get('[data-cy="button-new-blog"]').click()
        cy.get('[data-cy="input-title"]').type(TITLE_1)
        cy.get('[data-cy="input-author"]').type(AUTHOR_1)
        cy.get('[data-cy="input-url"]').type(URL_1)
        cy.get('[data-cy="button-submit-blog"]').click()

        // notification in green
        // new blog added : "Why FullStackOpen is the Best?" by peemtanapat
        cy.get('.success')
          .should('contain', TITLE_1)
          .and('contain', AUTHOR_1)
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'none')
        // contain these info in blog list
        cy.get('[data-cy="blog-headline"]')
          .should('contain', TITLE_1)
          .and('contain', AUTHOR_1)
      })

      describe('When created a blog', function () {
        beforeEach(function () {
          cy.createBlog({ title: TITLE_1, author: AUTHOR_1, url: URL_1 })
          cy.visit('')

          cy.get('[data-cy="blog-headline"]')
            .should('contain', TITLE_1)
            .and('contain', AUTHOR_1)
        })

        // 5.20 Make a test that confirms users can like a blog.
        it('user can like a blog', function () {
          // click view
          cy.get('[data-cy="button-view-blog"]').click()
          cy.get('[data-cy="blog-like-info"]').should('contain', 'Likes: 0')
          // click like
          cy.get('[data-cy="button-like-blog"]').click()
          // assert
          cy.get('[data-cy="blog-like-info"]').should('contain', 'Likes: 1')
        })

        // 5.21 Make a test for ensuring that the user who created a blog can delete it.
        it('only user who created a blog can delete it', function () {
          // click view
          cy.get('[data-cy="button-view-blog"]').click()
          // click delete
          cy.get('[data-cy="button-remove-blog"]').click()
          // assert
          cy.get('html')
            .should('not.contain', TITLE_1)
            .and('not.contain', AUTHOR_1)
        })

        // 5.22 Make a test for ensuring that only the creator can see the delete button of a blog, not anyone else.
        it('only the creator can see the delete button of a blog, not anyone else', function () {
          // *creator
          // click view
          cy.get('[data-cy="button-view-blog"]').click()
          // can see delete button
          cy.get('[data-cy="blog-detail"]').should('contain', 'remove')

          // *not creator
          // logout
          cy.get('[data-cy="button-logout"]').click()
          const someBodyUsername = 'somebody'
          const someBodyPassword = 'pass5678'
          const someBodyName = 'Adam Smith'

          const user = {
            username: someBodyUsername,
            password: someBodyPassword,
            name: someBodyName,
          }
          cy.request('POST', Cypress.env('CREATE_USER_API'), user)

          // login with somebody
          cy.get('[data-cy="username"]').type(someBodyUsername)
          cy.get('[data-cy="password"]').type(someBodyPassword)
          cy.get('[data-cy="login-submit"]').click()

          // click view
          cy.get('[data-cy="button-view-blog"]').click()
          // can't see delete button
          cy.get('[data-cy="blog-detail"]').should('not.contain', 'remove')
        })

        // 5.23 Make a test that checks that the blogs are ordered according to likes with the blog with the most likes being first.
        it('blogs are descending ordered to likes', function () {
          cy.createBlog({
            title: TITLE_2,
            author: AUTHOR_2,
            url: URL_2,
            likes: 109,
          })
          cy.createBlog({
            title: TITLE_3,
            author: AUTHOR_3,
            url: URL_3,
            likes: 108,
          })
          // assert
          // check length is 3
          cy.get('[data-cy="blog-headline"]').should('have.length', 3)
          // assert ordering
          cy.get('[data-cy="blog-headline"]').eq(0).should('contain', TITLE_2)
          cy.get('[data-cy="blog-headline"]').eq(1).should('contain', TITLE_3)
          cy.get('[data-cy="blog-headline"]').eq(2).should('contain', TITLE_1)

          // click view and like 2nd ranking blog, to make it lead to 1st ranking
          // click view
          cy.get('[data-cy="button-view-blog"]').eq(1).click()
          // click like button 2 times
          cy.get('[data-cy="button-like-blog"]').click()
          cy.get('[data-cy="blog-like-info"]').should('contain', 'Likes: 109')
          cy.get('[data-cy="button-like-blog"]').click()
          cy.get('[data-cy="blog-like-info"]').should('contain', 'Likes: 110')
          // assert after re-ordering
          cy.get('[data-cy="blog-headline"]').eq(0).should('contain', TITLE_3)
          cy.get('[data-cy="blog-headline"]').eq(1).should('contain', TITLE_2)
          cy.get('[data-cy="blog-headline"]').eq(2).should('contain', TITLE_1)
        })
      })
    })
  })
})
