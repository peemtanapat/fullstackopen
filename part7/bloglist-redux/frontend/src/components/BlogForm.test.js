import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('New Blog Form', () => {
  test('create new blog form, event handler is called and display right details', async () => {
    const clickNewBlogFn = jest.fn()

    render(
      <BlogForm
        handleCreateBlog={clickNewBlogFn}
        createBlogVisible={false}
        setCreateBlogVisible={jest.fn()}
        setAuthor={jest.fn()}
        setTitle={jest.fn()}
        setUrl={jest.fn()}
      />,
    )

    const user = userEvent.setup()

    const buttonNewBlog = screen.getByTestId('button-new-blog')
    await user.click(buttonNewBlog)

    const newTitle = 'My FullStackOpen Project'
    const newAuthor = 'peemtanapat'
    const newUrl = 'www.everyday.co.th'

    const inputTitle = screen.getByTestId('input-title')
    screen.debug(inputTitle)
    await user.type(inputTitle, newTitle)
    expect(inputTitle.value).toBe(newTitle)

    const inputAuthor = screen.getByTestId('input-author')
    screen.debug(inputAuthor)
    await user.type(inputAuthor, newAuthor)
    expect(inputAuthor.value).toBe(newAuthor)

    const inputUrl = screen.getByTestId('input-url')
    screen.debug(inputUrl)
    await user.type(inputUrl, newUrl)
    expect(inputUrl.value).toBe(newUrl)

    const buttonSubmitBlog = screen.getByTestId('button-submit-blog')
    screen.debug(buttonSubmitBlog)
    await user.click(buttonSubmitBlog)

    // after complete userEvent
    screen.debug()

    const expectedCallAmount = 1
    expect(clickNewBlogFn.mock.calls).toHaveLength(expectedCallAmount)

    expect(clickNewBlogFn.mock.calls[0][0].newBlog).toEqual({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
  })
})
