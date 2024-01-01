import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('A Blog Rendering', () => {
  const title = 'This is a title of a blog'
  const author = 'Martin Fowler'
  const url = 'https://medium.com/peemtanapat'
  const user = {
    name: 'peemtanapat',
  }
  const blog = {
    title,
    author,
    url,
    likes: 0,
    user,
  }

  test('render a Blog as default display', () => {
    render(<Blog blog={blog} />)

    screen.debug()

    // expect to display as default
    const elementTitle = screen.getByText(/This is a title of a blog/i)
    screen.debug(elementTitle)
    const elementAuthor = screen.getByText(/Martin Fowler/i)
    expect(elementTitle).toBeDefined()
    expect(elementAuthor).toBeDefined()
    // expect not to display
    try {
      screen.getByText(/https:\/\/medium.com\/peemtanapat/i)
    } catch (error) {
      expect(error.message).toContain(
        'Unable to find an element with the text: /https:',
      )
    }
    try {
      screen.getByText(/Likes/i)
    } catch (error) {
      expect(error.message).toContain(
        'Unable to find an element with the text: /Likes/i',
      )
    }
  })

  test('click button "view", display blog\'s URL and number of likes', async () => {
    render(<Blog blog={blog} />)
    // before clicking
    screen.debug()

    // expect not to display
    try {
      screen.getByText(/https:\/\/medium.com\/peemtanapat/i)
    } catch (error) {
      expect(error.message).toContain(
        'Unable to find an element with the text: /https:',
      )
    }
    try {
      screen.getByText(/Likes/i)
    } catch (error) {
      expect(error.message).toContain(
        'Unable to find an element with the text: /Likes/i',
      )
    }

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    // after clicking
    screen.debug()

    screen.getByText(/This is a title of a blog/i)
    screen.getByText(/Martin Fowler/i)
    screen.getByText(/https:\/\/medium.com\/peemtanapat/i)
    screen.getByText(/Likes: 0/i)
  })

  test('like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const clickLikeFn = jest.fn()

    render(<Blog blog={blog} handleUpLikeBlog={clickLikeFn} />)

    const user = userEvent.setup()
    const buttonViewDetail = screen.getByText('view')
    await user.click(buttonViewDetail)
    const buttonLike = screen.getByText('like')
    await user.click(buttonLike)
    await user.click(buttonLike)

    const expectedCallAmount = 2
    expect(clickLikeFn.mock.calls).toHaveLength(expectedCallAmount)
  })
})
