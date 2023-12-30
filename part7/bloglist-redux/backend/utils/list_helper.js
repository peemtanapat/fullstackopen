const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, curr) => prev + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  const favoriteBlog = blogs.reduce((acc, curr) => {
    return curr.likes > acc.likes ? curr : acc
  })

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null
  if (blogs.length === 1) return blogs[0]

  const countBlogMapper = {} // key:author, value:count
  let authorWithMaxBlogs = ''
  let maxBlogs = 0

  blogs.forEach((blog) => {
    if (!countBlogMapper[blog.author]) {
      countBlogMapper[blog.author] = {
        author: blog.author,
        blogs: 1,
      }
    } else {
      countBlogMapper[blog.author]['blogs'] += 1
    }

    const currentBlogCount = countBlogMapper[blog.author]['blogs']
    if (currentBlogCount > maxBlogs) {
      authorWithMaxBlogs = blog.author
      maxBlogs = currentBlogCount
    }
  })

  return countBlogMapper[authorWithMaxBlogs]
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return null
  if (blogs.length === 1) return blogs[0]

  const countLikesMapper = {} // key:author, value:count
  let authorWithMaxLikes = ''
  let maxLikes = 0

  blogs.forEach((blog) => {
    if (!countLikesMapper[blog.author]) {
      countLikesMapper[blog.author] = {
        author: blog.author,
        likes: blog.likes,
      }
    } else {
      countLikesMapper[blog.author]['likes'] += blog.likes
    }

    const currentLikesCount = countLikesMapper[blog.author]['likes']
    if (currentLikesCount > maxLikes) {
      authorWithMaxLikes = blog.author
      maxLikes = currentLikesCount
    }
  })

  return countLikesMapper[authorWithMaxLikes]
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
